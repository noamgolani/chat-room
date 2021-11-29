import axios from "axios";
import React from "react";

const defaultValue = {
  user: null,
  async login(username) {
    await axios.post("/api/login", { username });
    this.user = { username };
  },
  async logout() {
    await axios.post("/api/logout", this.user);
    this.user = null;
  },
};

export const authContext = React.createContext(defaultValue);

export const AuthProvider = ({ children }) => (
  <authContext.Provider value={defaultValue}> {children} </authContext.Provider>
);
export const Auth = ({ children }) => (
  <authContext.Consumer> {{ children }}</authContext.Consumer>
);
