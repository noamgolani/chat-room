import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./AuthContext";

export default function Login() {
  const { login, loggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  return (
    <div id="Login">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={() => {
          login(username);
        }}
      >
        Login
      </button>
    </div>
  );
}
