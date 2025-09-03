import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineAirplaneTicket,
  MdPeople,
  MdTrendingUp,
  MdPayment,
  MdSettings,
  MdLogout,
  MdPerson,
  MdMessage,
} from "react-icons/md";
import { IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";

const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/" },
  { icon: MdPeople, label: "Users", path: "/users" },
  { icon: MdPayment, label: "Payments", path: "/payments" },
  { icon: MdOutlineAirplaneTicket, label: "Tickets", path: "/tickets" },
  { icon: MdTrendingUp, label: "Trends", path: "/trends" },
  { icon: MdMessage, label: "Messages", path: "/messages/*" },
];

const LeftSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const isMatch = (p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/auth/login");
    }
  };

  return (
    <>
      {/* Mobile Sidebar (overlay style) */}
      {isOpen && (
        <div className="fixed inset-0 z-30 flex lg:hidden">
          <aside className="w-60 bg-black text-white flex flex-col z-40">
            {/* Logo */}
            {/* Logo Section */}
            <div className="flex items-center justify-between px-4 h-16 sm:h-20">
              <img
                src="/assets/Logo.png"
                alt="Logo"
                className="h-6 sm:h-8 md:h-10 w-auto object-contain"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition"
              >
                <IoClose size={20} className="sm:size-22 md:size-24" />
              </button>
            </div>
            <div className="h-px bg-gray-700 mx-4" />

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
              <ul className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                  const active = isMatch(item.path);
                  return (
                    <li key={item.label} className="relative">
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1.5 rounded-full bg-[#D0EA59]" />
                      )}
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                          ${
                            active
                              ? "bg-[#D0EA59] text-black shadow-sm"
                              : "text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white"
                          }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-white"
                              : "text-gray-400 group-hover:text-white"
                          }`}
                        />
                        <span className="text-sm font-medium leading-6">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto px-2 py-4 space-y-2">
              <button
                onClick={() => setSettingsOpen(!settingsOpen)}
                className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium
                  text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MdSettings className="w-5 h-5 text-gray-400" />
                  <span>Settings</span>
                </div>
                {settingsOpen ? (
                  <IoChevronUp className="w-4 h-4" />
                ) : (
                  <IoChevronDown className="w-4 h-4" />
                )}
              </button>

              {settingsOpen && (
                <div className="ml-6 mt-1 space-y-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors"
                  >
                    <MdPerson className="w-5 h-5 text-gray-400" />
                    Profile
                  </Link>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors w-full"
              >
                <MdLogout className="w-5 h-5 text-gray-400" />
                Logout
              </button>
            </div>
          </aside>

          {/* Backdrop */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Desktop Sidebar (collapsible) */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-black text-white z-20 transition-all duration-300 
        ${isOpen ? "lg:w-60" : "lg:w-16"}`}
      >
        {/* Logo */}
        <div className="h-16 px-4 flex items-center">
          <img src="/assets/Logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="h-px bg-gray-700 mx-4" />

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item) => {
              const active = isMatch(item.path);
              return (
                <li key={item.label} className="relative">
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1.5 rounded-full bg-[#D0EA59]" />
                  )}
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                      ${
                        active
                          ? " text-white shadow-sm"
                          : "text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white"
                      }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    />
                    {isOpen && (
                      <span className="text-sm font-medium leading-6">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto px-2 py-4 space-y-2">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="flex w-full items-center justify-between px-3 py-2 rounded-lg text-sm font-medium
              text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <MdSettings className="w-5 h-5 text-gray-400" />
              {isOpen && <span>Settings</span>}
            </div>
            {isOpen &&
              (settingsOpen ? (
                <IoChevronUp className="w-4 h-4" />
              ) : (
                <IoChevronDown className="w-4 h-4" />
              ))}
          </button>

          {isOpen && settingsOpen && (
            <div className="ml-6 mt-1 space-y-1">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors"
              >
                <MdPerson className="w-5 h-5 text-gray-400" />
                Profile
              </Link>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#D0EA59]/20 hover:text-white transition-colors w-full"
          >
            <MdLogout className="w-5 h-5 text-gray-400" />
            {isOpen && "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
