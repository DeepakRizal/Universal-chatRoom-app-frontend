// src/components/MessageInput.jsx

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postMessage } from "../services/chatService";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const userName = localStorage.getItem("name");
  const { mutate } = useMutation({
    mutationFn: postMessage,
    onSuccess: (data) => {
      socket.emit("chat message", data);
      setMessage("");
    },
    onError: (error) => {
      console.error("Message sending error", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && message) {
      mutate({ name: userName, content: message });
    } else {
      console.error("User name or message content is missing");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
