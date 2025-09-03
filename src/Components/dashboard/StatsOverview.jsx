import React, { useState, useRef, useEffect } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

/* Default Data */
const defaultStats = [
  { title: "Views",        value: "721K",  change: 11.01,  color: "yellow" },
  { title: "Visits",       value: "367K",  change: -0.03,  color: "green"   },
  { title: "New Users",    value: "1,156", change: 15.03,  color: "purple" },
  { title: "Active Users", value: "239K",  change: 6.08,   color: "blue"   },
];

/* Updated Solid Color Styles (same as Subscription Overview) */
const colorStyles = {
  yellow: "bg-[#D0EA59] text-black",     // Total Subscriptions (lime)
  green:  "bg-green-500 text-white",
  blue:   "bg-blue-500 text-white",     // Active
  purple: "bg-yellow-500 text-white",    // Trial
        // Expired/Cancelled
};

const StatCard = ({ title, value, change, color = "yellow" }) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? FiArrowUpRight : FiArrowDownRight;
  const formatted = `${isPositive ? "+" : ""}${Math.abs(change).toFixed(2)}%`;
  const bgClass = colorStyles[color] || colorStyles.yellow;

  return (
    <div
      className={`rounded-2xl ${bgClass} ring-1 ring-black/10
                  shadow-lg p-4 sm:p-5 min-w-[200px]`}
    >
      {/* Top row: title + change */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] sm:text-[13px] font-medium">{title}</p>
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium">
          {formatted}
          <Arrow size={14} />
        </span>
      </div>

      {/* Value */}
      <div className="mt-2 sm:mt-2.5">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  );
};

const StatsOverview = ({ statsData = defaultStats }) => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filters = ["Today", "This Week", "This Month", "This Year"];

  /* Close dropdown when clicking outside */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Filter dropdown */}
      <div className="relative inline-block mb-3" ref={dropdownRef}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex items-center gap-1 text-sm text-white/90 font-medium focus:outline-none"
        >
          {selectedFilter}
          <IoChevronDown size={16} />
        </button>
        {open && (
          <ul
            className="absolute mt-2 w-36 bg-[#1E1E1E] shadow-lg rounded-md text-sm text-white z-10"
            role="menu"
          >
            {filters.map((f) => (
              <li
                key={f}
                role="menuitem"
                onClick={() => { setSelectedFilter(f); setOpen(false); }}
                className={`px-4 py-2 hover:bg-gray-800 cursor-pointer ${
                  f === selectedFilter ? "font-semibold text-[#D0EA59]" : ""
                }`}
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;



