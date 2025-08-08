import {
  Alert,
  Button,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, Navigate } from "@tanstack/react-router";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { logUserIn } from "../-thunks";
import { AppDispatch } from "../../-store";
import { LoginPayload } from "../../../types";
import logo from "../../app/logo.png";
import { selectCurrentUser } from "../../users/-user-slice";

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { user, error, state } = useSelector(selectCurrentUser);

  const onSubmit = (data: LoginPayload) => dispatch(logUserIn(data));

  if (user?._id)
    return (
      <Navigate to="/users/$userId" params={{ userId: user._id }} replace />
    );

  return (
    <Container size="xs" style={{ marginTop: "2rem" }}>
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Helmet>
          <title>Login &middot; Purpl</title>
        </Helmet>

        <Stack align="center" gap="lg">
          <Image src={logo} alt="Purpl logo" h={60} w="auto" />

          <Title order={1} ta="center">
            Login
          </Title>

          {error && (
            <Alert variant="filled" color="red" title="Erro">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Stack gap="md">
              <Controller
                name="email"
                control={control}
                rules={{ required: "Digite seu email." }}
                render={({ field: { onChange, value, name } }) => (
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.email?.message}
                    autoFocus
                    required
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Digite sua senha." }}
                render={({ field: { onChange, value, name } }) => (
                  <TextInput
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.password?.message}
                    required
                  />
                )}
              />

              <Text size="sm" ta="center">
                <Link to="/recover-account">Esqueceu sua senha?</Link>
              </Text>

              <Group grow>
                <Button
                  type="submit"
                  loading={state === "loading"}
                  color="purpl"
                >
                  Conectar
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outline"
                  color="purpl"
                >
                  Registre-se
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}

export default LoginForm;
