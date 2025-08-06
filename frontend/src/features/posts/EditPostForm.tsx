import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
import { postUpdated, selectPostById } from "./postsSlice";

interface EditPostFormData {
  title: string;
  content: string;
  visible: boolean;
}

function EditPostForm() {
  const { postId } = useParams<{ postId: string }>();

  const post = useSelector(selectPostById(postId || ""));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<EditPostFormData>({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      visible: post?.visible || false,
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: EditPostFormData) => {
    if (!post) return;
    dispatch(postUpdated({ ...data, id: post._id }));
    navigate(`/posts/${post._id}`);
  };

  const user = useCurrentUser();

  if (!user?.email) return <Navigate to="/login" replace />;

  if (!post) {
    return (
      <Segment basic>
        <Header>Post not found</Header>
      </Segment>
    );
  }

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
            onChange={async (
              e: any,
              { name, value }: { name: string; value: string }
            ) => {
              setValue(name as keyof EditPostFormData, value);
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
            defaultValue={post.content}
            name="content"
            onChange={async (
              e: any,
              { name, value }: { name: string; value: string }
            ) => {
              setValue(name as keyof EditPostFormData, value);
              await trigger("content");
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
            onChange={async (
              e: any,
              { name, checked }: { name: string; checked: boolean }
            ) => {
              setValue(name as keyof EditPostFormData, checked);
              await trigger("visible");
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
  );
}

export default EditPostForm;
