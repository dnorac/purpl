import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useCurrentUser } from "../features/user/userSlice";
import logo from "./logo.png";

function Navbar() {
  const user = useCurrentUser();

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
            to="/registro"
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
  );
}

export default Navbar;
