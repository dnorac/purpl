import {
  Alert,
  Avatar,
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconUser } from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "../-thunks/fetch-users";
import { selectAllUsers, selectUserById } from "../-user-slice";
import { AppDispatch } from "../../-store";

function UserProfile() {
  const { userId } = useParams({ from: "/users/$userId/" });
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useSelector(selectAllUsers);
  const user = useSelector(selectUserById(userId || ""));

  useEffect(() => {
    if (!user && state !== "loading") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user, state]);

  if (state === "loading") {
    return (
      <Container>
        <Paper p="xl">
          <Group justify="center">
            <Loader size="lg" />
          </Group>
        </Paper>
      </Container>
    );
  }

  if (state === "failed") {
    return (
      <Container>
        <Alert icon={<IconAlertCircle size="1rem" />} title="Erro" color="red">
          Não foi possível carregar o usuário.
          <Button
            component={Link}
            to="/users"
            mt="sm"
            variant="outline"
            color="red"
          >
            Voltar para Usuários
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Paper p="xl">
          <Stack align="center" gap="md">
            <IconUser size={48} color="gray" />
            <Title order={2} c="dimmed">
              Usuário não encontrado
            </Title>
            <Button component={Link} to="/users" variant="light">
              Voltar para Usuários
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper withBorder p="xl" radius="md">
        <Stack gap="md">
          <Group>
            <Avatar src={user.avatar} radius="xl" size={72}>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </Avatar>
            <div>
              <Title order={3}>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.name}
              </Title>
              <Text c="dimmed">{user.email}</Text>
            </div>
          </Group>

          <Group>
            <Text size="sm" c="dimmed">
              Entrou em: {dayjs(user.createdAt).format("DD/MM/YYYY")}
            </Text>
          </Group>

          <Group justify="end">
            <Button
              component={Link}
              to={`/users/${user._id}/update`}
              variant="light"
            >
              Editar Perfil
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}

export default UserProfile;
