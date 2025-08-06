import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Header,
  Image,
  Label,
  Popup,
  Segment,
} from "semantic-ui-react";
import { Post as PostType } from "../../types";
import { useCurrentUser } from "../user/userSlice";
import { removePost, togglePostVisibility, usePostAuthor } from "./postsSlice";

interface PostProps {
  post: PostType;
  showAuthor?: boolean;
}

function Post({ post, showAuthor = true }: PostProps) {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isTogglingVisibility, setIsTogglingVisibility] =
    useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const user = useCurrentUser();
  const author = usePostAuthor(post);

  // Helper function to get author ID
  const getAuthorId = () => {
    if (typeof post.authorId === "string") {
      return post.authorId;
    }
    return post.authorId._id;
  };

  // Handle toggle visibility
  const handleToggleVisibility = async () => {
    setIsTogglingVisibility(true);
    await dispatch(togglePostVisibility(post._id));
    setIsTogglingVisibility(false);
  };

  // Handle delete post
  const handleDeletePost = async () => {
    setIsDeleting(true);
    await dispatch(removePost(post._id));
    setIsDeleting(false);
  };

  // Check if post should be visible
  if (!post.visible && (!user || user._id !== getAuthorId())) return null;

  return (
    <Segment.Group>
      <Segment>
        <Header size="large">{post.title}</Header>
        <p>{post.content}</p>
      </Segment>
      <Segment clearing>
        {showAuthor && author && (
          <Label as={Link} to={`/users/${getAuthorId()}`} size="medium" basic>
            {author.avatar && (
              <Image
                src={author.avatar}
                alt={`${author.firstName || author.name} ${author.lastName || ""}`}
                spaced="right"
                avatar
              />
            )}
            {author.firstName && author.lastName
              ? `${author.firstName} ${author.lastName}`
              : author.name}
          </Label>
        )}
        {user && user._id === getAuthorId() && (
          <Button.Group floated={showAuthor ? "right" : undefined} basic>
            <Popup
              content="Exibir/ocultar post"
              trigger={
                <Button
                  icon={post.visible ? "eye" : "eye slash"}
                  color={post.visible ? "blue" : "grey"}
                  onClick={handleToggleVisibility}
                  loading={isTogglingVisibility}
                  disabled={isTogglingVisibility || isDeleting}
                />
              }
              mouseEnterDelay={200}
            />
            <Popup
              mouseEnterDelay={200}
              on="click"
              wide
              content={
                <Button
                  fluid
                  color="red"
                  content="Apagar post"
                  size="tiny"
                  onClick={handleDeletePost}
                  loading={isDeleting}
                  disabled={isTogglingVisibility || isDeleting}
                />
              }
              trigger={
                <Button
                  color="red"
                  icon="delete"
                  disabled={isTogglingVisibility || isDeleting}
                />
              }
            />
            <Popup
              mouseEnterDelay={200}
              content="Editar post"
              trigger={
                <Button
                  onClick={() => navigate(`/posts/${post._id}/edit`)}
                  color="grey"
                  icon="edit"
                  disabled={isTogglingVisibility || isDeleting}
                />
              }
            />
            <Popup
              mouseEnterDelay={200}
              content="Ver post"
              trigger={
                <Button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  color="grey"
                  icon="arrow right"
                  disabled={isTogglingVisibility || isDeleting}
                />
              }
            />
          </Button.Group>
        )}
      </Segment>
    </Segment.Group>
  );
}

export default Post;
