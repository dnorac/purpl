import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Header } from "semantic-ui-react"
import { logUserOut } from "../thunks"
import { selectCurrentUser } from "../user/userSlice"

function CurrentUser() {
  const { user } = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  return (
    <div className={`user-panel ${!user.email && "hidden"}`}>
      <Link to={`/users/${user._id}`}>
        <img
          src={
            user.avatar ||
            "https://www.lateralesquerdo.com/wp-content/uploads/2016/07/no-avatar.png"
          }
          alt={user.email || ""}
          className="small-avatar"
        />
      </Link>
      <div className="user-panel-info">
        <Header>
          Olá, <span>{(user.email && user.firstName) || "Visitante"}</span>!
        </Header>
        {user.email && (
          <Button
            color="red"
            size="tiny"
            onClick={() => dispatch(logUserOut())}
          >
            Sair
          </Button>
        )}
      </div>
    </div>
  )
}

export default CurrentUser
