import React from "react";
import Sidebar from "./Sidebar";
import MainDashboard from "./MainDashboard";
import Navbar from "./Navbar";

function DashboardLayout({ children }: { children: null | React.ReactNode }) {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Navbar />
      <div className="w-full flex items-start justify-start">
        <Sidebar />
        <MainDashboard>{children}</MainDashboard>
      </div>
    </div>
  );
}

export default DashboardLayout;
