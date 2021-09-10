import { createContext, useContext, useRef, useState } from "react";

// creates the message context to use across the app
const MessagesContext = createContext();
let InitialMessageList = [];

const useMessagesProvider = () => {
  const [messages, setMessages] = useState([]);
  const apiRef = useRef(null);

  return {
    setAPI: (api) => (apiRef.current = api),
    startAPI: () => {
      apiRef.current.start();
    },
    stopAPI: () => {
      apiRef.current.stop();
    },
    addMessage: (message) => {
      setMessages([...InitialMessageList, message]);
      InitialMessageList.push(message);
    },
    removeMessage: (id) => {
      InitialMessageList = InitialMessageList.filter(
        (message) => message.id !== id
      );
      setMessages(InitialMessageList);
    },
    clearAllMessages: () => {
      InitialMessageList = [];
      setMessages([]);
    },
    messages,
  };
};

export function MessagesProvider({ children }) {
  const messageProvider = useMessagesProvider();
  return (
    <MessagesContext.Provider value={messageProvider}>
      {children}
    </MessagesContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(MessagesContext);
};
