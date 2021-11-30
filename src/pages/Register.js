import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../AuthContext";

export default function Register() {
  const { register, loggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) navigate("/");
  }, [loggedIn, navigate]);

  return (
    <div id="Register" className="container">
      <div className="basic-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <span> Username </span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span> Email </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span> Password </span>
        <button
          className="btn form-span-2"
          onClick={async () => {
            setPassword("");
            //TODO add alert of registration
            try {
              await register({ username, password, email });
              navigate("/login");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}
