import { useEffect, useState } from "react";
import AuthContext from "./Authcontext";
import axios from "../../config/axios";
import Loader from "../../components/layout/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch current user
  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/users/me");
      setUser(res?.data?.user);
      console.log(res);

    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await axios.get("/api/v1/auth/logout");
      await getUser();
      setLoading(true)
      console.log(`logout is running`);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setLoading(false)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
    getUser,
    logout,
  };

  console.log(value);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
