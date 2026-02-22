import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import AuthApi from "../apis/AuthApi";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);

      const {email , password} = user

       await AuthApi.login({email , password});

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-6">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white text-center mb-1">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to continue 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={user.fullname}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              name="password"
              value={user.password}
              onChange={handleOnChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white/20"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500 hover:text-white"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span className="text-sm text-gray-500 hover:text-white cursor-pointer">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium text-black bg-white hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow border-t border-gray-800"></div>
          <span className="mx-3 text-gray-600 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-800"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={AuthApi.googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-black border border-gray-800 hover:bg-[#111] text-white py-3 rounded-xl transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <NavLink
            to={`/register`}
            className="text-white cursor-pointer hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
