import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // 🔐 Replace this with real auth later
  const isAuthenticated = true;
  const user = {
    name: "Prince",
    avatar: "https://i.pravatar.cc/40",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // simple redirect
  };

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-white text-xl font-semibold cursor-pointer">
          MyApp
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a className="text-gray-400 hover:text-white">Home</a>
          <a className="text-gray-400 hover:text-white">Features</a>
          <a className="text-gray-400 hover:text-white">Pricing</a>

          {/* 🔐 Auth Section */}
          {!isAuthenticated ? (
            <>
              <button className="text-gray-400 hover:text-white">Login</button>
              <button className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200">
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative">
              {/* Avatar */}
              <img
                src={user.avatar}
                alt="user"
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-700"
              />

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-lg">
                  <p className="px-4 py-2 text-sm text-gray-400">{user.name}</p>
                  <hr className="border-gray-800" />
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-[#111]">
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#111]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          {open ? (
            <AiOutlineClose size={24} onClick={() => setOpen(false)} />
          ) : (
            <AiOutlineMenu size={24} onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-4 space-y-4">
          <a className="block text-gray-400 hover:text-white">Home</a>
          <a className="block text-gray-400 hover:text-white">Features</a>
          <a className="block text-gray-400 hover:text-white">Pricing</a>

          <hr className="border-gray-800" />

          {!isAuthenticated ? (
            <>
              <button className="block w-full text-left text-gray-400">
                Login
              </button>
              <button className="w-full bg-white text-black py-2 rounded-lg">
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <img src={user.avatar} className="w-8 h-8 rounded-full" />
                <span className="text-gray-300">{user.name}</span>
              </div>
              <button className="block text-gray-300">Profile</button>
              <button onClick={handleLogout} className="block text-red-400">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
