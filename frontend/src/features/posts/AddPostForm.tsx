import { Controller, useForm } from "react-hook-form";
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
import { AppDispatch } from "../../app/store";
import { useCurrentUser } from "../user/userSlice";
import { postAdded, useAllPosts } from "./postsSlice";

interface AddPostFormData {
  title: string;
  content: string;
  visible: boolean;
}

function AddPostForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AddPostFormData>({
    defaultValues: {
      title: "",
      content: "",
      visible: true,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const user = useCurrentUser();
  const { state } = useAllPosts();

  const onSubmit = (data: AddPostFormData) => {
    if (!user) return;

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

  // Early return if not authenticated
  if (!user?.email) return <Navigate to="/login" replace />;

  return (
    <Segment basic>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} loading={state === "loading"}>
          <Header size="huge">Novo post</Header>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Título é obrigatório" }}
            render={({ field }) => (
              <Form.Field
                control={Input}
                label="Título"
                placeholder="Escolha um bom título!"
                {...field}
                autoFocus
                error={
                  errors.title
                    ? { content: errors.title.message, pointing: "below" }
                    : false
                }
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            rules={{ required: "Conteúdo é obrigatório" }}
            render={({ field }) => (
              <Form.Field
                control={TextArea}
                label="Conteúdo"
                placeholder="Seja criativo!"
                {...field}
                error={
                  errors.content
                    ? { content: errors.content.message, pointing: "below" }
                    : false
                }
              />
            )}
          />
          {/* <ReactQuill
            theme="snow"
            placeholder="Seja criativo!"
            onChange={handleQuillChanged}
          /> */}
          <Controller
            name="visible"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Form.Field
                control={Checkbox}
                label="Publicar este post"
                checked={value}
                onChange={(e: any, { checked }: { checked: boolean }) =>
                  onChange(checked)
                }
              />
            )}
          />
          <Button.Group>
            <Button
              content="Voltar"
              icon="arrow left"
              onClick={() => navigate(-1)}
            />
            <Button animated primary type="submit">
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
