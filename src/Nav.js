import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "./AuthContext";

export default function Nav() {
  const { username, loggedIn } = useContext(authContext);

  return (
    <div id="Nav">
      {loggedIn ? (
        <span>Hello {username}</span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}
