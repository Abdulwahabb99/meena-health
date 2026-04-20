import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { user, token, ready } = useAuth();

  if (!ready) return null;

  if (!user || !token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
