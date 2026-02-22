import { Navigate } from "react-router-dom";
import UseAuth from "../context/auth/UseAuth";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoutes;
