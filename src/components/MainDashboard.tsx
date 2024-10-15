import React from "react";

function MainDashboard({ children }: { children: React.ReactNode }) {
  return <div className="w-full bg-blue-50 bg-opacity-30 px-40 py-8">{children}</div>;
}

export default MainDashboard;
