import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";
import axios from "axios";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { socket } = useSocketContext();

  const sendMessage = async (messageText) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const { data: newMessage } = await axios.post(
        `http://localhost:8000/api/messages/send/${selectedConversation._id}`,
        { message: messageText },
        { withCredentials: true }
      );

      // Add message locally
      setMessages([...messages, newMessage]);

      // Emit via socket
      if (socket) socket.emit("sendMessage", newMessage);
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
