import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isAuthenticated = false

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoutes;
