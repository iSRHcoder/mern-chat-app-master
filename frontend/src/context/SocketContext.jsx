import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    let socketInstance;

    if (authUser) {
      socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_URL, {
        query: { userId: authUser._id },
        transports: ["websocket"], // ✅ important for Render and stability
        secure: true, // ✅ enforces HTTPS
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect(); // ✅ use disconnect for cleanup
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
