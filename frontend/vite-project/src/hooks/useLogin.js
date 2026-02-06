import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UseAuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
      axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password },// needed for JWT cookie
      );

      if (data.error) throw new Error(data.error);

      // Save user in localStorage and context
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      toast.success("Login successful!");
      navigate("/"); // redirect to Home
    } catch (err) {
      toast.error(err.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
