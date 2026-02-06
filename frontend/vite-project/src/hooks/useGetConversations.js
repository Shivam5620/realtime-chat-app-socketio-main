import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/UseAuthContext";

axios.defaults.withCredentials = true; // ensure cookies are sent

const useGetConversations = () => {
  const { authUser } = useAuthContext(); // only fetch if logged in
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!authUser) return; // skip fetching if not logged in

    const getConversations = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("http://localhost:8000/api/users");
        console.log("Backend response:", data);

        // Backend returns an array directly
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
        toast.error(error.response?.data?.error || error.message || "Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [authUser]);

  return { loading, conversations };
};

export default useGetConversations;
