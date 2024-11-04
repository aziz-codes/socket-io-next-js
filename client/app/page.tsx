"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import io, { Socket } from "socket.io-client";

const Chat = () => {
  const [userName, setUser] = useState("");
  const [socket, setSocket] = useState<null | Socket>(null); // Local socket state
  const router = useRouter();

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) {
      alert("Please enter a username");
      return;
    }

    // Initialize socket connection
    const newSocket = io("http://localhost:5000"); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);

      const user = {
        name: userName,
        age: 21,
      };

      // Emit user data to the server
      newSocket.emit("userEvent", user);

      // Navigate to the room after emitting the user data
      router.push(`/room/${userName}`);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };

  return (
    <form className="flex h-screen justify-center items-center gap-2">
      <input
        type="text"
        className="rounded-md border px-2 py-1.5 outline-none"
        placeholder="@username"
        onChange={(e) => setUser(e.target.value)}
      />
      <button
        className="px-2 py-1.5 bg-sky-600 text-white rounded-md"
        onClick={handleClick}
      >
        Enter Room
      </button>
    </form>
  );
};

export default Chat;
