import { useEffect, useState, useRef, useMemo } from "react";
import io from "socket.io-client";
import { SocketContext } from "./SocketContext";
import { useAuthContext } from "./UseAuthContext";

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!authUser || socketRef.current) return;

    const socketInstance = io("http://localhost:8000", {
      query: { userId: authUser._id },
    });

    socketRef.current = socketInstance;

    socketInstance.on("getOnlineUsers", (users) => setOnlineUsers(users));

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [authUser]);

  // ✅ Expose a getter instead of the ref value
  const contextValue = useMemo(
    () => ({
      getSocket: () => socketRef.current,
      onlineUsers,
    }),
    [onlineUsers]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};