import {
  Alert,
  Avatar,
  Container,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../-store";
import { fetchUsers } from "./-thunks/fetch-users";
import { selectAllUsers } from "./-user-slice";

function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { state, users } = useSelector(selectAllUsers);
  const auth = useSelector((state: RootState) => state.currentUser);
  const user = auth.user;

  useEffect(() => {
    if (user?.email && state === "idle") {
      dispatch(fetchUsers());
    }
  }, [user?.email, state, dispatch]);

  const renderedUsers = users.map((user) => (
    <Paper key={user._id} withBorder p="md" radius="md">
      <Group>
        <Avatar
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          size="lg"
          radius="xl"
        >
          {user.firstName?.[0]}
          {user.lastName?.[0]}
        </Avatar>
        <div style={{ flex: 1 }}>
          <Text size="lg" fw={500}>
            {user.firstName} {user.lastName}
          </Text>
          <Text size="sm" c="dimmed">
            {user.email}
          </Text>
          <Text size="xs" c="dimmed">
            Entrou em: {dayjs(user.createdAt).format("DD/MM/YYYY")}
          </Text>
        </div>
      </Group>
    </Paper>
  ));

  return (
    <Container size="lg" py="xl">
      <Stack gap="lg">
        <Title order={1}>Users</Title>

        {state === "loading" ? (
          <Paper withBorder p="xl" style={{ textAlign: "center" }}>
            <Loader size="lg" />
            <Text mt="md">Loading users...</Text>
          </Paper>
        ) : state === "failed" ? (
          <Alert color="red" title="Error loading users">
            There was an error loading the users. Please try again.
          </Alert>
        ) : users.length === 0 ? (
          <Paper withBorder p="xl" style={{ textAlign: "center" }}>
            <IconUser
              size={48}
              style={{
                margin: "0 auto 16px",
                color: "var(--mantine-color-gray-5)",
              }}
            />
            <Title order={3} mb="sm">
              No users found
            </Title>
            <Text c="dimmed">No users have joined yet.</Text>
          </Paper>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {renderedUsers}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
}

export default UserList;
