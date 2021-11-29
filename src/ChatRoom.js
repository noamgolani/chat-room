import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { authContext, useAuth } from "./AuthContext";
import { MESSAGE_SENT } from "./events";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { username } = useContext(authContext);

  useAuth();

  const longPolling = useCallback(() => {
    (async () => {
      try {
        const response = await axios.get("/api/event", { timeout: 30000 });
        const { type, content } = response.data;
        if (type === MESSAGE_SENT)
          setMessages((messages) => [...messages, content]);
      } catch (error) {
        if (!error.isAxiosError) console.error(error);
      }
      longPolling();
    })();
  }, []);

  useEffect(() => {
    //First "saved massages" fetch
    (async () => {
      const response = await axios.get("/api/message");
      setMessages(response.data);
    })();
    longPolling();
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
