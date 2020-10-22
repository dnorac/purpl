import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useRouteMatch } from "react-router-dom"
import { Button, Container, Header, Item, Segment } from "semantic-ui-react"
import Post from "../posts/Post"
import { selectPostsByAuthor } from "../posts/postsSlice"
import { logUserOut } from "../thunks"
import { selectCurrentUser } from "../user/userSlice"
import { selectUserById } from "./usersSlice"

function SingleUserPage() {
  const match = useRouteMatch()
  const { params } = useRouteMatch()
  const dispatch = useDispatch()

  const { userId } = params

  const posts = useSelector(selectPostsByAuthor(userId))
  const pageUser = useSelector(selectUserById(userId))
  const { user } = useSelector(selectCurrentUser)

  if (!pageUser)
    return (
      <section className="post-list">
        <h2>Usuário não encontrado! :(</h2>
      </section>
    )
  return (
    <>
      <Segment basic className="profile-header">
        <Container>
          <Item.Group>
            <Item>
              <Item.Image
                src={
                  pageUser.avatar ||
                  "https://www.lateralesquerdo.com/wp-content/uploads/2016/07/no-avatar.png"
                }
                avatar
                size="tiny"
              />

              <Item.Content verticalAlign="middle">
                <Item.Header size="huge">
                  {pageUser.firstName} {pageUser.lastName}
                </Item.Header>
                <Item.Meta>{pageUser.email}</Item.Meta>
              </Item.Content>
            </Item>
          </Item.Group>
        </Container>
      </Segment>
      <Segment basic>
        <Container>
          {!user.email ? (
            <p>
              <Link to="/register">Registre-se</Link> ou{" "}
              <Link to="/login">faça login</Link> para ver mais informações.
            </p>
          ) : (
            <>
              <Header size="huge">Últimos posts</Header>
              <Item.Group divided>
                {posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </Item.Group>
            </>
          )}
          {user._id === userId && (
            <>
              <Button
                negative
                onClick={() => dispatch(logUserOut())}
                content="Sair"
              />
              <Button
                as={Link}
                to={`${match.url}/update`}
                content="Alterar perfil"
                color="violet"
              />
            </>
          )}
        </Container>
      </Segment>
    </>
  )
}

export default SingleUserPage
