import React from "react"
import { Link } from "react-router-dom"
import { Item } from "semantic-ui-react"

function User({ user }) {
  const { firstName, lastName, avatar } = user

  return (
    <Item as={Link} to={`/users/${user._id}`}>
      <Item.Image src={avatar} size="tiny" avatar />
      <Item.Content verticalAlign="middle">
        <Item.Header>
          {firstName} {lastName}
        </Item.Header>
      </Item.Content>
    </Item>
  )
}

export default User
