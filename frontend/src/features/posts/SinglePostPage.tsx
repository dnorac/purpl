import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { AppDispatch } from "../../app/store";
import { Post as PostType } from "../../types";
import { useCurrentUser } from "../user/userSlice";
import { fetchPosts, selectAllPosts, selectPostById } from "./postsSlice";

interface PostComponentProps {
  post: PostType;
}

const Post = ({ post }: PostComponentProps) => {
  // Since posts come populated from the API, authorId is the full author object
  const author = post.authorId;

  // Helper function to get author data
  const getAuthorData = () => {
    if (typeof author === "string") {
      return { id: author, name: "Unknown Author", avatar: undefined };
    }
    return {
      id: author._id,
      name:
        author.firstName && author.lastName
          ? `${author.firstName} ${author.lastName}`
          : author.name,
      avatar: author.avatar,
    };
  };

  const authorData = getAuthorData();

  if (!author) {
    return (
      <Segment.Group>
        <Segment>
          <Header size="large">{post.title}</Header>
          <p>{post.content}</p>
        </Segment>
      </Segment.Group>
    );
  }

  return (
    <Segment.Group>
      <Segment>
        <Header size="large">{post.title}</Header>
        {post.content}
      </Segment>
      <Segment>
        <Container>
          <Link to={`/users/${authorData.id}`}>
            {authorData.avatar && (
              <Image src={authorData.avatar} circular size="tiny" centered />
            )}
            <Header size="large" textAlign="center">
              {authorData.name}
            </Header>
          </Link>
        </Container>
      </Segment>
    </Segment.Group>
  );
};

function SinglePostPage() {
  const { postId } = useParams<{ postId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const post = useSelector(selectPostById(postId || ""));
  const { state } = useSelector(selectAllPosts);
  const user = useCurrentUser();

  // Load posts if they're not loaded yet
  useEffect(() => {
    if (state === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, state]);

  if (!user?.email) return <Navigate to="/login" replace />;

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
  if (state === "failed") {
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
