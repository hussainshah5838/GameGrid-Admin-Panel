"use client";

import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";
import { utils, writeFile } from "xlsx";
import { FiDownload, FiRefreshCcw } from "react-icons/fi";

/* ------------------------------ THEME / TOKENS ------------------------------ */
const ACCENT = "#D0EA59"; // your lime
const BG_CARD = "#0C0F14"; // cards
const BG_PANEL = "#0A0D12"; // headers
const GRID = "rgba(255,255,255,0.06)";
const TEXT = "#fff";
const TEXT2 = "#9CA3AF";
const RING = "ring-1 ring-white/10";
const SERIES_COLORS = [ACCENT, "#60A5FA", "#F472B6", "#34D399"]; // lime, blue, pink, green

/* ------------------------------- MOCK SOURCES ------------------------------- */
/** Replace with your API results. Keep keys stable: {date, entity, metric(s)...} */
function makeDateSeq(days) {
  const arr = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}

// seeded sample sets by entity type
const CATALOG = {
  Sport: ["Cricket", "Football", "Basketball", "E-Sports", "Soccer"],
  Team: ["Lahore Qalandars", "Karachi Kings", "PSG", "Real Madrid", "Warriors"],
  Player: ["Babar Azam", "Virat Kohli", "Messi", "Ronaldo", "Stephen Curry"],
  Game: [
    "PSL Matchday",
    "El Clásico",
    "Champions Final",
    "NBA Playoffs",
    "Worlds (LoL)",
  ],
};

function generateMockSeries(entityType, entities, days) {
  const dates = makeDateSeq(days);
  const baseByEntity = Object.fromEntries(
    entities.map((e, i) => [e, 60 + Math.round(Math.random() * 30) + i * 5])
  );
  return dates.flatMap((date, idx) =>
    entities.map((e) => {
      const base = baseByEntity[e];
      // simple wave + randomness
      const popularity = Math.max(
        5,
        Math.round(
          base + 15 * Math.sin((idx / 10) * Math.PI) + (Math.random() * 10 - 5)
        )
      );
      const mentions = Math.max(
        1,
        Math.round(popularity * (20 + Math.random() * 10))
      );
      const engagement = Math.max(
        1,
        Math.round(popularity * (0.7 + Math.random() * 0.5))
      );
      return { date, entity: e, popularity, mentions, engagement };
    })
  );
}

/* ------------------------------ DATA HELPERS ------------------------------ */
function movingAverage(arr, key, windowSize) {
  if (!windowSize) return arr;
  const half = Math.floor(windowSize / 2);
  return arr.map((row, i) => {
    const start = Math.max(0, i - half);
    const end = Math.min(arr.length - 1, i + half);
    let sum = 0,
      count = 0;
    for (let j = start; j <= end; j++) {
      sum += Number(arr[j][key] || 0);
      count++;
    }
    return { ...row, [key]: sum / Math.max(1, count) };
  });
}

function aggregate(data, key, mode) {
  if (mode === "daily") return data;
  const bucketKey = (iso) => {
    const d = new Date(iso + "T00:00:00");
    if (mode === "weekly") {
      // ISO week label: YYYY-Www
      const tmp = new Date(
        Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      );
      const dayNum = (tmp.getUTCDay() + 6) % 7;
      tmp.setUTCDate(tmp.getUTCDate() - dayNum + 3);
      const firstThursday = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 4));
      const week =
        1 +
        Math.round(
          ((tmp - firstThursday) / 86400000 -
            3 +
            ((firstThursday.getUTCDay() + 6) % 7)) /
            7
        );
      return `${tmp.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
    }
    if (mode === "monthly") {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    }
    return iso;
  };
  const byKey = {};
  for (const r of data) {
    const b = bucketKey(r.date);
    const id = b + "::" + r.entity;
    if (!byKey[id]) byKey[id] = { ...r, date: b, _count: 0, [key]: 0 };
    byKey[id][key] += Number(r[key] || 0);
    byKey[id]._count++;
  }
  return Object.values(byKey)
    .map((r) => {
      // average rather than sum for smoother trend; change to sum if needed
      return { ...r, [key]: r[key] / r._count };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

function normalizeShare(rows, key) {
  // Share (%) per timestamp across selected entities
  const byDate = {};
  for (const r of rows) {
    byDate[r.date] ??= { total: 0, rows: [] };
    byDate[r.date].total += Number(r[key] || 0);
    byDate[r.date].rows.push(r);
  }
  const out = [];
  for (const d of Object.values(byDate)) {
    d.rows.forEach((r) => {
      const total = d.total || 1;
      out.push({ ...r, [key]: (Number(r[key]) / total) * 100 });
    });
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

/* ------------------------------- XLSX EXPORT ------------------------------- */
function exportTrendsToXLSX(seriesRows, metric, filename = "trends_export") {
  const byEntity = {};
  for (const r of seriesRows) {
    byEntity[r.entity] ??= {};
    byEntity[r.entity][r.date] = Number(r[metric] || 0);
  }
  const allDates = Array.from(new Set(seriesRows.map((r) => r.date))).sort();
  const sheet = [
    {
      Date: "",
      ...Object.fromEntries(Object.keys(byEntity).map((e) => [e, e])),
    },
  ];
  for (const date of allDates) {
    const row = { Date: date };
    for (const e of Object.keys(byEntity)) row[e] = byEntity[e][date] ?? "";
    sheet.push(row);
  }
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(sheet);
  ws["!cols"] = Object.keys(sheet[0]).map((k) => ({
    wch: Math.max(10, k.length + 2),
  }));
  utils.book_append_sheet(wb, ws, "Trends");
  const stamp = new Date().toISOString().slice(0, 10);
  writeFile(wb, `${filename}_${metric}_${stamp}.xlsx`);
}

/* --------------------------------- UI --------------------------------- */
export default function TrendsExplorer() {
  // Filters
  const [entityType, setEntityType] = useState("Sport"); // Sport | Team | Player | Game
  const [selected, setSelected] = useState(["Cricket", "Football"]); // up to 4
  const [metric, setMetric] = useState("popularity"); // popularity | mentions | engagement
  const [preset, setPreset] = useState("30d"); // 7d | 30d | 90d | 1y
  const [agg, setAgg] = useState("daily"); // daily | weekly | monthly
  const [smooth, setSmooth] = useState(3); // moving average window (odd numbers look nicer)
  const [normalize, setNormalize] = useState(false); // share (%)

  // Data (mock -> swap with API wired by filters)
  const days =
    preset === "7d" ? 7 : preset === "30d" ? 30 : preset === "90d" ? 90 : 365;
  const raw = useMemo(
    () => generateMockSeries(entityType, selected, days),
    [entityType, selected, days]
  );

  // Transform pipeline
  const aggregated = useMemo(
    () => aggregate(raw, metric, agg),
    [raw, metric, agg]
  );
  const maybeNormalized = useMemo(
    () => (normalize ? normalizeShare(aggregated, metric) : aggregated),
    [aggregated, normalize, metric]
  );
  const smoothed = useMemo(
    () => movingAverage(maybeNormalized, metric, smooth || 0),
    [maybeNormalized, metric, smooth]
  );

  // Fold for recharts: one row per date, keys per entity
  const chartRows = useMemo(() => {
    const map = {};
    for (const r of smoothed) {
      map[r.date] ??= { date: r.date };
      map[r.date][r.entity] = Number(r[metric] || 0);
    }
    return Object.values(map).sort((a, b) =>
      String(a.date).localeCompare(String(b.date))
    );
  }, [smoothed, metric]);

  const options = CATALOG[entityType] || [];

  const addEntity = (name) => {
    if (!name) return;
    setSelected((prev) =>
      prev.includes(name) || prev.length >= 4 ? prev : [...prev, name]
    );
  };
  const removeEntity = (name) =>
    setSelected((prev) => prev.filter((x) => x !== name));
  const resetFilters = () => {
    setEntityType("Sport");
    setSelected(["Cricket", "Football"]);
    setMetric("popularity");
    setPreset("30d");
    setAgg("daily");
    setSmooth(3);
    setNormalize(false);
  };

  return (
    <div
      className={`rounded-2xl ${RING} p-4 shadow-md hover:ring-white/15 transition text-white`}
      style={{ backgroundColor: BG_CARD }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">Trend Popularity</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportTrendsToXLSX(smoothed, metric, "trends")}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-black"
            style={{ backgroundColor: ACCENT }}
            title="Export filtered trends (.xlsx)"
          >
            <FiDownload /> Export
          </button>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-white/10 hover:bg-white/15"
            title="Reset filters"
          >
            <FiRefreshCcw /> Reset
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-3">
        {/* Entity type */}
        <div className="lg:col-span-2">
          <label className="block text-xs text-white/70 mb-1">
            Entity Type
          </label>
          <select
            value={entityType}
            onChange={(e) => {
              setEntityType(e.target.value);
              setSelected([]);
            }}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {Object.keys(CATALOG).map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Add entity */}
        <div className="lg:col-span-3">
          <label className="block text-xs text-white/70 mb-1">
            Add {entityType}
          </label>
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                addEntity(e.target.value);
                e.target.value = "";
              }}
              defaultValue=""
              className="flex-1 rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="" disabled>
                Choose…
              </option>
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          {/* Selected chips */}
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.map((s, i) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-2.5 py-1 text-xs"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    background: SERIES_COLORS[i % SERIES_COLORS.length],
                  }}
                />
                {s}
                <button
                  onClick={() => removeEntity(s)}
                  className="text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </span>
            ))}
            {!selected.length && (
              <span className="text-xs text-white/50">
                Select up to 4 to compare
              </span>
            )}
          </div>
        </div>

        {/* Metric */}
        <div className="lg:col-span-2">
          <label className="block text-xs text-white/70 mb-1">Metric</label>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="popularity">Popularity</option>
            <option value="mentions">Mentions</option>
            <option value="engagement">Engagement</option>
          </select>
        </div>

        {/* Date preset */}
        <div className="lg:col-span-2">
          <label className="block text-xs text-white/70 mb-1">Date Range</label>
          <select
            value={preset}
            onChange={(e) => setPreset(e.target.value)}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last 12 months</option>
          </select>
        </div>

        {/* Aggregation */}
        <div className="lg:col-span-1">
          <label className="block text-xs text-white/70 mb-1">Aggregate</label>
          <select
            value={agg}
            onChange={(e) => setAgg(e.target.value)}
            className="w-full rounded-md bg-[#0A0D12] border border-white/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Smoothing */}
        <div className="lg:col-span-1">
          <label className="block text-xs text-white/70 mb-1">Smoothing</label>
          <input
            type="range"
            min={0}
            max={15}
            step={1}
            value={smooth}
            onChange={(e) => setSmooth(Number(e.target.value))}
            className="w-full accent-[#D0EA59]"
          />
          <div className="text-[10px] text-white/60 mt-0.5">
            {smooth ? `${smooth}-point moving avg` : "off"}
          </div>
        </div>

        {/* Normalize */}
        <div className="lg:col-span-1 flex flex-col mt-7">
            <input
              type="checkbox"
              checked={normalize}
              onChange={(e) => setNormalize(e.target.checked)}
              className="h-4 w-4"
              style={{ accentColor: ACCENT }}
            />
          <label className="inline-flex items-center gap-2 text-xs text-white/80">
            Normalize (% share)
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-xl p-3" style={{ backgroundColor: BG_PANEL }}>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart
            data={chartRows}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              {SERIES_COLORS.map((c, i) => (
                <linearGradient
                  key={i}
                  id={`trendGlow_${i}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={c} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={c} stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid stroke={GRID} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: TEXT2, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              tick={{ fill: TEXT2, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={48}
              tickMargin={8}
              domain={normalize ? [0, 100] : ["auto", "auto"]}
              tickFormatter={(v) => (normalize ? `${Math.round(v)}%` : v)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: BG_CARD,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                color: TEXT,
              }}
              labelStyle={{ color: "#CBD5E1" }}
              formatter={(val) =>
                normalize ? `${val.toFixed(1)}%` : Math.round(val)
              }
            />
            <Legend
              wrapperStyle={{ color: TEXT }}
              iconType="circle"
              formatter={(val) => (
                <span style={{ color: "#E5E7EB", fontSize: 12 }}>{val}</span>
              )}
            />

            {/* Render one line (and subtle area glow) per selected entity */}
            {selected.map((name, idx) => (
              <React.Fragment key={name}>
                <Line
                  type="monotone"
                  dataKey={name}
                  stroke={SERIES_COLORS[idx % SERIES_COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 2.5, stroke: BG_PANEL, strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive={false}
                  connectNulls
                />
                <Area
                  type="monotone"
                  dataKey={name}
                  stroke="none"
                  fill={`url(#trendGlow_${idx % SERIES_COLORS.length})`}
                  fillOpacity={1}
                  isAnimationActive={false}
                  connectNulls
                />
              </React.Fragment>
            ))}
          </LineChart>
        </ResponsiveContainer>

        {/* Footnote / context */}
        <div className="mt-2 text-[11px] text-white/50">
          {normalize
            ? "Values show relative share (%) across selected entities per time bucket."
            : "Values show absolute metric levels."}
        </div>
      </div>
    </div>
  );
}
