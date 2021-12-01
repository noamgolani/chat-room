import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../AuthContext";

export default function Nav() {
  const { username, loggedIn, logout } = useContext(authContext);

  return (
    <div id="Nav">
      <ul className="nav-bar">
        {loggedIn ? (
          <>
            <li className="nav-item">
              <a href="/#" className="btn" onClick={logout}>
                Logout
              </a>
            </li>
            <li className="nav-item">Hello {username}</li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login" className="btn">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
