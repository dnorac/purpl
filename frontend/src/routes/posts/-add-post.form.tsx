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
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../-store";
import { useCurrentUser } from "../users/-user-slice";
import { postAdded } from "./-post-slice";

interface AddPostFormData {
  title: string;
  content: string;
  visible: boolean;
}

function AddPostForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddPostFormData>({
    defaultValues: {
      title: "",
      content: "",
      visible: true,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const user = useCurrentUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: AddPostFormData) => {
    if (!user) return;

    const { title, content, visible } = data;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await dispatch(
      postAdded({
        authorId: user._id,
        title,
        content,
        visible,
      })
    );

    setIsSubmitting(false);

    if (postAdded.fulfilled.match(result)) {
      navigate({ to: "/" });
    } else {
      setSubmitError((result.payload as string) || "Erro ao criar post.");
    }
  };

  // Early return if not authenticated
  if (!user?.email) return <Navigate to="/login" replace />;

  return (
    <Paper p="xl">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={1} mb="lg">
            Novo post
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
            <Controller
              name="title"
              control={control}
              rules={{ required: "Título é obrigatório" }}
              render={({ field }) => (
                <TextInput
                  label="Título"
                  placeholder="Escolha um bom título!"
                  {...field}
                  autoFocus
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              rules={{ required: "Conteúdo é obrigatório" }}
              render={({ field }) => (
                <Textarea
                  label="Conteúdo"
                  placeholder="Seja criativo!"
                  {...field}
                  error={errors.content?.message}
                  rows={6}
                />
              )}
            />
            <Controller
              name="visible"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label="Publicar este post"
                  checked={value}
                  onChange={(event) => onChange(event.currentTarget.checked)}
                />
              )}
            />
            <Group mt="lg">
              <Button
                variant="outline"
                leftSection={<IconArrowLeft size={14} />}
                onClick={() => navigate({ to: ".." })}
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
                Postar
              </Button>
            </Group>
          </Stack>
        </form>
      </Container>
    </Paper>
  );
}

export default AddPostForm;
