// SocketContext.tsx
"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";

// Define a type for the context state
interface SocketContextProps {
  socket: Socket | null;
  initializeSocket: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Function to initialize the socket on demand
  const initializeSocket = useCallback(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");
      setSocket(socketRef.current);
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, initializeSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for using the Socket context
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
