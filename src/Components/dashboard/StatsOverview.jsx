import React, { useState } from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

/* Data */
const stats = [
  { title: "Views",        value: "721K", change: 11.01, color: "purple" },
  { title: "Visits",       value: "367K", change: -0.03, color: "teal"   },
  { title: "New Users",    value: "1,156", change: 15.03, color: "amber" },
  { title: "Active Users", value: "239K", change: 6.08,  color: "pink"   },
];

/* Color → gradient/background styles */
const colorStyles = {
  purple: "bg-gradient-to-br from-[#856bac] to-[#856bac]",     // violet
  teal:   "bg-gradient-to-br from-[#34D399] to-[#10B981]",     // green/teal
  amber:  "bg-gradient-to-br from-[#F59E0B] to-[#D97706]",     // amber
  pink:   "bg-gradient-to-br from-[#EC4899] to-[#DB2777]",     // pink
};

const StatCard = ({ title, value, change, color = "purple" }) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? FiArrowUpRight : FiArrowDownRight;
  const formatted = `${isPositive ? "+" : ""}${Math.abs(change).toFixed(2)}%`;

  return (
    <div
      className={`rounded-xl text-white ${colorStyles[color]} ring-1 ring-black/5
                  shadow-[0_8px_20px_rgba(0,0,0,0.12)] p-4 sm:p-5 min-w-[200px]`}
    >
      {/* top row: title + change */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] sm:text-[13px] font-medium text-white/90">{title}</p>
        <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium text-white/95">
          {formatted}
          <Arrow size={14} />
        </span>
      </div>

      {/* value */}
      <div className="mt-2 sm:mt-2.5">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  );
};

const StatsOverview = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [open, setOpen] = useState(false);
  const filters = ["Today", "This Week", "This Month", "This Year"];

  return (
    <div>
      {/* small filter dropdown (optional) */}
      <div className="relative inline-block mb-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 text-sm text-gray-600 font-medium"
        >
          {selectedFilter}
          <IoChevronDown size={16} />
        </button>
        {open && (
          <ul className="absolute mt-2 w-36 bg-white shadow-lg rounded-md text-sm text-gray-700 z-10">
            {filters.map((f) => (
              <li
                key={f}
                onClick={() => { setSelectedFilter(f); setOpen(false); }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  f === selectedFilter ? "font-semibold text-gray-900" : ""
                }`}
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
};

export default StatsOverview;
