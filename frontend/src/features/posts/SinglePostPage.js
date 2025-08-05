import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useCurrentUser } from "../user/userSlice";
import { fetchPosts, selectAllPosts, selectPostById } from "./postsSlice";

const Post = ({ post }) => {
  // Since posts come populated from the API, authorId is the full author object
  const author = post.authorId;

  if (!author) {
    return (
      <Segment.Group>
        <Segment>
          <Header size="huge">{post.title}</Header>
          {post.content}
        </Segment>
        <Segment>
          <Container>
            <Header size="large" textAlign="center">
              Author information unavailable
            </Header>
          </Container>
        </Segment>
      </Segment.Group>
    );
  }

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
  const dispatch = useDispatch();
  const post = useSelector(selectPostById(postId));
  const { state } = useSelector(selectAllPosts);
  const user = useCurrentUser();

  // Load posts if they're not loaded yet
  useEffect(() => {
    if (state === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, state]);

  if (!user.email) return <Navigate to="/login" replace />;

  // Show loading state while posts are being fetched
  if (state === "loading") {
    return (
      <Segment basic>
        <Container>
          <Segment loading style={{ minHeight: 200 }}>
            <div>Loading post...</div>
          </Segment>
        </Container>
      </Segment>
    );
  }

  // Show error state if there was an error loading posts
  if (state === "error") {
    return (
      <Segment basic>
        <Container>
          <Segment color="red">
            <Header>Error loading post</Header>
            <p>There was an error loading the post. Please try again.</p>
            <Button as={Link} to="/posts">
              Back to Posts
            </Button>
          </Segment>
        </Container>
      </Segment>
    );
  }

  // Show not found if post doesn't exist
  if (!post) {
    return (
      <Segment basic>
        <Container>
          <Segment placeholder>
            <Header icon>
              <i className="file outline icon"></i>
              Post não encontrado! :(
            </Header>
            <Button as={Link} to="/posts" primary>
              Voltar para Posts
            </Button>
          </Segment>
        </Container>
      </Segment>
    );
  }

  return (
    <Segment basic>
      <Container>
        <Post post={post} />
        <Button as={Link} to="/posts">
          Voltar
        </Button>
      </Container>
    </Segment>
  );
}

export default SinglePostPage;
