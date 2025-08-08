import {
  Alert,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { Link, Navigate, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { selectPostById, updatePost } from "../-post-slice";
import { AppDispatch } from "../../-store";
import { useCurrentUser } from "../../users/-user-slice";

interface EditPostFormData {
  title: string;
  content: string;
  visible: boolean;
}

function EditPostForm() {
  const { postId } = useParams({ from: "/posts/$postId/edit" });

  const post = useSelector(selectPostById(postId || ""));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<EditPostFormData>({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      visible: post?.visible || false,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const onSubmit = async (data: EditPostFormData) => {
    if (!post) return;
    setIsSubmitting(true);
    setSubmitError(null);
    const result = await dispatch(updatePost({ ...data, id: post._id }));
    setIsSubmitting(false);
    if (updatePost.fulfilled.match(result)) {
      navigate({ to: `/posts/${post._id}` });
    } else {
      setSubmitError((result.payload as string) || "Erro ao atualizar post.");
    }
  };

  const user = useCurrentUser();

  if (!user?.email) return <Navigate to="/login" replace />;

  if (!post) {
    return (
      <Paper p="xl">
        <Title order={1}>Post não encontrado</Title>
      </Paper>
    );
  }

  return (
    <Paper p="xl">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={1} mb="lg">
            Editar post
          </Title>
          {submitError && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Erro"
              color="red"
              mb="md"
            >
              {submitError}
            </Alert>
          )}
          <Stack gap="md">
            <TextInput
              label="Título"
              placeholder="Escolha um bom título!"
              defaultValue={post.title}
              {...register("title", { required: "Título é obrigatório" })}
              autoFocus
              error={errors.title?.message}
            />
            <Textarea
              label="Conteúdo"
              placeholder="Seja criativo!"
              defaultValue={post.content}
              {...register("content", { required: "Conteúdo é obrigatório" })}
              error={errors.content?.message}
              rows={6}
            />
            <Checkbox
              label="Publicar este post"
              {...register("visible")}
              defaultChecked={post.visible}
            />
            <Group mt="lg">
              <Button
                component={Link}
                to="/"
                variant="outline"
                leftSection={<IconArrowLeft size={14} />}
              >
                Voltar
              </Button>
              <Button
                color="purpl"
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
                rightSection={<IconArrowRight size={14} />}
              >
                Concluir
              </Button>
            </Group>
          </Stack>
        </form>
      </Container>
    </Paper>
  );
}

export default EditPostForm;
