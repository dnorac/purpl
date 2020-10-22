import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, Redirect, useHistory } from "react-router-dom"
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
import { selectCurrentUser } from "../user/userSlice"
import { postAdded, selectAllPosts } from "./postsSlice"

function AddPostForm() {
  const { register, handleSubmit, errors, setValue, trigger } = useForm({
    defaultValues: {
      title: "",
      content: "",
      visible: true,
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

  const { user } = useSelector(selectCurrentUser)
  const { state } = useSelector(selectAllPosts)

  const onSubmit = data => {
    const { title, content, visible } = data
    dispatch(
      postAdded({
        authorId: user._id,
        title,
        content,
        visible,
        callback: () => history.push("/posts"),
      })
    )
    // history.push("/posts");
  }

  if (!user.email) return <Redirect to="/login" />

  return (
    <Segment basic>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state === "loading"}>
          <Header size="huge">Novo post</Header>
          <Form.Field
            control={Input}
            label="Título"
            placeholder="Escolha um bom título!"
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
            defaultChecked={true}
          />
          <Button.Group>
            <Button as={Link} to="/posts" content="Voltar" icon="arrow left" />
            <Button animated primary>
              <Button.Content visible content="Postar" />
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

export default AddPostForm
