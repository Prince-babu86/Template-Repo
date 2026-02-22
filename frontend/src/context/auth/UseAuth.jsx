import React, { useContext } from "react";
import AuthContext from "./Authcontext";

const UseAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default UseAuth;
