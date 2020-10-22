import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Container, Item, Segment } from "semantic-ui-react"
import { fetchUsers } from "../thunks"
import { selectCurrentUser } from "../user/userSlice"
import { selectAllUsers } from "../users/usersSlice"
import User from "./User"

function UserList() {
  const { users, state } = useSelector(selectAllUsers)
  const { user } = useSelector(selectCurrentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (!user.email) return <Redirect to="/login" />

  if (state === "loading") return <h1>Carregando...</h1>

  if (users.length === 0) return <h1>Não há usuários. :(</h1>

  return (
    <Segment basic>
      <Container>
        <Item.Group relaxed="very" link divided>
          {users.map(user => (
            <User user={user} />
          ))}
        </Item.Group>
      </Container>
    </Segment>
  )
}

export default UserList
