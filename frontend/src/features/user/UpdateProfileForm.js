import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Redirect, useRouteMatch } from "react-router-dom"
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  Segment,
} from "semantic-ui-react"
import { updateProfile } from "../thunks"
import { useCurrentUser } from "./userSlice"

function UpdateProfileForm() {
  const match = useRouteMatch()
  const user = useCurrentUser()
  const { handleSubmit, register, watch, errors, setValue, trigger } = useForm()
  const dispatch = useDispatch()

  useEffect(() => {
    register({ name: "avatar" }, { required: "Você deve digitar uma URL." })
  }, [register])

  if (!user._id || match.params.userId !== user._id) return <Redirect to="/" />

  const onSubmit = data => {
    dispatch(updateProfile(data))
  }

  const avatarUrl = watch("avatar")

  return (
    <Segment basic>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header size="huge">Alterar perfil</Header>
          <Segment basic textAlign="center">
            <img
              src={avatarUrl || user.avatar}
              alt=""
              className="profile-avatar"
            />
          </Segment>
          <Form.Field
            error={
              errors.avatar
                ? { content: errors.avatar.message, pointing: "below" }
                : false
            }
            control={Input}
            type="text"
            label="URL da Imagem"
            defaultValue={user.avatar}
            name="avatar"
            placeholder="Avatar URL"
            onChange={async (e, { name, value }) => {
              setValue(name, value)
              await trigger()
            }}
          />
          <Divider horizontal section>
            OU
          </Divider>
          <Form.Field control={Input} type="file" label="Envie um arquivo" />
          <Button primary className="primary">
            Salvar
          </Button>
          <Button negative className="primary">
            Apagar conta
          </Button>
        </Form>
      </Container>
    </Segment>
  )
}

export default UpdateProfileForm
