import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectIfAuthenticatedProps {
  user: { role: string } | null;
  children: ReactNode;
}

const RedirectIfAuthenticated = ({ user, children }: RedirectIfAuthenticatedProps) => {
  const isLoggedIn = !!user;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else {
    return <>{children}</>;
  }
};

export default RedirectIfAuthenticated;
