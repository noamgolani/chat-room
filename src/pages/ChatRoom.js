import {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import {authContext} from '../AuthContext';
import {eventsContext, MESSAGE_SENT} from '../EventsContext';

import {BASE_URL} from '..';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageValue, setMessageValue] = useState('');
  const {accessToken, loggedIn} = useContext(authContext);
  const {connected, addListener} = useContext(eventsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) navigate('/login');
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (!connected) return;
    addListener(MESSAGE_SENT, ({data}) => {
      setMessages(messages => [...messages, JSON.parse(data)]);
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
        },
      );
      setMessageValue('');
    })();
  }, [messageValue, accessToken]);

  return (
    <div id="ChatRoom" className="container">
      <div className="message-list">
        {messages.map(({message, from, timestamp}, index) => (
          <div key={index} className="message">
            <h2> {from} </h2>
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
          onChange={({target: {value}}) => {
            setMessageValue(value);
          }}></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
