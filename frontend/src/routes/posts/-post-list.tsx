import {
  Alert,
  Button,
  Container,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconFileText, IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequireAuth from "../(auth)/-require-auth";
import { AppDispatch, RootState } from "../-store";
import Post from "./-post";
import { useAllPosts } from "./-post-slice";
import { fetchPosts } from "./-thunks/fetch-posts";

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
  ).map((post) => <Post key={post._id} post={post} />);

  return (
    <RequireAuth>
      <Container size="lg" py="xl">
        <Stack gap="lg">
          <Title order={1}>Posts</Title>

          {state === "loading" ? (
            <Paper withBorder p="xl" style={{ textAlign: "center" }}>
              <Loader size="lg" />
              <Text mt="md">Loading posts...</Text>
            </Paper>
          ) : state === "failed" ? (
            <Alert color="red" title="Error loading posts">
              There was an error loading the posts. Please try again.
            </Alert>
          ) : posts.length === 0 ? (
            <Paper withBorder p="xl" style={{ textAlign: "center" }}>
              <IconFileText
                size={48}
                style={{
                  margin: "0 auto 16px",
                  color: "var(--mantine-color-gray-5)",
                }}
              />
              <Title order={3} mb="sm">
                No posts found
              </Title>
              <Text c="dimmed">Be the first to create a post!</Text>
            </Paper>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {renderedPosts}
            </SimpleGrid>
          )}

          <Button
            component={Link}
            to="/posts/add"
            leftSection={<IconPlus size={16} />}
            color="purpl"
          >
            Novo Post
          </Button>
        </Stack>
      </Container>
    </RequireAuth>
  );
}

export default PostList;
