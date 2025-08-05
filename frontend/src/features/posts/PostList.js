import { Link, Navigate } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useCurrentUser } from "../user/userSlice";
import Post from "./Post";
import { useAllPosts } from "./postsSlice";

function PostList() {
  const { state, posts } = useAllPosts();
  const user = useCurrentUser();

  if (!user.email) return <Navigate to="/login" replace />;

  // Show all posts if user is authenticated, otherwise only visible posts
  const renderedPosts = (
    user.email ? posts : posts.filter((p) => p.visible)
  ).map((post) => (
    <Grid.Column key={post._id}>
      <Post post={post} />
    </Grid.Column>
  ));

  return (
    <Segment basic>
      <Container>
        <Header size="huge">Posts</Header>
        {state === "loading" ? (
          <Segment loading style={{ minHeight: 200 }}>
            <div>Loading posts...</div>
          </Segment>
        ) : state === "error" ? (
          <Segment color="red">
            <Header>Error loading posts</Header>
            <p>There was an error loading the posts. Please try again.</p>
          </Segment>
        ) : posts.length === 0 ? (
          <Segment placeholder>
            <Header icon>
              <i className="file outline icon"></i>
              No posts found
            </Header>
            <p>Be the first to create a post!</p>
          </Segment>
        ) : (
          <Grid columns={3} stackable padded="vertically" doubling>
            {renderedPosts}
          </Grid>
        )}

        <Button
          primary
          as={Link}
          to="/posts/add"
          icon="write"
          content="Novo Post"
          labelPosition="left"
        />
      </Container>
    </Segment>
  );
}

export default PostList;
