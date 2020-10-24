import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
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
} from "semantic-ui-react"
import logo from "../../app/logo.png"
import { registerUser } from "../thunks"
import { selectCurrentUser } from "../user/userSlice"

function RegisterForm() {
  const { register, handleSubmit, errors, setValue, trigger } = useForm()

  const dispatch = useDispatch()

  const { user, state } = useSelector(selectCurrentUser)

  useEffect(() => {
    register({ name: "firstName" }, { required: "Digite seu nome." })
    register({ name: "lastName" }, { required: "Digite seu sobrenome." })
    register({ name: "email" }, { required: "Digite seu email." })
    register({ name: "password" }, { required: "Digite uma senha." })
    register({ name: "passwordRepeat" }, { required: "Confirme a sua senha." })
  }, [register])

  if (user.email) return <Redirect to="/profile" />

  const onSubmit = async data => dispatch(registerUser(data))

  return (
    <Segment basic>
      <Container>
        <Grid centered container stackable>
          <Grid.Row>
            <Grid.Column width="6">
              <Image src={logo} alt="" className="logo-big" centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="6">
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
                  <Form.Field
                    control={Input}
                    type="text"
                    id="register-form-firstName"
                    name="firstName"
                    label="Nome"
                    placeholder="Nome"
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                      await trigger()
                    }}
                    error={
                      errors.firstName
                        ? { content: errors.firstName.message }
                        : false
                    }
                    autoFocus
                  />
                  <Form.Field
                    control={Input}
                    type="text"
                    id="register-form-lastName"
                    name="lastName"
                    label="Sobrenome"
                    placeholder="Sobrenome"
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                      await trigger()
                    }}
                    error={
                      errors.lastName
                        ? { content: errors.lastName.message }
                        : false
                    }
                  />
                </Form.Group>
                <Form.Field
                  control={Input}
                  type="email"
                  id="register-form-email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                    await trigger()
                  }}
                  error={
                    errors.email ? { content: errors.email.message } : false
                  }
                />
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    type="password"
                    id="register-form-password"
                    name="password"
                    label="Senha"
                    placeholder="Senha"
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                      await trigger()
                    }}
                    error={
                      errors.password
                        ? { content: errors.password.message }
                        : false
                    }
                  />
                  <Form.Field
                    control={Input}
                    type="password"
                    id="register-form-passwordRepeat"
                    name="passwordRepeat"
                    label="Repita a senha"
                    placeholder="Repita a senha"
                    onChange={async (e, { name, value }) => {
                      setValue(name, value)
                      await trigger()
                    }}
                    error={
                      errors.passwordRepeat
                        ? {
                            content: errors.passwordRepeat.message,
                          }
                        : false
                    }
                  />
                </Form.Group>
                <Form.Field
                  control={Checkbox}
                  label={
                    <label>
                      Li e aceito os{" "}
                      <Link to="/termos">termos e condições de serviço</Link>
                    </label>
                  }
                />
                <Button primary>Registrar</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

export default RegisterForm
