import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Menubar";
import { Menu } from "lucide-react";

const AppLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#030712] text-white">
      {/* Mobile Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#030712] z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-[#030712]/80 backdrop-blur-md border-b border-white/5">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5"
          >
            <Menu size={20} />
          </button>

          {/* Your Navbar */}
          <div className="flex-1">
            <Navbar />
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
