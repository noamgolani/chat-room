import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { authContext, useAuth } from "../AuthContext";

function ChatRoom() {
  const [messages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { username } = useContext(authContext);
  const loggedIn = useAuth();

  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening && loggedIn) {
      const events = new EventSource("/api/events");

      events.addEventListener("message_sent", (e) => {
        console.log(e);
      });
      events.onopen = () => {
        console.log("SSE connected");
      };

      events.onmessage = (event) => {
        console.log(event);
        const parsedData = JSON.parse(event.data);
        console.log(parsedData);
      };

      setListening(true);
    }
  }, [listening, loggedIn]);

  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get("/api/chat/message");
  //     setMessages(response.data);
  //   })();
  // }, []);

  const sendMessage = useCallback(() => {
    (async () => {
      await axios.post("/api/chat/message", {
        message: messageValue,
      });
      setMessageValue("");
    })();
  }, [messageValue]);

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
        <button
          onClick={() => {
            console.log("asd");
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
