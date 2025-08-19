import {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdSettings,
  MdLogout,
  MdPerson,
  MdInventory2 ,
  MdStore 
} from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import React from "react";

const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/" },
  { icon: MdPeople, label: "Users", path: "/users" },
  { icon: MdStore , label: "store", path: "/store" },
  { icon: MdInventory2 , label: "Shipments", path: "/shipments" },
  { icon: MdPayment, label: "Payments", path: "/payments" },
];

const footerItems = [
  { icon: MdSettings, label: "Settings", path: "/settings" },
  { icon: MdPerson, label: "Profile", path: "/profile" },
  { icon: MdLogout, label: "Logout", path: "/auth/login" },
];

const LeftSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const isMatch = (p) => (p === "/" ? location.pathname === "/" : location.pathname.startsWith(p));

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 w-60 bg-[#f5f5f5] border-r border-gray-200 z-40
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        transition-transform duration-200 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 px-6 flex items-center justify-between">
          <img src="/assets/Logo.png" alt="Logo" className="h-9 w-auto" />
          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <IoClose size={22} />
          </button>
        </div>

        <div className="px-6">
          <div className="h-px bg-gray-200" />
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = isMatch(item.path);
              return (
                <li key={item.label} className="relative pl-2">
                  {/* purple vertical indicator */}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1.5 rounded-full bg-[#856bac]" />
                  )}

                  <Link
                    to={item.path}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-3 px-3 py-2 rounded-xl transition
                      ${active
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        active ? "text-[#856bac]" : "text-{#856bac} group-hover:text-gray-600"
                      }`}
                    />
                    <span className={`text-sm font-medium ${active ? "text-[#856bac]" : ""}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <div className="px-6">
            <div className="h-px bg-gray-200" />
          </div>
          <div className="px-3 py-4 space-y-1">
            {footerItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={item.label === "Logout" ? handleLogout : undefined}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                           text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default LeftSidebar;
