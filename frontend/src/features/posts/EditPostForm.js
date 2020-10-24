import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory, useRouteMatch } from "react-router-dom"
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Icon,
  Input,
  Segment,
  TextArea,
} from "semantic-ui-react"
import { useCurrentUser } from "../user/userSlice"
import { postUpdated, selectPostById } from "./postsSlice"

function EditPostForm() {
  const {
    params: { postId },
  } = useRouteMatch()

  const post = useSelector(selectPostById(postId))

  const { register, handleSubmit, errors, setValue, trigger } = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
      visible: post.visible,
    },
  })

  useEffect(() => {
    register({ name: "title" }, { required: "Digite um título para seu post." })
    register(
      { name: "content" },
      { required: "Seu post precisa ter um corpo." }
    )
    register({ name: "visible" })
  }, [register])

  const history = useHistory()

  const dispatch = useDispatch()
  const onSubmit = data => {
    dispatch(postUpdated({ ...data, id: post.id }))
    history.push("/posts")
  }

  const user = useCurrentUser()

  if (!user.email) return <Redirect to="/login" />

  return (
    <Segment basic>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Header size="huge">Editar post</Header>
          <Form.Field
            control={Input}
            label="Título"
            placeholder="Escolha um bom título!"
            defaultValue={post.title}
            name="title"
            type="text"
            onChange={async (e, { name, value }) => {
              setValue(name, value)
              await trigger("title")
            }}
            autoFocus
            error={
              errors.title
                ? { content: errors.title.message, pointing: "below" }
                : false
            }
          />
          <Form.Field
            control={TextArea}
            label="Conteúdo"
            placeholder="Seja criativo!"
            defaultValue={post.content}
            name="content"
            onChange={async (e, { name, value }) => {
              setValue(name, value)
              await trigger("title")
            }}
            error={
              errors.content
                ? { content: errors.content.message, pointing: "below" }
                : false
            }
          />
          <Form.Field
            control={Checkbox}
            label="Publicar este post"
            name="visible"
            onChange={async (e, { name, checked }) => {
              setValue(name, checked)
              await trigger("visible")
            }}
            defaultChecked={post.visible}
          />
          <Button.Group>
            <Button as={Link} to="/posts" content="Voltar" icon="arrow left" />
            <Button animated primary>
              <Button.Content visible content="Concluir" />
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </Button.Group>
        </Form>
      </Container>
    </Segment>
  )
}

export default EditPostForm
