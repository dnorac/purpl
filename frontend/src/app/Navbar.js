import React from "react"
import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { selectCurrentUser } from "../features/user/userSlice"
import logo from "./logo.png"

function Navbar() {
  const { user } = useSelector(selectCurrentUser)

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      {user.email ? (
        <>
          <NavLink
            to="/"
            activeClassName="active-navbar-link"
            exact
            className="navbar-link"
          >
            Posts
          </NavLink>
          <NavLink
            to="/users"
            activeClassName="active-navbar-link"
            exact
            className="navbar-link"
          >
            Usuários
          </NavLink>
          <NavLink
            to={`/users/${user._id}`}
            className="navbar-link"
            activeClassName="active-navbar-link"
            exact
          >
            Perfil
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/register"
            activeClassName="active-navbar-link"
            exact
            className="navbar-link"
          >
            Registro
          </NavLink>
          <NavLink
            to="/login"
            activeClassName="active-navbar-link"
            exact
            className="navbar-link"
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  )
}

export default Navbar
