import {
  Alert,
  Avatar,
  Button,
  Center,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconArrowLeft, IconFile } from "@tabler/icons-react";
import { Link, Navigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllPosts, selectPostById } from "../-post-slice";
import { fetchPosts } from "../-thunks/fetch-posts";
import { AppDispatch } from "../../-store";
import { Post as PostType } from "../../../types";
import { useCurrentUser } from "../../users/-user-slice";

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
      <Paper shadow="sm" p="lg" mb="md">
        <Stack gap="md">
          <Title order={2}>{post.title}</Title>
          <Text>{post.content}</Text>
        </Stack>
      </Paper>
    );
  }

  return (
    <Stack gap="md">
      <Paper shadow="sm" p="lg">
        <Title order={2} mb="md">
          {post.title}
        </Title>
        <Text>{post.content}</Text>
      </Paper>
      <Paper shadow="sm" p="lg">
        <Center>
          <Stack align="center" gap="sm">
            <Button
              component={Link}
              to={`/users/${authorData.id}`}
              variant="subtle"
              size="lg"
            >
              <Group gap="sm">
                {authorData.avatar && (
                  <Avatar src={authorData.avatar} size="sm" />
                )}
                <Text size="lg" fw={600}>
                  {authorData.name}
                </Text>
              </Group>
            </Button>
          </Stack>
        </Center>
      </Paper>
    </Stack>
  );
};

function SinglePostPage() {
  const { postId } = useParams({ from: "/posts/$postId/" });
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
      <Container>
        <Paper p="xl">
          <Center>
            <Loader size="lg" />
          </Center>
        </Paper>
      </Container>
    );
  }

  // Show error state if there was an error loading posts
  if (state === "failed") {
    return (
      <Container>
        <Alert
          icon={<IconAlertCircle size="1rem" />}
          title="Erro ao carregar post"
          color="red"
        >
          Houve um erro ao carregar o post. Tente novamente.
          <Button component={Link} to="/" mt="sm" variant="outline" color="red">
            Voltar para Posts
          </Button>
        </Alert>
      </Container>
    );
  }

  // Show not found if post doesn't exist
  if (!post) {
    return (
      <Container>
        <Paper p="xl">
          <Center>
            <Stack align="center" gap="lg">
              <IconFile size={48} color="gray" />
              <Title order={2} c="dimmed">
                Post não encontrado! :(
              </Title>
              <Button component={Link} to="/" color="purpl">
                Voltar para Posts
              </Button>
            </Stack>
          </Center>
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      <Stack gap="md">
        <Post post={post} />
        <Button
          component={Link}
          to="/"
          variant="outline"
          leftSection={<IconArrowLeft size={14} />}
        >
          Voltar
        </Button>
      </Stack>
    </Container>
  );
}

export default SinglePostPage;
