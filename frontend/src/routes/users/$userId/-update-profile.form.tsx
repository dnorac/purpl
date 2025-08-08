import {
  Avatar,
  Button,
  Center,
  Container,
  Divider,
  FileInput,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { Navigate, useParams } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useCurrentUser } from "../-user-slice";
import { AppDispatch } from "../../-store";
import { updateProfile } from "../../../features/thunks";
import { User } from "../../../types";

function UpdateProfileForm() {
  const { userId } = useParams({ from: "/users/$userId/update" });
  const user = useCurrentUser();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Partial<User>>({
    defaultValues: {
      avatar: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();

  if (!user?._id || userId !== user._id) return <Navigate to="/" replace />;

  const onSubmit = (data: Partial<User>) => {
    dispatch(updateProfile(data));
  };

  const avatarUrl = watch("avatar");

  return (
    <Paper p="xl">
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Title order={1} mb="lg">
            Alterar perfil
          </Title>
          <Center mb="lg">
            <Avatar
              src={avatarUrl || user?.avatar}
              size="xl"
              alt="Avatar do perfil"
            />
          </Center>
          <Stack gap="md">
            <Controller
              name="avatar"
              control={control}
              rules={{ required: "Você deve digitar uma URL." }}
              render={({ field: { onChange, value, name } }) => (
                <TextInput
                  label="URL da Imagem"
                  name={name}
                  placeholder="Avatar URL"
                  value={value || user?.avatar || ""}
                  onChange={(event) => onChange(event.currentTarget.value)}
                  error={errors.avatar?.message}
                />
              )}
            />
            <Divider label="OU" labelPosition="center" my="md" />
            <FileInput
              label="Envie um arquivo"
              placeholder="Selecione uma imagem"
              accept="image/*"
            />
            <Group mt="lg">
              <Button color="purpl" type="submit">
                Salvar
              </Button>
              <Button color="red" variant="outline">
                Apagar conta
              </Button>
            </Group>
          </Stack>
        </form>
      </Container>
    </Paper>
  );
}

export default UpdateProfileForm;
