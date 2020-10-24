import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect } from "react-router-dom"
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
} from "semantic-ui-react"
import logo from "../../app/logo.png"
import { logUserIn } from "../thunks"
import { selectCurrentUser } from "./userSlice"

function LoginForm() {
  const dispatch = useDispatch()
  const { handleSubmit, register, errors, setValue, trigger } = useForm()
  const { user, error, state } = useSelector(selectCurrentUser)

  useEffect(() => {
    register({ name: "email" }, { required: "Digite seu email." })
    register({ name: "password" }, { required: "Digite sua senha." })
  }, [register])

  const onSubmit = data => dispatch(logUserIn(data))

  if (user.email) return <Redirect to="/profile" />

  return (
    <Segment basic>
      <Container>
        <Grid container centered stackable>
          <Grid.Row>
            <Grid.Column width="4">
              <Image src={logo} alt="" centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width="4">
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
                <Form.Field
                  control={Input}
                  label="Email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                    await trigger("email")
                  }}
                  error={
                    errors.email
                      ? { content: errors.email.message, pointing: "below" }
                      : false
                  }
                  autoFocus
                />
                <Form.Field
                  label="Senha"
                  control={Form.Input}
                  type="password"
                  name="password"
                  placeholder="Senha"
                  error={
                    errors.password
                      ? { content: errors.password.message, pointing: "below" }
                      : false
                  }
                  onChange={async (e, { name, value }) => {
                    setValue(name, value)
                    await trigger(name)
                  }}
                />
                <Button.Group fluid>
                  <Button primary type="submit">
                    Conectar
                  </Button>
                  <Button.Or text="ou" />
                  <Button as={Link} to="/register">
                    Registre-se
                  </Button>
                </Button.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}

export default LoginForm
