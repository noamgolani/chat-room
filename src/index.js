import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./AuthContext";

import Nav from "./components/Nav";

import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { EventsProvider } from "./EventsContext";

function App() {
  return (
    <AuthProvider>
      <EventsProvider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<ChatRoom />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </EventsProvider>
    </AuthProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export const BASE_URL = "http://localhost:8080";
