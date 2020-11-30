import React, { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Ref,
  Segment,
  Sticky,
} from "semantic-ui-react";
import Post from "../posts/Post";
import { selectPostsByAuthor } from "../posts/postsSlice";
import { logUserOut } from "../thunks";
import { useCurrentUser } from "../user/userSlice";
import { selectUserById } from "./usersSlice";

function SingleUserPage() {
  const contextRef = createRef();
  const match = useRouteMatch();
  const { params } = useRouteMatch();
  const dispatch = useDispatch();

  const { userId } = params;

  const posts = useSelector(selectPostsByAuthor(userId));
  const loading = useSelector((state) => state.users.state);
  const pageUser = useSelector(selectUserById(userId));
  const user = useCurrentUser();

  if (loading === "loading")
    return (
      <Segment basic>
        <h2>Loading...</h2>
      </Segment>
    );

  if (!pageUser)
    return (
      <section className="post-list">
        <h2>Usuário não encontrado! :(</h2>
      </section>
    );

  const userControls = (
    <>
      <Button
        as={Link}
        to={`${match.url}/update`}
        content="Alterar perfil"
        icon="setting"
        labelPosition="left"
      />
      <Button negative onClick={() => dispatch(logUserOut())} content="Sair" />
    </>
  );
  return (
    <>
      <Segment basic className="profile-header">
        <Container>
          <Grid columns={2} stackable>
            <Grid.Column>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <Image
                    src={
                      pageUser.avatar ||
                      "https://www.lateralesquerdo.com/wp-content/uploads/2016/07/no-avatar.png"
                    }
                    circular
                    centered
                    size="tiny"
                  />
                </Grid.Column>

                <Grid.Column verticalAlign="middle" textAlign="center">
                  <Header size="huge">
                    {pageUser.firstName} {pageUser.lastName}
                  </Header>
                  <p className="user-email">{pageUser.email}</p>
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column verticalAlign="middle" textAlign="center">
              {user._id === userId && userControls}
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
      <Segment basic>
        <Ref innerRef={contextRef}>
          <Container>
            {!user.email ? (
              <p>
                <Link to="/registro">Registre-se</Link> ou{" "}
                <Link to="/login">faça login</Link> para ver mais informações.
              </p>
            ) : (
              <>
                {user._id === userId && (
                  <Sticky context={contextRef} offset={20}>
                    <Button
                      as={Link}
                      to="/posts/add"
                      content="Novo post"
                      icon="write"
                      labelPosition="left"
                      floated="right"
                      primary
                    />
                  </Sticky>
                )}
                <Header size="huge">Últimos posts</Header>

                {posts.length ? (
                  <Grid columns={3} stackable doubling>
                    {posts.map((post) => (
                      <Grid.Column key={post.id}>
                        <Post post={post} showAuthor={false} />
                      </Grid.Column>
                    ))}
                  </Grid>
                ) : (
                  <p>
                    {user._id === pageUser._id ? "Você" : pageUser.firstName}{" "}
                    não postou nada ainda.{" "}
                    {user._id === pageUser._id && (
                      <Link to="/posts/add">Faça um novo post!</Link>
                    )}
                  </p>
                )}
              </>
            )}
          </Container>
        </Ref>
      </Segment>
    </>
  );
}

export default SingleUserPage;
