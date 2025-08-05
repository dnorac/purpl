import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useCurrentUser } from "../user/userSlice";
import { selectPostById, usePostAuthor } from "./postsSlice";

const Post = ({ post }) => {
  const author = usePostAuthor(post.authorId);

  return (
    <Segment.Group>
      <Segment>
        <Header size="huge">{post.title}</Header>
        {post.content}
      </Segment>
      <Segment>
        <Container>
          <Link to={`/users/${author._id}`}>
            <Image src={author.avatar} circular size="tiny" centered />
            <Header size="large" textAlign="center">
              {author.firstName} {author.lastName}
            </Header>
          </Link>
        </Container>
      </Segment>
    </Segment.Group>
  );
};

function SinglePostPage() {
  const { postId } = useParams();
  const post = useSelector(selectPostById(postId));
  const user = useCurrentUser();

  if (!user.email) return <Navigate to="/login" replace />;

  if (!post)
    return (
      <div className="post-list">
        <h1>Post não encontrado! :(</h1>
        <Link to="/posts" className="button">
          Voltar
        </Link>
      </div>
    );

  return (
    <Segment basic>
      <Container>
        <Post post={post} />
        <Button as={Link} to="/posts" className="button">
          Voltar
        </Button>
      </Container>
    </Segment>
  );
}

export default SinglePostPage;
