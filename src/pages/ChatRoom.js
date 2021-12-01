import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { BASE_URL } from "..";
import { EventSourcePolyfill } from "event-source-polyfill";

import { authContext, useAuth } from "../AuthContext";

function ChatRoom() {
  const [messages] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { accessToken } = useContext(authContext);
  const loggedIn = useAuth();

  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening && loggedIn) {
      console.log(accessToken);
      const events = new EventSourcePolyfill(`${BASE_URL}/api/events`, {
        headers: {
          Auth: accessToken,
        },
      });

      events.addEventListener("message_sent", (e) => {
        console.log(e);
      });

      events.onopen = (e) => {
        console.log(e);
        console.log("SSE connected");
      };

      events.onerror = console.log;

      events.onmessage = (event) => {
        console.log(event.data);
        //const parsedData = JSON.parse(event.data);
        //console.log(parsedData);
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
      await axios.post(
        `${BASE_URL}/api/chat/message`,
        {
          message: messageValue,
        },
        {
          headers: {
            Auth: accessToken,
          },
        }
      );
      setMessageValue("");
    })();
  }, [messageValue, accessToken]);

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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
