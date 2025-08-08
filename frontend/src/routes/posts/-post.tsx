import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowRight,
  IconEdit,
  IconEye,
  IconEyeOff,
  IconTrash,
} from "@tabler/icons-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Post as PostType } from "../../types";
import { useCurrentUser } from "../users/-user-slice";
import { removePost, togglePostVisibility, usePostAuthor } from "./-post-slice";

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
    <Paper withBorder radius="md" p="md" mb="md">
      <Stack gap="md">
        <div>
          <Title order={3} mb="sm">
            {post.title}
          </Title>
          <Text>{post.content}</Text>
        </div>

        <Group justify="space-between" align="center">
          {showAuthor && author && (
            <Badge
              component={Link}
              to={`/users/${getAuthorId()}`}
              variant="light"
              size="lg"
              leftSection={
                author.avatar ? <Avatar src={author.avatar} size="sm" /> : null
              }
            >
              {author.firstName && author.lastName
                ? `${author.firstName} ${author.lastName}`
                : author.name}
            </Badge>
          )}

          {user && user._id === getAuthorId() && (
            <Group gap="xs">
              <Tooltip label="Exibir/ocultar post">
                <ActionIcon
                  color={post.visible ? "blue" : "gray"}
                  variant="light"
                  onClick={handleToggleVisibility}
                  loading={isTogglingVisibility}
                  disabled={isTogglingVisibility || isDeleting}
                >
                  {post.visible ? (
                    <IconEye size={16} />
                  ) : (
                    <IconEyeOff size={16} />
                  )}
                </ActionIcon>
              </Tooltip>

              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <ActionIcon
                    color="red"
                    variant="light"
                    disabled={isTogglingVisibility || isDeleting}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <Button
                    fullWidth
                    color="red"
                    size="xs"
                    onClick={handleDeletePost}
                    loading={isDeleting}
                    disabled={isTogglingVisibility || isDeleting}
                  >
                    Apagar post
                  </Button>
                </Popover.Dropdown>
              </Popover>

              <Tooltip label="Editar post">
                <ActionIcon
                  color="gray"
                  variant="light"
                  onClick={() =>
                    navigate({
                      to: `/posts/${post._id}/edit`,
                    })
                  }
                  disabled={isTogglingVisibility || isDeleting}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Ver post">
                <ActionIcon
                  color="gray"
                  variant="light"
                  onClick={() =>
                    navigate({
                      to: `/posts/${post._id}/edit`,
                    })
                  }
                  disabled={isTogglingVisibility || isDeleting}
                >
                  <IconArrowRight size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}

export default Post;
