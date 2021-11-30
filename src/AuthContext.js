import axios from "axios";
import React, { useCallback, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh")
  );

  const askForNewToken = useCallback(async (refreshToken) => {
    await axios.post("/api/auth/token", { token: refreshToken });
  }, []);

  useEffect(() => {
    (async () => {
      if (refreshToken && !loggedIn) {
        try {
          await askForNewToken(refreshToken);
          setLoggedIn(true);
          localStorage.setItem("refresh", refreshToken);
        } catch (error) {
          console.log(error);
          setRefreshToken(null);
        }
      }
    })();
  }, [refreshToken, askForNewToken, loggedIn]);

  const login = useCallback(async ({ username, password }) => {
    try {
      const refresh = await axios.post("/api/auth/login", {
        username,
        password,
      });
      setRefreshToken(refresh.data.refreshToken);
      localStorage.setItem("refresh", refresh.data.refreshToken);
      setUsername(username);
      setLoggedIn(true);
    } catch (error) {
      if (error.isAxiosError) console.log(error.response.data.error);
      else console.log(error);
    }
  }, []);

  const register = useCallback(async ({ username, password, email }) => {
    try {
      await axios.post("/api/auth/register", {
        username,
        password,
        email,
      });
    } catch (error) {
      if (error.isAxiosError) throw error.response.data.error;
      else {
        console.log(error);
        throw "Somthing went bad";
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await axios.post("/api/auth/logout", this.user);
    setUsername(null);
    setLoggedIn(false);
  }, []);

  return (
    <authContext.Provider
      value={{ loggedIn, username, login, logout, register }}
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
