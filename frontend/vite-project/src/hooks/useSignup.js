// src/hooks/useSignup.js
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/UseAuthContext";

const useSignup = () => {
  axios.defaults.withCredentials = true;

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate(); // ✅ ADD THIS

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    // Frontend validation
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { fullName, username, password, gender }
      );

      if (data.error) {
        throw new Error(data.error);
      }

      // local storage
      localStorage.setItem("chat-user", JSON.stringify(data));

      // context
      setAuthUser(data);

      toast.success("Signup successful!");

      // 🔥 THIS WAS MISSING
      navigate("/login");

      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
