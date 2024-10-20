import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { userInfo, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!userInfo || !allowedRoles.includes(userInfo.role)) {
    return <Navigate to="/homepage" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;