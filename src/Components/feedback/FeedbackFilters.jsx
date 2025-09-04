import React from "react";
import { FiSearch } from "react-icons/fi";

const Chip = ({ active, children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 h-8 rounded-full text-sm ring-1 transition
      ${active ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-[#D0EA59]/40"
               : "text-white/80 ring-white/10 hover:bg-white/5"}`}
  >
    {children}
  </button>
);

export default function FeedbackFilters({
  search, setSearch,
  type, setType,
  status, setStatus,
}) {
  const types = ["all", "Bug", "Feature", "Praise"];
  const statuses = ["all", "Open", "In Review", "Resolved"];

  return (
    <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-3 shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* search */}
        <div className="flex-1">
          <div className="flex items-center h-10 rounded-lg bg-[#0A0D12] ring-1 ring-white/10 px-2
                          transition focus-within:ring-2 focus-within:ring-[#D0EA59] hover:ring-white/20">
            <FiSearch size={16} className="mr-2 text-white/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by user, email, subject, or ID…"
              className="flex-1 h-full bg-transparent text-white placeholder:text-white/40 text-sm outline-none caret-[#D0EA59]"
            />
            {!!search && (
              <button onClick={() => setSearch("")} className="ml-1 px-1.5 py-0.5 rounded-md text-white/60 hover:text-white hover:bg-white/5">
                ✕
              </button>
            )}
          </div>
        </div>

        {/* type + status chips */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Type:</span>
            {types.map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/60">Status:</span>
            {statuses.map((s) => (
              <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{s}</Chip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
