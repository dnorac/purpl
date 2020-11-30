import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useCurrentUser } from "../user/userSlice";
import Post from "./Post";
import { useAllPosts } from "./postsSlice";

function PostList() {
  const { state, posts } = useAllPosts();
  const user = useCurrentUser();

  if (!user.email) return <Redirect to="/login" />;

  const renderedPosts = (child) =>
    (user.email ? posts : posts.filter((p) => p.visible)).map((post) => {
      return child(post);
    });

  return (
    <Segment basic>
      <Container loading={state === "loading" || "false"}>
        <Header size="huge">Posts</Header>
        <Grid columns={3} stackable padded="vertically" doubling>
          {renderedPosts((post) => (
            <Grid.Column key={post.id}>
              <Post post={post} />
            </Grid.Column>
          ))}
        </Grid>

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
