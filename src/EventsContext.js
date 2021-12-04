import React, { useCallback, useState, useEffect, useContext } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

import { authContext } from "./AuthContext";

import { BASE_URL } from "./index";

export const eventsContext = React.createContext({});

export const EventsProvider = ({ children }) => {
  const [eventSource, setEventSource] = useState(false);

  const { loggedIn, accessToken } = useContext(authContext);

  useEffect(() => {
    if (!loggedIn && eventSource) {
      eventSource.close();
      setEventSource(null);
    }
    if (!eventSource && loggedIn) {
      const events = new EventSourcePolyfill(`${BASE_URL}/api/events`, {
        headers: {
          Auth: accessToken,
        },
      });

      events.onopen = (e) => {
        setEventSource(events);
      };

      events.onerror = () => {
        eventSource.close();
        setEventSource(null);
      };
    }
  }, [eventSource, loggedIn, accessToken]);

  const addListener = useCallback(
    (eventType, listener) => {
      if (eventSource)
        eventSource.addEventListener(eventType, ({ data }) => {
          listener(JSON.parse(data));
        });
    },
    [eventSource]
  );

  return (
    <eventsContext.Provider value={{ connected: !!eventSource, addListener }}>
      {children}
    </eventsContext.Provider>
  );
};

export const MESSAGE_SENT = "message_sent";
export const USER_JOINED = "user_joined";
export const USER_LEFT = "user_left";
