import {
  LayoutDashboard,
  Activity,
  Settings,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import UseAuth from "../../context/auth/UseAuth";
// your custom hook

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/" },
  { name: "Activity", icon: Activity, path: "/activity" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Account", icon: User, path: "/account" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = UseAuth(); // from your auth system

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-[#030712] border-r-[0.1px] border-gray-500 text-white p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <h1 className="text-lg font-semibold uppercase">{`api-lab`}</h1>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        {/* Profile */}
        <div className="flex items-center gap-3 bg-[#1e293b] p-3 rounded-lg">
          <img
            src={`https://i.pinimg.com/736x/55/b5/95/55b595a26b32704b1d90b9b697862bcf.jpg`}
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{user?.fullname || "User"}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
