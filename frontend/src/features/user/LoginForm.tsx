import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Input,
  Message,
  Segment,
} from "semantic-ui-react";
import logo from "../../app/logo.png";
import { AppDispatch } from "../../app/store";
import { LoginPayload } from "../../types";
import { logUserIn } from "../thunks";
import { selectCurrentUser } from "./userSlice";

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

  if (user?.email) return <Navigate to="/profile" replace />;

  return (
    <Segment basic>
      <Container>
        <Grid container centered stackable>
          <Grid.Row>
            <Grid.Column>
              <Image
                src={logo}
                alt="Purpl logo"
                centered
                className="logo-big"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                loading={state === "loading"}
                error={Boolean(error)}
              >
                <Helmet>
                  <title>Login &middot; Purpl</title>
                </Helmet>
                <Header size="huge">Login</Header>
                <Message error icon="x" header="Erro" content={error} />
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Digite seu email." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Form.Field
                      control={Input}
                      label="Email"
                      placeholder="Email"
                      type="email"
                      name={name}
                      value={value || ""}
                      onChange={(e: any, { value }: { value: string }) =>
                        onChange(value)
                      }
                      error={
                        errors.email
                          ? { content: errors.email.message, pointing: "below" }
                          : false
                      }
                      autoFocus
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Digite sua senha." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Form.Field
                      label="Senha"
                      control={Form.Input}
                      type="password"
                      placeholder="Senha"
                      name={name}
                      value={value || ""}
                      onChange={(e: any, { value }: { value: string }) =>
                        onChange(value)
                      }
                      error={
                        errors.password
                          ? {
                              content: errors.password.message,
                              pointing: "below",
                            }
                          : false
                      }
                    />
                  )}
                />
                <p style={{ textAlign: "center" }}>
                  <Link to="/recuperar">Esqueceu sua senha?</Link>
                </p>
                <Button.Group fluid>
                  <Button primary type="submit">
                    Conectar
                  </Button>
                  <Button.Or text="ou" />
                  <Button as={Link} to="/registro">
                    Registre-se
                  </Button>
                </Button.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default LoginForm;
