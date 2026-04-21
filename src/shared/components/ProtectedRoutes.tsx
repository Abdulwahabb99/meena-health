import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "shared/hooks/useAuth";

function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const { user, token, otpVerified, ready } = useAuth();

  if (!ready) return null;

  if (!user || !token) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!otpVerified) {
    return <Navigate to="/verify-otp" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoutes;
