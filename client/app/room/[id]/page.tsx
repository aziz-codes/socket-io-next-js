"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/socket-context"; // Import the custom hook

interface User {
  id: string;

  name: string;
  age: number;
}

const Room = () => {
  const { socket } = useSocket();
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    console.log("useEffect room");
    socket?.on("message", (receivedData: User[]) => {
      console.log("inside message event");
      console.log("recieved data is", receivedData);
      setData(receivedData);
    });

    return () => {
      socket?.off("message"); // Clean up the event listener
    };
  }, [socket]);

  return (
    <div className="flex h-screen items-center justify-center">
      {data.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
};

export default Room;
