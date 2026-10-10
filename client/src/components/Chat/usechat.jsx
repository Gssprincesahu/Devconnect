import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

const usechat = (userName) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    try {
      socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
        reconnectionAttempts: 5,
        timeout: 5000
      });

      socketRef.current.on("connect", () => {
        setIsConnected(true);
        if (userName) socketRef.current.emit("identify", { userName });
      });

      socketRef.current.on("disconnect", () => {
        setIsConnected(false);
      });

      socketRef.current.on("mostRecentmessage", (mostRecentmessage) => {
        if (Array.isArray(mostRecentmessage)) {
          setMessages([...mostRecentmessage]);
        }
      });

      socketRef.current.on("newChatMessage", (messageData) => {
        if (messageData) {
          setMessages(prev => [...prev, messageData]);
        }
      });
    } catch (err) {
      console.warn("Socket.io connection warning:", err);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userName]);

  const sendMessage = (messageData) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("directMessage", messageData);
    } else {
      // Local fallback append if socket server is offline during dev mode
      setMessages(prev => [...prev, messageData]);
    }
  };

  return { messages, sendMessage, isConnected };
};

export default usechat;
