import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { authContext } from "../AuthContext";
import {
  eventsContext,
  MESSAGE_SENT,
  USER_JOINED,
  USER_LEFT,
} from "../EventsContext";

import { useAuthAPI } from "../useAPI";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messageValue, setMessageValue] = useState("");
  const { loggedIn } = useContext(authContext);
  const { connected, addListener } = useContext(eventsContext);
  const navigate = useNavigate();

  const { get: getAllMessages } = useAuthAPI("/chat/messages");
  const { get: getAllConnected } = useAuthAPI("/chat/connected");
  const { post: sendMessage } = useAuthAPI("/chat/message");

  // If not logged in redirect to login
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  // Fetch all "Old messages"
  useEffect(() => {
    (async () => {
      const [messagesError, messages] = await getAllMessages();
      const [connectedError, connected] = await getAllConnected();
      if (messagesError || connectedError) return;
      setMessages(messages);
      setConnectedUsers(connected);
    })();
  }, [getAllConnected, getAllMessages]);

  // On connection listen to message sent event
  useEffect(() => {
    if (!connected) return;
    addListener(MESSAGE_SENT, (data) => {
      console.log(data);
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

  const onSendClicked = useCallback(() => {
    (async () => {
      const [error, data] = await sendMessage({ message: messageValue });
      if (error) return console.log(error);
      setMessages((messages) => [
        ...messages,
        { from: "Me", message: messageValue, timestamp: Date.now() }, // TODO change from to username and update timestamp when recieved in server`
      ]);
      setMessageValue("");
    })();
  }, [sendMessage, messageValue]);

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
        <button onClick={onSendClicked}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
