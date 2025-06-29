import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, admin } = useContext(AuthContext);

  if (adminOnly && !admin) {
    return <Navigate to="/admin" />;
  }
  if (!adminOnly && !user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute; 