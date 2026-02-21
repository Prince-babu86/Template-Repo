import axiosInstance from "../../../config/axios";

const register = async ({ fullname, email, password }) => {
  return await axiosInstance.post("/api/v1/auth/register", {
    fullname,
    email,
    password,
  });
};

const login = async ({ email, password }) => {
  return await axiosInstance.post("/api/v1/auth/login", {
    email,
    password,
  });
};

const googleLogin = async () => {
  window.location.href = "http://localhost:3000/api/v1/auth/google";
};

export default {
  register,
  login,
  googleLogin,
};
