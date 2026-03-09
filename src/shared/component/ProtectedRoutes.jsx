import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoutes({ children }) {
  const { user, ready } = useAuth();

  if (!ready) return null;

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}

export default ProtectedRoutes;
