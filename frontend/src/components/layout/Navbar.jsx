import { Search, Bell } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../context/auth/UseAuth";

const Navbar = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/" },
    { name: "Activity", path: "/activity" },
    { name: "Manage", path: "/manage" },
    { name: "Program", path: "/program" },
    { name: "Account", path: "/account" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="w-full bg-[#030712] text-white px-6 py-3 flex items-center justify-between border-b border-white/5">
      {/* Left Logo */}

      {/* 🔥 If User Logged In */}
      {user ? (
        <>
          {/* Center Menu */}
          <div className="hidden md:flex items-center gap-2 bg-[#0b1220] p-1 rounded-full">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="bg-[#0b1220] p-2 rounded-full hover:bg-white/5 cursor-pointer">
              <Search size={18} />
            </div>

            {/* Notification */}
            <div className="bg-[#0b1220] p-2 rounded-full hover:bg-white/5 cursor-pointer">
              <Bell size={18} />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2 bg-[#0b1220] px-3 py-1 rounded-full">
              <img
                src={`https://i.pinimg.com/736x/55/b5/95/55b595a26b32704b1d90b9b697862bcf.jpg`}
                alt="user"
                className="w-7 h-7 rounded-full"
              />
              <div className="text-xs leading-tight hidden sm:block">
                <p className="font-medium">{user?.fullname || "User"}</p>
                <p className="text-gray-400 text-[10px]">{user?.email}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* 🔥 If NOT Logged In */
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1.5 text-sm text-gray-300 hover:text-white"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-1.5 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
