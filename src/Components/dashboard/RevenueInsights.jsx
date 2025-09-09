"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, Area
} from "recharts";
import { utils, writeFile } from "xlsx";
import { FiDownload, FiRefreshCcw } from "react-icons/fi";

/* ------------------------------ THEME / TOKENS ------------------------------ */
const ACCENT = "#D0EA59";            // lime
const BG_CARD = "#0C0F14";           // card surface
const BG_PANEL = "#0A0D12";          // inner panel
const GRID = "rgba(255,255,255,0.06)";
const TEXT = "#fff";
const TEXT2 = "#9CA3AF";
const RING = "ring-1 ring-white/10";
const SERIES_COLORS = [ACCENT, "#60A5FA", "#F472B6", "#34D399"]; // lime, blue, pink, green

/* -------------------------------- MOCK DATA --------------------------------
   Swap this with your API result. Keep keys: {date: 'YYYY-MM', ...metrics} */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function monthKey(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; }
function makeMonthSeq(n){
  const out = []; const now = new Date();
  for (let i = n-1; i >= 0; i--) out.push(monthKey(new Date(now.getFullYear(), now.getMonth() - i, 1)));
  return out;
}
function seeded(n,min,max,d=0){ const x=Math.sin(n)*10000; const f=x-Math.floor(x); const v=min+f*(max-min); return d?Number(v.toFixed(d)):Math.round(v); }
function generateRevenueSeries(months=12){
  const keys = makeMonthSeq(months);
  return keys.map((k, i) => {
    const mrr          = Math.max(900 + seeded(i+1, -120, 320), 500) * 10;         // $
    const premiumUsers = 2000 + seeded(i+11, -200, 450);                            // #
    const newPremium   = 120  + seeded(i+21, -40, 80);                              // #
    const conversion   = Math.min(18, Math.max(3, 7 + seeded(i+31, -3, 6, 2)));     // %
    const churn        = Math.min(12, Math.max(2, 4 + seeded(i+41, -2.5, 3.5, 2))); // %
    const ltv          = Math.max(50 + seeded(i+51, -10, 35), 30) * 10;             // $
    return { date: k, mrr, premiumUsers, newPremium, conversion, churn, ltv };
  });
}

/* ------------------------------ METRIC GROUPS ------------------------------ */
const METRICS = {
  Revenue: [
    { key: "mrr", label: "MRR", unit: "currency" },
    { key: "ltv", label: "LTV", unit: "currency" },
  ],
  Rates: [
    { key: "conversion", label: "Conversion Rate", unit: "percent" },
    { key: "churn",      label: "Churn Rate",      unit: "percent" },
  ],
};
const GROUPS = Object.keys(METRICS);

/* ------------------------------ DATA HELPERS ------------------------------ */
function movingAverageMulti(rows, keys, windowSize){
  if (!windowSize || windowSize <= 1) return rows;
  const half = Math.floor(windowSize / 2);
  return rows.map((row, i) => {
    const start = Math.max(0, i - half);
    const end   = Math.min(rows.length - 1, i + half);
    const out = { ...row };
    for (const key of keys) {
      let sum = 0, count = 0;
      for (let j = start; j <= end; j++) { sum += Number(rows[j][key] || 0); count++; }
      out[key] = sum / Math.max(1, count);
    }
    return out;
  });
}

/* ----- number formatting that avoids $0k and shows k/M nicely ----- */
const trim0 = (x) => String(x).replace(/\.0$/, "");
function fmtCurrencyCompact(v){
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `$${trim0((v/1_000_000).toFixed(1))}M`;
  if (abs >= 10_000)    return `$${trim0((v/1_000).toFixed(0))}k`;
  if (abs >= 1_000)     return `$${trim0((v/1_000).toFixed(1))}k`;
  return `$${Math.round(v).toLocaleString()}`;
}
function fmtCountCompact(v){
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return `${trim0((v/1_000_000).toFixed(1))}M`;
  if (abs >= 10_000)    return `${trim0((v/1_000).toFixed(0))}k`;
  if (abs >= 1_000)     return `${trim0((v/1_000).toFixed(1))}k`;
  return Math.round(v).toLocaleString();
}
const fmtPercentAxis = (v) => `${Math.round(v)}%`;
const fmtPercentTip  = (v) => `${Number(v).toFixed(1)}%`;

/* ------------------------------- XLSX EXPORT ------------------------------- */
function exportRevenueToXLSX(rows, selectedKeys, filename="revenue_export"){
  // rows: [{ date, <metricKey1>, <metricKey2>, ... }]
  const sheet = rows.map(r => {
    const row = { Month: r.date };
    for (const k of selectedKeys) row[k.toUpperCase()] = r[k];
    return row;
  });
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(sheet);
  ws["!cols"] = Object.keys(sheet[0]||{}).map(k => ({ wch: Math.max(10, k.length+2) }));
  utils.book_append_sheet(wb, ws, "Revenue");
  const stamp = new Date().toISOString().slice(0,10);
  writeFile(wb, `${filename}_${stamp}.xlsx`);
}

/* ------------------------------- COMPONENT -------------------------------- */
export default function RevenueExplorer({
  initialGroup = "Revenue",     // "Revenue" | "Users" | "Rates"
  initialSelected,              // e.g. ["mrr", "ltv"]; defaults derived from group
  initialMonths = 12,           // 6 | 12 | 24
  data,                         // optional: [{date:'YYYY-MM', mrr, premiumUsers, ...}]
}){
  const [group, setGroup] = useState(GROUPS.includes(initialGroup) ? initialGroup : "Revenue");
  const defaultSelected = (initialSelected && initialSelected.length)
    ? initialSelected
    : METRICS[group].slice(0, 2).map(m => m.key); // up to 2 by default
  const [selected, setSelected] = useState(defaultSelected);   // ⬅️ multiple lines
  const [preset, setPreset] = useState(initialMonths === 6 ? "6m" : initialMonths === 24 ? "24m" : "12m");
  const [smooth, setSmooth] = useState(2); // looks nice with monthly data
  const months = preset === "6m" ? 6 : preset === "24m" ? 24 : 12;

  const allowedKeys = METRICS[group].map(m => m.key);
  const unit = METRICS[group][0].unit; // all metrics in a group share same unit

  // Base data
  const base = useMemo(() => (data && data.length ? data : generateRevenueSeries(Math.max(months, 24))), [data, months]);
  const trimmed = useMemo(() => base.slice(-months), [base, months]);

  // Smoothing across all selected keys
  const smoothed = useMemo(() => movingAverageMulti(trimmed, allowedKeys, smooth || 0), [trimmed, allowedKeys, smooth]);

  // Chart rows: keep original keys; Recharts will map each selected key to a line
  const chartRows = smoothed;

  // Axis domain (shared for the group's unit)
  const yDomain = useMemo(() => {
    const vals = chartRows.flatMap(r => selected.map(k => Number(r[k] || 0)));
    if (!vals.length) return [0, 1];
    const max = Math.max(...vals);
    const pad = unit === "percent" ? 5 : max * 0.1;
    return [0, Math.ceil(max + pad)];
  }, [chartRows, selected, unit]);

  // Formatters based on unit
  const axisFmt = (v) => {
    if (unit === "percent") return fmtPercentAxis(v);
    if (unit === "currency") return fmtCurrencyCompact(v);
    return fmtCountCompact(v);
  };
  const tipFmt = (v) => {
    if (unit === "percent") return fmtPercentTip(v);
    if (unit === "currency") return `$${Number(v).toLocaleString()}`;
    return Number(v).toLocaleString();
  };

  // Handlers
  const onChangeGroup = (g) => {
    setGroup(g);
    const next = METRICS[g].slice(0, 2).map(m => m.key);
    setSelected(next);
  };
  const onAddMetric = (key) => {
    if (!key) return;
    setSelected((prev) => (prev.includes(key) || prev.length >= 4) ? prev : [...prev, key]);
  };
  const onRemoveMetric = (key) => setSelected((prev) => prev.filter(k => k !== key));
  const reset = () => {
    onChangeGroup("Revenue");
    setPreset("12m");
    setSmooth(5);
  };

  return (
    <div className={`rounded-2xl ${RING} p-4 shadow-md hover:ring-white/15 transition text-white`} style={{ backgroundColor: BG_CARD }}>
      {/* Header actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">Revenue Insights</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportRevenueToXLSX(chartRows.map(r => ({ date: r.date, ...r })), selected)}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-black"
            style={{ backgroundColor: ACCENT }}
            title="Export visible series (.xlsx)"
          >
            <FiDownload /> Export
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-white/10 hover:bg-white/15"
            title="Reset"
          >
            <FiRefreshCcw /> Reset
          </button>
        </div>
      </div>

      {/* Filters (mirrors your TrendsExplorer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
        {/* Group */}
        <div className="lg:col-span-3">
          <label className="block text-xs text-white/70 mb-1">Group</label>
          <select
            value={group}
            onChange={(e)=>onChangeGroup(e.target.value)}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {GROUPS.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        {/* Add metric */}
        <div className="lg:col-span-4">
          <label className="block text-xs text-white/70 mb-1">Add Metric</label>
          <div className="flex items-center gap-2">
            <select
              defaultValue=""
              onChange={(e)=>{ onAddMetric(e.target.value); e.target.value = ""; }}
              className="flex-1 rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="" disabled>Choose…</option>
              {METRICS[group].map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
            </select>
          </div>
          {/* Chips for selected */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.map((k, i) => {
              const meta = METRICS[group].find(m => m.key === k);
              return (
                <span key={k} className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-2.5 py-1 text-xs">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }} />
                  {meta?.label || k}
                  <button onClick={()=>onRemoveMetric(k)} className="text-white/60 hover:text-white">✕</button>
                </span>
              );
            })}
            {!selected.length && <span className="text-xs text-white/50">Select up to 4 metrics</span>}
          </div>
        </div>

        {/* Date range */}
        <div className="lg:col-span-3">
          <label className="block text-xs text-white/70 mb-1">Date Range</label>
          <select
            value={preset}
            onChange={(e)=>setPreset(e.target.value)}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
            <option value="24m">Last 24 months</option>
          </select>
        </div>

        {/* Smoothing */}
        <div className="lg:col-span-2">
          <label className="block text-xs text-white/70 mb-1">Smoothing</label>
          <input
            type="range" min={0} max={9} step={1} value={smooth}
            onChange={(e)=>setSmooth(Number(e.target.value))}
            className="w-full accent-[#D0EA59]"
          />
          <div className="text-[10px] text-white/60 mt-0.5">{smooth ? `${smooth}-point moving avg` : "off"}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl p-3" style={{ backgroundColor: BG_PANEL }}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={chartRows} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              {SERIES_COLORS.map((c, i) => (
                <linearGradient key={i} id={`revGlow_${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={c} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={c} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: TEXT2, fontSize: 12 }} axisLine={false} tickLine={false} tickMargin={8} />
            <YAxis
              tick={{ fill: TEXT2, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={56}
              tickMargin={8}
              domain={yDomain}
              tickFormatter={axisFmt}
            />
            <Tooltip
              contentStyle={{ backgroundColor: BG_CARD, border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, color: TEXT }}
              labelStyle={{ color: "#CBD5E1" }}
              formatter={(val)=>tipFmt(val)}
            />
            <Legend
              wrapperStyle={{ color: TEXT }}
              iconType="circle"
              formatter={(val)=> <span style={{ color:"#E5E7EB", fontSize:12 }}>{(METRICS[group].find(m => m.key === val)?.label) || val}</span>}
            />

            {/* Multiple lines + glow areas */}
            {selected.map((key, idx) => (
              <React.Fragment key={key}>
                <Line
                  name={key}
                  type="monotone"
                  dataKey={key}
                  stroke={SERIES_COLORS[idx % SERIES_COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 2.5, stroke: BG_PANEL, strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                  connectNulls
                />
                <Area
                  type="monotone"
                  dataKey={key}
                  stroke="none"
                  fill={`url(#revGlow_${idx % SERIES_COLORS.length})`}
                  fillOpacity={1}
                  isAnimationActive={false}
                  connectNulls
                />
              </React.Fragment>
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Helper text */}
        <div className="mt-2 text-[11px] text-white/50">
          {unit === "currency" && "Showing currency metrics (e.g., MRR, LTV)."}
          {unit === "count"    && "Showing user counts (Premium Users, New Premium)."}
          {unit === "percent"  && "Showing percentage rates (Conversion, Churn)."}
        </div>
      </div>
    </div>
  );
}
