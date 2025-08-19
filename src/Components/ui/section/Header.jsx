import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

const Header = ({ onMenuClick, onNotificationClick }) => {
  const { pathname } = useLocation();
  const pageName =
    pathname === "/"
      ? "Default"
      : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
        "Default";

  return (
    <div className="px-3 md:px-4 pt-3">
      <header className="h-14 w-full bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 px-3 md:px-4">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <MdMenu size={18} />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Toggle left sidebar"
            title="Toggle left sidebar"
          >
            {/* If filename has spaces, encode them or rename the file */}
            <img
              src="/assets/Sidebar%20Left.png"
              alt="Left sidebar"
              className="h-6 w-6"
            />
          </button>
          <Link to="/" className="text-[#856bac] font-medium hover:underline">
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400 capitalize">{pageName}</span>
        </div>

        <div className="flex-1" />

        {/* Search + actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="relative">
            <MdSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-60 xl:w-80 rounded-full bg-gray-100 border border-gray-200 pl-9 pr-12 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
              ⌘K
            </kbd>
          </div>

          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={onNotificationClick}
            aria-label="Notifications"
          >
            <MdNotificationsNone size={18} />
          </button>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle right sidebar"
            title="Toggle right sidebar"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg">
              <img
                src="/assets/Sidebar%20Right.png"
                alt="Right sidebar"
                className="h-6 w-6"
              />
            </span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
