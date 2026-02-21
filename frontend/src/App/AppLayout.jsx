import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";


const AppLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
