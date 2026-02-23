import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import AuthApi from "../apis/AuthApi";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password || !user.fullname) {
      alert("All fields required");
      return;
    }

    const { fullname, email, password } = user;

    try {
      setLoading(true);

      await AuthApi.register({ fullname, email, password });

      // ✅ Redirect after success
      navigate("/login"); // or "/dashboard" if auto-login

    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      alert(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] p-6">

        <h2 className="text-2xl font-semibold text-white text-center mb-1">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Welcome back, build something amazing 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleOnChange}
              placeholder="Enter fullname"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-800 text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
              placeholder="example@gmail.com"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-800 text-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="********"
              value={user.password}
              onChange={handleOnChange}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black border border-gray-800 text-white"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 cursor-pointer text-gray-500"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium text-black bg-white hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="grow border-t border-gray-800"></div>
          <span className="mx-3 text-gray-600 text-sm">OR</span>
          <div className="grow border-t border-gray-800"></div>
        </div>

        {/* Google */}
        <button
          onClick={AuthApi.googleLogin}
          className="w-full flex items-center justify-center gap-3 bg-black border border-gray-800 hover:bg-[#111] text-white py-3 rounded-xl"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{" "}
          <NavLink to={`/login`} className="text-white hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}