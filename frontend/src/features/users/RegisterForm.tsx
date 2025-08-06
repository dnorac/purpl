import { unwrapResult } from "@reduxjs/toolkit";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Input,
  Segment,
} from "semantic-ui-react";
import logo from "../../app/logo.png";
import { AppDispatch } from "../../app/store";
import { RegisterPayload } from "../../types";
import { logUserIn, registerUser } from "../thunks";
import { selectCurrentUser } from "../user/userSlice";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  termsOfService: boolean;
  privacyPolicy: boolean;
}

function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      termsOfService: false,
      privacyPolicy: false,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const { user, state } = useSelector(selectCurrentUser);

  if (user?.email) return <Navigate to="/profile" replace />;

  const onSubmit = async (data: RegisterFormData) => {
    const registerData: RegisterPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordRepeat,
      privacyPolicy: data.privacyPolicy,
      termsOfService: data.termsOfService,
    };
    const resultAction = await dispatch(registerUser(registerData));
    console.log(unwrapResult(resultAction));
    dispatch(logUserIn({ email: data.email, password: data.password }));
  };

  return (
    <Segment basic>
      <Container>
        <Grid centered container stackable>
          <Grid.Row>
            <Grid.Column>
              <Image
                src={logo}
                alt="Purpl logo"
                className="logo-big"
                centered
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form
                loading={state === "loading"}
                onSubmit={handleSubmit(onSubmit)}
                className="post-form"
              >
                <Helmet>
                  <title>Registro &middot; Purpl</title>
                </Helmet>
                <Header size="huge">Registro</Header>
                <Form.Group widths="equal">
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{ required: "Digite seu nome." }}
                    render={({ field: { onChange, value, name } }) => (
                      <Form.Field
                        control={Input}
                        type="text"
                        id="register-form-firstName"
                        name={name}
                        label="Nome"
                        placeholder="Nome"
                        value={value || ""}
                        onChange={(e: any, { value }: { value: string }) =>
                          onChange(value)
                        }
                        error={
                          errors.firstName
                            ? { content: errors.firstName.message }
                            : false
                        }
                        autoFocus
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{ required: "Digite seu sobrenome." }}
                    render={({ field: { onChange, value, name } }) => (
                      <Form.Field
                        control={Input}
                        type="text"
                        id="register-form-lastName"
                        name={name}
                        label="Sobrenome"
                        placeholder="Sobrenome"
                        value={value || ""}
                        onChange={(e: any, { value }: { value: string }) =>
                          onChange(value)
                        }
                        error={
                          errors.lastName
                            ? { content: errors.lastName.message }
                            : false
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Digite seu email." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Form.Field
                      control={Input}
                      type="email"
                      id="register-form-email"
                      name={name}
                      label="Email"
                      placeholder="Email"
                      value={value || ""}
                      onChange={(e: any, { value }: { value: string }) =>
                        onChange(value)
                      }
                      error={
                        errors.email ? { content: errors.email.message } : false
                      }
                    />
                  )}
                />
                <Form.Group widths="equal">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Digite uma senha." }}
                    render={({ field: { onChange, value, name } }) => (
                      <Form.Field
                        control={Input}
                        type="password"
                        id="register-form-password"
                        name={name}
                        label="Senha"
                        placeholder="Senha"
                        value={value || ""}
                        onChange={(e: any, { value }: { value: string }) =>
                          onChange(value)
                        }
                        error={
                          errors.password
                            ? { content: errors.password.message }
                            : false
                        }
                      />
                    )}
                  />
                  <Controller
                    name="passwordRepeat"
                    control={control}
                    rules={{ required: "Confirme a sua senha." }}
                    render={({ field: { onChange, value, name } }) => (
                      <Form.Field
                        control={Input}
                        type="password"
                        id="register-form-passwordRepeat"
                        name={name}
                        label="Repita a senha"
                        placeholder="Repita a senha"
                        value={value || ""}
                        onChange={(e: any, { value }: { value: string }) =>
                          onChange(value)
                        }
                        error={
                          errors.passwordRepeat
                            ? {
                                content: errors.passwordRepeat.message,
                              }
                            : false
                        }
                      />
                    )}
                  />
                </Form.Group>
                <Controller
                  name="termsOfService"
                  control={control}
                  rules={{ required: "Aceite os termos de serviço." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Form.Field
                      control={Checkbox}
                      id="register-form-termsOfService"
                      name={name}
                      checked={value || false}
                      onChange={(e: any, { checked }: { checked: boolean }) =>
                        onChange(checked)
                      }
                      label={
                        <label>
                          Li e aceito os{" "}
                          <Link to="/termos">termos e condições de uso</Link> do
                          Purpl.
                        </label>
                      }
                      error={
                        errors.termsOfService
                          ? {
                              content: errors.termsOfService.message,
                              pointing: "left",
                            }
                          : false
                      }
                    />
                  )}
                />
                <Controller
                  name="privacyPolicy"
                  control={control}
                  rules={{ required: "Aceite a política de privacidade." }}
                  render={({ field: { onChange, value, name } }) => (
                    <Form.Field
                      control={Checkbox}
                      id="register-form-privacyPolicy"
                      name={name}
                      checked={value || false}
                      onChange={(e: any, { checked }: { checked: boolean }) =>
                        onChange(checked)
                      }
                      label={
                        <label>
                          Li e aceito a{" "}
                          <Link to="/privacidade">política de privacidade</Link>{" "}
                          do Purpl.
                        </label>
                      }
                      error={
                        errors.termsOfService
                          ? {
                              content: errors.termsOfService.message,
                              pointing: "left",
                            }
                          : false
                      }
                    />
                  )}
                />
                <Button.Group fluid>
                  <Button primary content="Registrar" />
                  <Button.Or text="ou" />
                  <Button
                    type="button"
                    content="Faça login"
                    as={Link}
                    to="/login"
                  />
                </Button.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default RegisterForm;
