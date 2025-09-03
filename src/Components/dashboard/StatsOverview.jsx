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

/* Subtle accent styles (no full-color card backgrounds) */
const accents = {
  yellow: { dot: "bg-[#D0EA59]",  badgeBg: "bg-[#D0EA59]/10",  badgeText: "text-[#D0EA59]" },
  green:  { dot: "bg-emerald-400",badgeBg: "bg-emerald-400/10",badgeText: "text-emerald-400" },
  blue:   { dot: "bg-blue-400",   badgeBg: "bg-blue-400/10",   badgeText: "text-blue-400" },
  purple: { dot: "bg-violet-400", badgeBg: "bg-violet-400/10", badgeText: "text-violet-400" },
};

const StatCard = ({ title, value, change, color = "yellow" }) => {
  const isPositive = change >= 0;
  const Arrow = isPositive ? FiArrowUpRight : FiArrowDownRight;
  const formatted = `${isPositive ? "+" : ""}${Math.abs(change).toFixed(2)}%`;
  const a = accents[color] || accents.yellow;

  return (
    <div
      className="
        rounded-2xl bg-[#0C0F14] ring-1 ring-white/10
        shadow-md p-4 sm:p-5 min-w-[200px]
        hover:shadow-lg hover:ring-white/15 transition
      "
    >
      {/* Top row: title + change */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
          <p className="text-[12px] sm:text-[13px] font-medium text-white/80">{title}</p>
        </div>

        <span
          className={`
            inline-flex items-center gap-1 text-[11px] sm:text-[12px]
            font-medium px-2 py-1 rounded-full
            ${a.badgeBg}
            ${isPositive ? "text-emerald-400" : "text-rose-400"}
          `}
        >
          {formatted}
          <Arrow size={14} />
        </span>
      </div>

      {/* Value */}
      <div className="mt-2 sm:mt-2.5">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>
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
          className="flex items-center gap-1 text-sm text-white/80 font-medium focus:outline-none"
        >
          {selectedFilter}
          <IoChevronDown size={16} />
        </button>
        {open && (
          <ul
            className="absolute mt-2 w-36 bg-[#1E1E1E] shadow-lg rounded-md text-sm text-white z-10 ring-1 ring-white/10"
            role="menu"
          >
            {filters.map((f) => (
              <li
                key={f}
                role="menuitem"
                onClick={() => { setSelectedFilter(f); setOpen(false); }}
                className={`px-4 py-2 hover:bg-white/5 cursor-pointer ${
                  f === selectedFilter ? "font-semibold text-white" : "text-white/80"
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
