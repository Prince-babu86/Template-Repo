import { Navigate } from "react-router-dom";
import UseAuth from "../context/auth/UseAuth";

const PrivateRoute = ({ children }) => {
  const {isAuthenticated} = UseAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
