import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { authContext, useAuth } from "./AuthContext";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { username, logout } = useContext(authContext);
  const loggedIn = useAuth();

  const longPolling = useCallback(() => {
    (async () => {
      if (!loggedIn) return;
      try {
        const response = await axios.get("/api/event", {
          headers: { username: username },
          timeout: 30000,
        });
        const { type, content } = response.data;
        switch (type) {
          case "message_sent":
            setMessages((messages) => [...messages, content]);
            break;
          case "user_joined":
            alert(`${content.username} Joined the chat!`);
            break;
          default:
            break;
        }
      } catch (error) {
        if (!error.isAxiosError) console.error(error);
      }
      longPolling();
    })();
  }, [loggedIn, username]);

  useEffect(() => {
    //First "saved massages" fetch
    (async () => {
      const response = await axios.get("/api/message");
      setMessages(response.data);
    })();
    longPolling();
    return logout;
  }, [longPolling]);

  const sendMessage = useCallback(() => {
    (async () => {
      await axios.post("/api/message", {
        from: username,
        message: messageValue,
      });
      setMessageValue("");
    })();
  }, [username, messageValue]);

  return (
    <div id="ChatRoom">
      <div className="messages">
        {messages.map(({ message, from }, index) => (
          <div key={index} className="message">
            <span>From: {from}</span>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <div className="messages-input">
        <input
          type="text"
          id="messageInput"
          value={messageValue}
          onChange={({ target: { value } }) => {
            setMessageValue(value);
          }}
        ></input>
        <button onClick={sendMessage}> Send </button>
      </div>
    </div>
  );
}

export default ChatRoom;
