import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../Components/ui/section/LeftSidebar";
import Header from "../Components/ui/section/Header";

const DashboardLayout = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-brand-bg text-brand-text overflow-hidden relative">
      {/* Left Sidebar */}
      <LeftSidebar isOpen={leftSidebarOpen} setIsOpen={setLeftSidebarOpen} />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 
          ${leftSidebarOpen ? "lg:ml-60" : "lg:ml-20"} // shrink / expand effect on desktop
        `}
      >
        {/* Header */}
        <Header onMenuClick={() => setLeftSidebarOpen((prev) => !prev)} />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-6 mt-4">
          <div className="card">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


