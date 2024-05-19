import { useNavigate } from "react-router-dom";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage, fetchMessages } from "../services/chatService";
import io from "socket.io-client";
import moment from "moment";
import toast from "react-hot-toast";

const socket = io("http://localhost:3000");

const ChatRoom = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const { data: messages, refetch } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  const queryClient = useQueryClient();

  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
      toast.success("Message deleted");
    },
    onError: (error) => {
      toast.error(error.message || "Error deleting message");
    },
  });

  const handleDelete = (messageId) => {
    deleteMessageMutation.mutate(messageId);
  };

  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("chat message", () => {
      refetch();
    });

    return () => {
      socket.off("chat message");
    };
  }, [refetch]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
    toast.success("User logged out successfully");
  }

  return (
    <div className="flex h-screen">
      {/* Chat Box */}
      <div className="w-full bg-white">
        <div className="flex flex-col h-full">
          <div className=" flex items-center justify-between bg-gray-200 py-2 px-4 mb-2">
            <span>Chat Room</span>
            <button
              onClick={handleLogout}
              className="py-1 px-3 bg-indigo-600 text-white rounded-md "
            >
              Logout
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4">
            {messages?.map((message) => (
              <div
                key={message._id}
                className="py-2 px-3 mb-2 rounded bg-gray-100 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{message.name}</p>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs text-gray-500">
                    {moment(message.createdAt).format("MMM DD, YYYY h:mm A")}
                  </p>
                </div>
                {message.name === name && (
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <div className="bg-gray-200 py-2 px-4">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
