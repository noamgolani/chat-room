import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MESSAGE_SENT } from "./events";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");

  const longPolling = useCallback(() => {
    (async () => {
      const response = await axios.get("/api/event", { timeout: 30000 });
      const { type, content } = response.data;
      if (type === MESSAGE_SENT)
        setMessages((messages) => [...messages, content]);
      longPolling();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/message");
      setMessages(response.data);
    })();
    longPolling();
  }, [longPolling]);

  const sendMessage = useCallback(() => {
    (async () => {
      await axios.post("/api/message", {
        from: "noam",
        message: messageValue,
      });
      setMessageValue("");
    })();
  }, [messageValue]);

  return (
    <div className="App">
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

export default App;
