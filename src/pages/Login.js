import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../AuthContext";

export default function Login() {
  const { login, loggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  return (
    <div id="Login" className="container">
      <div className="basic-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span> Username </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span> Password </span>
        <button
          className="btn form-span-2"
          onClick={() => {
            login({ username, password });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
