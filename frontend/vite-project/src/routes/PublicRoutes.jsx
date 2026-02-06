import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UseAuthContext";

export const PublicRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? <Navigate to="/" /> : children;
};
