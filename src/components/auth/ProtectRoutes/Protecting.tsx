import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  token: string;
  children: ReactNode;
}

const ProtectedRoute = ({ token, children }: ProtectedRouteProps) => {
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
