import React from "react"
import { useDispatch } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { logUserOut } from "../thunks"
import { useCurrentUser } from "../user/userSlice"

function CurrentUser() {
  const user = useCurrentUser()

  const { pathname } = useLocation()

  const dispatch = useDispatch()

  const isViewingOwnProfile = () => pathname === `/users/${user._id}`

  return (
    <div
      className={`user-panel ${
        (!user.email || isViewingOwnProfile()) && "hidden"
      }`}
    >
      <Link to={`/users/${user._id}`}>
        <img
          src={
            user.avatar ||
            "https://www.lateralesquerdo.com/wp-content/uploads/2016/07/no-avatar.png"
          }
          alt={user.email || ""}
        />
      </Link>
      <div className="user-panel-info">
        <h5>
          Olá,
          <br />
          <span>{(user.email && user.firstName) || "Visitante"}</span>!
        </h5>
        {user.email && (
          <Button
            color="red"
            size="tiny"
            compact
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
