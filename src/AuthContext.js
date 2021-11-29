import axios from "axios";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = useCallback(async (name) => {
    await axios.post("/api/login", { username: name });
    setUsername(name);
    setLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await axios.post("/api/logout", this.user);
    setUsername(null);
    setLoggedIn(false);
  }, []);

  return (
    <authContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const Auth = ({ children }) => (
  <authContext.Consumer> {{ children }}</authContext.Consumer>
);

export const useAuth = () => {
  const { loggedIn } = useContext(authContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);
  return loggedIn;
};
