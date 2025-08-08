import {
  Alert,
  Button,
  Checkbox,
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

import { selectCurrentUser } from "../-current-user.slice";
import { AppDispatch } from "../../-store";
import logo from "../../../app/logo.png";
import { RegisterPayload } from "../../../types";
import { registerUser } from "../../users/-thunks/register-user";

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      privacyPolicy: false,
      termsOfService: false,
    },
  });
  const { user, error, status } = useSelector(selectCurrentUser);

  const password = watch("password");

  const onSubmit = (data: RegisterPayload) => dispatch(registerUser(data));

  if (user?._id) return <Navigate to="/" replace />;

  return (
    <Container size="xs" style={{ marginTop: "2rem" }}>
      <Paper withBorder shadow="md" p="xl" radius="md">
        <Helmet>
          <title>Registre-se &middot; Purpl</title>
        </Helmet>

        <Stack align="center" gap="lg">
          <Image src={logo} alt="Purpl logo" h={60} w="auto" />

          <Title order={1} ta="center">
            Criar Conta
          </Title>

          {error && (
            <Alert variant="filled" color="red" title="Erro">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Stack gap="md">
              <Group grow>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "Digite seu primeiro nome." }}
                  render={({ field: { onChange, value, name } }) => (
                    <TextInput
                      label="Primeiro Nome"
                      placeholder="Primeiro Nome"
                      name={name}
                      value={value || ""}
                      onChange={onChange}
                      error={errors.firstName?.message}
                      autoFocus
                      required
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Digite seu sobrenome." }}
                  render={({ field: { onChange, value, name } }) => (
                    <TextInput
                      label="Sobrenome"
                      placeholder="Sobrenome"
                      name={name}
                      value={value || ""}
                      onChange={onChange}
                      error={errors.lastName?.message}
                      required
                    />
                  )}
                />
              </Group>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Digite seu email.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de email inválido",
                  },
                }}
                render={({ field: { onChange, value, name } }) => (
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    type="email"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.email?.message}
                    required
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Digite sua senha.",
                  minLength: {
                    value: 6,
                    message: "A senha deve ter pelo menos 6 caracteres",
                  },
                }}
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

              <Controller
                name="passwordRepeat"
                control={control}
                rules={{
                  required: "Confirme sua senha.",
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                }}
                render={({ field: { onChange, value, name } }) => (
                  <TextInput
                    label="Confirmar Senha"
                    type="password"
                    placeholder="Confirmar Senha"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    error={errors.passwordRepeat?.message}
                    required
                  />
                )}
              />

              <Stack gap="xs">
                <Controller
                  name="termsOfService"
                  control={control}
                  rules={{ required: "Você deve aceitar os termos de uso." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Checkbox
                      name={name}
                      checked={value}
                      onChange={onChange}
                      error={errors.termsOfService?.message}
                      label={
                        <Text size="sm">
                          Eu aceito os{" "}
                          <Link to="/terms-of-use" target="_blank">
                            Termos de Uso
                          </Link>
                        </Text>
                      }
                    />
                  )}
                />

                <Controller
                  name="privacyPolicy"
                  control={control}
                  rules={{
                    required: "Você deve aceitar a política de privacidade.",
                  }}
                  render={({ field: { onChange, value, name } }) => (
                    <Checkbox
                      name={name}
                      checked={value}
                      onChange={onChange}
                      error={errors.privacyPolicy?.message}
                      label={
                        <Text size="sm">
                          Eu aceito a{" "}
                          <Link to="/privacy-policy" target="_blank">
                            Política de Privacidade
                          </Link>
                        </Text>
                      }
                    />
                  )}
                />
              </Stack>

              <Group grow>
                <Button
                  type="submit"
                  loading={status === "loading"}
                  color="purpl"
                >
                  Criar Conta
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outline"
                  color="purpl"
                >
                  Já tem conta?
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}

export default RegisterForm;
