import { NavLink } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useCurrentUser } from "../routes/users/-user-slice";
import logo from "./logo.png";

function Navbar() {
  const user = useCurrentUser();

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="" className="logo" />
      </Link>
      {user?.email ? (
        <>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active-navbar-link" : "navbar-link"
            }
          >
            Posts
          </NavLink>
          <NavLink
            to="/users"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active-navbar-link" : "navbar-link"
            }
          >
            Usuários
          </NavLink>
          <NavLink
            to={`/users/${user?._id}`}
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active-navbar-link" : "navbar-link"
            }
          >
            Perfil
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/register"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active-navbar-link" : "navbar-link"
            }
          >
            Registro
          </NavLink>
          <NavLink
            to="/login"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active-navbar-link" : "navbar-link"
            }
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
