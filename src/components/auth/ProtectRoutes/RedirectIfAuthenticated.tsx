import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectIfAuthenticatedProps {
  token: string;
  children: ReactNode;
}

const RedirectIfAuthenticated = ({ token, children }: RedirectIfAuthenticatedProps) => {
  const isLoggedIn = !!token;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>;
  }
};

export default RedirectIfAuthenticated;
