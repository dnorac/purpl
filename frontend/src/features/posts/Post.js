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
import { useCurrentUser } from "../user/userSlice";
import { deletePost, toggleVisibility, usePostAuthor } from "./postsSlice";

function Post({ post, showAuthor = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useCurrentUser();
  const author = usePostAuthor(post);

  // Check if post should be visible
  if (!post.visible && user._id !== post.authorId._id) return null;

  return (
    <Segment.Group>
      <Segment>
        <Header size="large">{post.title}</Header>
        <p>{post.content}</p>
      </Segment>
      <Segment clearing>
        {showAuthor && author && (
          <Label
            as={Link}
            to={`/users/${post.authorId._id}`}
            size="medium"
            basic
          >
            <Image
              src={author.avatar}
              alt={`${author.firstName} ${author.lastName}`}
              spaced="right"
              avatar
            />
            {author.firstName} {author.lastName}
          </Label>
        )}
        {user._id === post.authorId._id && (
          <Button.Group floated={showAuthor ? "right" : undefined} basic>
            <Popup
              content="Exibir/ocultar post"
              trigger={
                <Button
                  icon={post.visible ? "eye" : "eye slash"}
                  color={post.visible ? "blue" : "grey"}
                  onClick={() => dispatch(toggleVisibility(post._id))}
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
                  onClick={() => dispatch(deletePost(post._id))}
                />
              }
              trigger={<Button color="red" icon="delete" />}
            />
            <Popup
              mouseEnterDelay={200}
              content="Editar post"
              trigger={
                <Button
                  onClick={() => navigate(`/posts/${post._id}/edit`)}
                  color="grey"
                  icon="edit"
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
