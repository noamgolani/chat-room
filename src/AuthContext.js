import React, { useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAPI, useAuthAPI } from "./useAPI";

export const authContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh")
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access")
  );
  const { post: askForNewToken } = useAPI("/auth/token");
  const { post: loginReq } = useAPI("/auth/login");
  const { post: registerReq } = useAPI("/auth/register");
  const { get: logoutReq } = useAuthAPI("/auth/logout");

  useEffect(() => {
    (async () => {
      if (refreshToken && refreshToken !== "undefined" && !loggedIn) {
        const [error, data] = await askForNewToken({ token: refreshToken });
        if (error) {
          setRefreshToken(null);
          return console.log(error);
        }
        setAccessToken(data.accessToken);
        localStorage.setItem("access", data.accessToken);
        setUsername(data.username);
        setLoggedIn(true);
      }
    })();
  }, [refreshToken, askForNewToken, loggedIn]);

  const login = useCallback(
    async ({ username, password }) => {
      const [error, data] = await loginReq({
        username,
        password,
      });
      if (error) return console.log(error);
      setRefreshToken(data.refreshToken);
      setAccessToken(data.accessToken);
      localStorage.setItem("refresh", data.refreshToken);
      localStorage.setItem("access", data.accessToken);
      setUsername(username);
      setLoggedIn(true);
    },
    [loginReq]
  );

  const register = useCallback(
    async ({ username, password, email }) => {
      const [error, data] = await registerReq({
        username,
        password,
        email,
      });
      if (error) console.log(error);
    },
    [registerReq]
  );

  const logout = useCallback(async () => {
    const [error, data] = await logoutReq();
    if (error) console.log(error);
    setUsername(null);
    setLoggedIn(false);
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  }, [logoutReq]);

  return (
    <authContext.Provider
      value={{ loggedIn, username, accessToken, login, logout, register }}
    >
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
