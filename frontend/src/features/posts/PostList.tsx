import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { AppDispatch, RootState } from "../../app/store";
import RequireAuth from "../auth/RequireAuth";
import Post from "./Post";
import { fetchPosts, useAllPosts } from "./postsSlice";

function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { state, posts } = useAllPosts();
  const auth = useSelector((state: RootState) => state.currentUser);
  const user = auth.user;

  useEffect(() => {
    if (user?.email && state === "idle") {
      dispatch(fetchPosts());
    }
  }, [user?.email, state, dispatch]);

  // Show all posts if user is authenticated, otherwise only visible posts
  const renderedPosts = (
    user?.email ? posts : posts.filter((p) => p.visible)
  ).map((post) => (
    <Grid.Column key={post._id}>
      <Post post={post} />
    </Grid.Column>
  ));

  return (
    <RequireAuth>
      <Segment basic>
        <Container>
          <Header size="huge">Posts</Header>
          {state === "loading" ? (
            <Segment loading style={{ minHeight: 200 }}>
              <div>Loading posts...</div>
            </Segment>
          ) : state === "failed" ? (
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
    </RequireAuth>
  );
}

export default PostList;
