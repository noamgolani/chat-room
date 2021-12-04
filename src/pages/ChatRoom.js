import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { authContext } from "../AuthContext";
import {
  eventsContext,
  MESSAGE_SENT,
  USER_JOINED,
  USER_LEFT,
} from "../EventsContext";

import { BASE_URL } from "..";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { accessToken, loggedIn } = useContext(authContext);
  const { connected, addListener } = useContext(eventsContext);
  const navigate = useNavigate();

  // If not logged in redirect to login
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  // TODO move all 'axios' to to separate hook
  // Fetch all "Old messages"
  useEffect(() => {
    (async () => {
      const {
        data: { messages },
      } = await axios.get(`${BASE_URL}/api/chat/messages`, {
        headers: {
          Auth: accessToken,
        },
      });
      const {
        data: { connected },
      } = await axios.get(`${BASE_URL}/api/chat/connected`, {
        headers: {
          Auth: accessToken,
        },
      });
      setMessages(messages);
      setConnectedUsers(connected);
    })();
  }, [accessToken]);

  // On connection listen to message sent event
  useEffect(() => {
    if (!connected) return;
    addListener(MESSAGE_SENT, (data) => {
      setMessages((messages) => [...messages, data]);
    });
    addListener(USER_LEFT, (data) => {
      setConnectedUsers((connectedUsers) =>
        connectedUsers.filter(({ userId }) => userId !== data.userId)
      );
      setMessages((messages) => [
        ...messages,
        { message: `${data.username} left the chat`, timestamp: Date.now() },
      ]);
    });
    addListener(USER_JOINED, (data) => {
      setConnectedUsers((connectedUsers) => [...connectedUsers, data]);
      setMessages((messages) => [
        ...messages,
        { message: `${data.username} joined the chat`, timestamp: Date.now() },
      ]);
    });
  }, [connected, addListener]);

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
      setMessages((messages) => [
        ...messages,
        { from: "Me", message: messageValue, timestamp: Date.now() }, // TODO change from to username and update timestamp when recieved in server`
      ]);
      setMessageValue("");
    })();
  }, [messageValue, accessToken]);

  return (
    <div id="ChatRoom" className="container">
      <div className="connected-users">
        {connectedUsers.map(({ username, userId }) => (
          <div className="connected-user" key={userId}>
            {username}
          </div>
        ))}
      </div>
      <div className="message-list">
        {messages.map(({ message, from, timestamp }, index) => (
          <div key={index} className="message">
            {from && <h2> {from} </h2>}
            <p>{message}</p>
            <span>{moment(timestamp).fromNow()}</span>
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
