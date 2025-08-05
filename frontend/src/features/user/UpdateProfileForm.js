import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Form,
  Header,
  Input,
  Segment,
} from "semantic-ui-react";
import { updateProfile } from "../thunks";
import { useCurrentUser } from "./userSlice";

function UpdateProfileForm() {
  const { userId } = useParams();
  const user = useCurrentUser();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: "",
    },
  });
  const dispatch = useDispatch();

  if (!user._id || userId !== user._id) return <Navigate to="/" replace />;

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  const avatarUrl = watch("avatar");

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
          <Controller
            name="avatar"
            control={control}
            rules={{ required: "Você deve digitar uma URL." }}
            render={({ field: { onChange, value, name } }) => (
              <Form.Field
                error={
                  errors.avatar
                    ? { content: errors.avatar.message, pointing: "below" }
                    : false
                }
                control={Input}
                type="text"
                label="URL da Imagem"
                name={name}
                placeholder="Avatar URL"
                value={value || user.avatar || ""}
                onChange={(e, { value }) => onChange(value)}
              />
            )}
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
  );
}

export default UpdateProfileForm;
