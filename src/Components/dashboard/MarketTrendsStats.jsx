"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

/* ------------------------- Shared look with your cards ------------------------- */
const accents = {
  yellow: { dot: "bg-[#D0EA59]",  badgeBg: "bg-[#D0EA59]/10" },
  green:  { dot: "bg-emerald-400",badgeBg: "bg-emerald-400/10" },
  blue:   { dot: "bg-blue-400",   badgeBg: "bg-blue-400/10" },
  purple: { dot: "bg-violet-400", badgeBg: "bg-violet-400/10" },
};

const StatCard = ({ title, value, change, color = "yellow", hint }) => {
  const isPositive = Number(change) >= 0;
  const Arrow = isPositive ? FiArrowUpRight : FiArrowDownRight;
  const formatted = `${isPositive ? "+" : ""}${Math.abs(Number(change)).toFixed(2)}%`;
  const a = accents[color] || accents.yellow;

  return (
    <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 shadow-md p-4 sm:p-5 min-w-[220px] hover:shadow-lg hover:ring-white/15 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
          <div className="flex flex-col">
            <p className="text-[12px] sm:text-[13px] font-medium text-white/80">{title}</p>
            {hint ? <span className="text-[11px] text-white/50">{hint}</span> : null}
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 text-[11px] sm:text-[12px] font-medium px-2 py-1 rounded-full ${a.badgeBg} ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
          {formatted}
          <Arrow size={14} />
        </span>
      </div>
      <div className="mt-2">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
};

/* ----------------------------- Helpers & seeds ----------------------------- */
const SPORTS = ["All Sports", "Cricket", "Football", "Basketball", "E-Sports", "Soccer"];
const FILTERS = ["Today", "This Week", "This Month", "This Year"];

/** Quick seeded number helper for nice-looking, stable mock values per sport/timeframe */
function seededNum(seed, min, max, decimals = 0) {
  let x = Math.sin(seed) * 10000;
  x = x - Math.floor(x);
  const v = min + x * (max - min);
  return decimals ? Number(v.toFixed(decimals)) : Math.round(v);
}

/** Build four market KPIs that align with your GameGrid doc */
function getMarketKPIs(sport, timeframe) {
  // map timeframe → scale (affects totals like games, bot queries)
  const scale = { Today: 1, "This Week": 4.5, "This Month": 18, "This Year": 210 }[timeframe] || 1;
  const sportSeed = SPORTS.indexOf(sport) + 1;
  const tSeed = FILTERS.indexOf(timeframe) + 1;
  const seedBase = sportSeed * 17 + tSeed * 29;

  // Active Games (total count)
  const games = seededNum(seedBase + 1, 20 * scale, 60 * scale);
  const gamesChange = seededNum(seedBase + 2, -4, 12, 2);

  // Odds Volatility (avg absolute line movement % over window)
  const vol = seededNum(seedBase + 3, 0.6, 3.2, 2);
  const volChange = seededNum(seedBase + 4, -1.2, 1.8, 2);

  // Over Hit Rate (% of games hitting Over)
  const over = seededNum(seedBase + 5, 45, 62, 1);
  const overChange = seededNum(seedBase + 6, -3.5, 4.5, 2);

  // Upset Rate (% underdog wins)
  const upset = seededNum(seedBase + 7, 10, 22, 1);
  const upsetChange = seededNum(seedBase + 8, -2.8, 3.2, 2);

  // Format values nicely
  const fmtGames = games >= 1000 ? `${(games / 1000).toFixed(1)}K` : String(games);

  return [
    { title: "Active Games", value: fmtGames, change: gamesChange, color: "yellow", hint: sport === "All Sports" ? "across tracked leagues" : sport },
    { title: "Odds Volatility", value: `${vol}%`, change: volChange, color: "green", hint: "avg absolute move" },
    { title: "Over Hit Rate", value: `${over}%`, change: overChange, color: "purple", hint: "last period vs current" },
    { title: "Upset Rate", value: `${upset}%`, change: upsetChange, color: "blue", hint: "underdog wins" },
  ];
}

/* -------------------------------- Component ------------------------------- */
export default function MarketTrendsStats() {
  const [selectedFilter, setSelectedFilter] = useState("This Month");
  const [sport, setSport] = useState("All Sports");
  const [openFilter, setOpenFilter] = useState(false);
  const [openSport, setOpenSport] = useState(false);
  const filterRef = useRef(null);
  const sportRef = useRef(null);

  // close popovers on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setOpenFilter(false);
      if (sportRef.current && !sportRef.current.contains(e.target)) setOpenSport(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const data = useMemo(() => getMarketKPIs(sport, selectedFilter), [sport, selectedFilter]);

  return (
    <div>
      {/* Controls row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        {/* Sport dropdown */}
        <div className="relative" ref={sportRef}>
          <button
            onClick={() => setOpenSport((v) => !v)}
            className="flex items-center gap-2 text-sm text-white/80 font-medium bg-[#0C0F14] ring-1 ring-white/10 rounded-lg px-3 py-2 hover:ring-white/20"
          >
            {sport}
            <IoChevronDown size={16} />
          </button>
          {openSport && (
            <ul className="absolute mt-2 w-44 bg-[#0A0D12] shadow-lg rounded-md text-sm text-white z-10 ring-1 ring-white/10">
              {SPORTS.map((s) => (
                <li
                  key={s}
                  onClick={() => { setSport(s); setOpenSport(false); }}
                  className={`px-4 py-2 hover:bg-white/5 cursor-pointer ${s === sport ? "font-semibold text-white" : "text-white/80"}`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Time filter dropdown (same feel as your StatsOverview) */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setOpenFilter((v) => !v)}
            className="flex items-center gap-1 text-sm text-white/80 font-medium"
          >
            {selectedFilter}
            <IoChevronDown size={16} />
          </button>
          {openFilter && (
            <ul className="absolute mt-2 w-40 bg-[#1E1E1E] shadow-lg rounded-md text-sm text-white z-10 ring-1 ring-white/10">
              {FILTERS.map((f) => (
                <li
                  key={f}
                  onClick={() => { setSelectedFilter(f); setOpenFilter(false); }}
                  className={`px-4 py-2 hover:bg-white/5 cursor-pointer ${f === selectedFilter ? "font-semibold text-white" : "text-white/80"}`}
                >
                  {f}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
    </div>
  );
}
