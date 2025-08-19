import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "../Components/ui/section/LeftSidebar";
import Header from "../Components/ui/section/Header";
import RightSidebar from "../Components/ui/section/RightSidebar";

const DashboardLayout = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      {/* Left Sidebar */}
      <LeftSidebar isOpen={leftSidebarOpen} setIsOpen={setLeftSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          onMenuClick={() => setLeftSidebarOpen(true)}
          onNotificationClick={() => setRightSidebarOpen(true)}
        />
        {/* Main Page Scrollable Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>

      {/* Right Sidebar (moved outside main content area) */}
      <RightSidebar
        isOpen={rightSidebarOpen}
        setIsOpen={setRightSidebarOpen}
      />
    </div>
  );
};

export default DashboardLayout;