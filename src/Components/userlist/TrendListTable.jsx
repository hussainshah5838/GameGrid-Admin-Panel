import React, { useMemo, useState } from "react";
import { FiPlus, FiFilter, FiSliders, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Checkbox, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

const trends = [
  { id: "TR1001", category: "Cricket",   name: "World Cup 2023",    popularity: "95%", status: "Rising",    updated: "2023-11-12" },
  { id: "TR1002", category: "Football",  name: "Champions League",   popularity: "88%", status: "Stable",    updated: "2023-10-20" },
  { id: "TR1003", category: "Basketball",name: "NBA Finals",         popularity: "92%", status: "Rising",    updated: "2023-11-05" },
  { id: "TR1004", category: "E-Sports",  name: "Valorant Masters",   popularity: "75%", status: "Stable",    updated: "2023-09-29" },
  { id: "TR1005", category: "Soccer",    name: "La Liga",            popularity: "64%", status: "Declining", updated: "2023-08-14" },
];

// Trend stats
const totalTrends   = trends.length;
const risingTrends  = trends.filter(t => t.status === "Rising").length;
const stableTrends  = trends.filter(t => t.status === "Stable").length;
const decliningTrends = trends.filter(t => t.status === "Declining").length;

// subtle accent tokens
const accent = {
  lime:   { dot: "bg-[#D0EA59]",   text: "text-[#D0EA59]",   bg: "bg-[#D0EA59]/10" },
  green:  { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10" },
  blue:   { dot: "bg-sky-400",     text: "text-sky-400",     bg: "bg-sky-400/10" },
  amber:  { dot: "bg-amber-400",   text: "text-amber-400",   bg: "bg-amber-400/10" },
  rose:   { dot: "bg-rose-400",    text: "text-rose-400",    bg: "bg-rose-400/10" },
};

const StatCard = ({ label, value, tone = "lime" }) => {
  const a = accent[tone] || accent.lime;
  return (
    <div className="rounded-2xl p-4 flex flex-col bg-[#0C0F14] ring-1 ring-white/10 shadow-md hover:ring-white/15 hover:shadow-lg transition">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <span className="text-sm font-medium text-white/80">{label}</span>
      </div>
      <span className="mt-2 text-2xl font-semibold text-white">{value}</span>
    </div>
  );
};

const TrendListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      trends.filter(
        t =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      {/* Trend Stats Cards */}
      <h2 className="text-lg font-semibold text-white">Trend Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Trends" value={totalTrends} tone="lime" />
        <StatCard label="Rising"       value={risingTrends} tone="green" />
        <StatCard label="Stable"       value={stableTrends} tone="blue" />
        <StatCard label="Declining"    value={decliningTrends} tone="rose" />
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-2.5 flex items-center shadow-md">
        <div className="flex items-center gap-1.5 text-white/80">
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiPlus size={18} /></button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiFilter size={18} /></button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiSliders size={18} /></button>
        </div>
        <div className="ml-auto w-52 sm:w-64">
          <div className="relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search trends"
              className="h-9 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 pl-9 pr-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0C0F14] shadow-md ring-1 ring-white/10 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full text-sm">
            <thead>
              <tr className="text-white/70 border-b border-white/10 bg-[#0A0D12]">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onChange={() =>
                      setChecked(allSelected ? new Set() : new Set(filtered.map(t => t.id)))
                    }
                  />
                </th>
                <th className="py-3 text-left">Trend ID</th>
                <th className="py-3 text-left">Category</th>
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Popularity</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, idx) => {
                const active = checked.has(t.id);
                return (
                  <tr
                    key={t.id}
                    className={`
                      ${active ? "bg-white/[0.06]" : "odd:bg-white/[0.02] even:bg-transparent"}
                      hover:bg-white/[0.04] border-b border-white/5 transition
                    `}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={active}
                        onChange={v => {
                          const next = new Set(checked);
                          v ? next.add(t.id) : next.delete(t.id);
                          setChecked(next);
                        }}
                      />
                    </td>
                    <td className="py-3 text-white">{t.id}</td>
                    <td className="py-3 text-white/80">{t.category}</td>
                    <td className="py-3 text-white/80">{t.name}</td>
                    <td className="py-3 text-white/80">{t.popularity}</td>
                    <td className="py-3"><StatusPill status={t.status} /></td>
                    <td className="py-3"><DateCell text={t.updated} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 p-3 border-t border-white/10">
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-white/80">
            <FiChevronLeft />
          </button>
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              className={`h-8 w-8 rounded-md text-sm transition
                ${n === 1
                  ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-1 ring-[#D0EA59]/30"
                  : "text-white/80 hover:bg-white/5 ring-1 ring-white/10"
                }`}
            >
              {n}
            </button>
          ))}
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-white/80">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendListTable;
