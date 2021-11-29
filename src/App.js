import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/message");
      setMessages(response.data);
    })();
  }, []);

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
