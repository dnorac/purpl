import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
} from "semantic-ui-react";
import { useCurrentUser } from "../user/userSlice";
import { postAdded, useAllPosts } from "./postsSlice";

function AddPostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      visible: true,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useCurrentUser();
  const { state } = useAllPosts();

  const onSubmit = (data) => {
    const { title, content, visible } = data;
    dispatch(
      postAdded({
        authorId: user._id,
        title,
        content,
        visible,
        callback: () => navigate("/posts"),
      })
    );
  };

  if (!user.email) return <Navigate to="/login" replace />;

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
              setValue(name, value);
              await trigger("title");
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
              setValue(name, value);
              await trigger("title");
            }}
            error={
              errors.content
                ? { content: errors.content.message, pointing: "below" }
                : false
            }
          />
          {/* <ReactQuill
            theme="snow"
            placeholder="Seja criativo!"
            onChange={handleQuillChanged}
          /> */}
          <Form.Field
            control={Checkbox}
            label="Publicar este post"
            name="visible"
            onChange={async (e, { name, checked }) => {
              setValue(name, checked);
              await trigger("visible");
            }}
            defaultChecked={true}
          />
          <Button.Group>
            <Button
              content="Voltar"
              icon="arrow left"
              onClick={() => navigate(-1)}
            />
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
  );
}

export default AddPostForm;
