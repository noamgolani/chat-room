import axios from "axios";
import React, { useCallback, useState } from "react";

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
