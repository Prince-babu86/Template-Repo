import axiosInstance from "../../../config/axios";
// import config from "../../../config/config";

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
  // console.log(config.ApiUrl);
 window.location.href = `${import.meta.env.VITE_API_URL}/api/v1/auth/google`;
};

export default {
  register,
  login,
  googleLogin,
};
