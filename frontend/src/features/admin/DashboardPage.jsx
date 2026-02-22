import { MoreVertical, Pencil, Trash2, Ban } from "lucide-react";
import { useState } from "react";

const usersData = [
  {
    id: 1,
    name: "Prince",
    email: "prince@email.com",
    status: "active",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@email.com",
    status: "blocked",
  },
  {
    id: 3,
    name: "Amit",
    email: "amit@email.com",
    status: "pending",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-400";
    case "blocked":
      return "bg-red-500/10 text-red-400";
    case "pending":
      return "bg-yellow-500/10 text-yellow-400";
    default:
      return "";
  }
};

const UsersTable = () => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="bg-[#0b1220] p-6 rounded-xl border border-white/5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Users</h2>
        <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm hover:bg-blue-700">
          + Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-white/5">
            <tr>
              <th className="text-left py-3">User</th>
              <th className="text-left py-3">Status</th>
              <th className="text-right py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {usersData.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                {/* User Info */}
                <td className="py-4 flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40"
                    className="w-9 h-9 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${getStatusStyle(
                      user.status,
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === user.id ? null : user.id)
                    }
                    className="p-2 hover:bg-white/5 rounded-lg"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {/* Dropdown */}
                  {openMenu === user.id && (
                    <div className="absolute right-0 mt-2 w-36 bg-[#0b1220] border border-white/5 rounded-lg shadow-lg z-10">
                      <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 text-sm">
                        <Pencil size={14} /> Edit
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-white/5 text-sm">
                        <Ban size={14} /> Block
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 text-red-400 hover:bg-red-500/10 text-sm">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
