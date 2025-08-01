// frontend/src/context/SocketContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let socketInstance;

    if (authUser) {
      socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
        query: { userId: authUser._id },
        transports: ["websocket", "polling"],
        withCredentials: true,
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
