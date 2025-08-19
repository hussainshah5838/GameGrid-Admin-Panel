import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IoChevronDown } from "react-icons/io5";

/* --- sample data (millions) --- */
const dataDomestic = [
  { month: "Jan", current: 6,  previous: 12 },
  { month: "Feb", current: 14, previous: 10 },
  { month: "Mar", current: 12, previous: 9  },
  { month: "Apr", current: 10, previous: 11 },
  { month: "May", current: 11, previous: 14 },
  { month: "Jun", current: 16, previous: 19 },
  { month: "Jul", current: 22, previous: 18 },
];

const dataInternational = [
  { month: "Jan", current: 8,  previous: 11 },
  { month: "Feb", current: 11, previous: 9  },
  { month: "Mar", current: 9,  previous: 10 },
  { month: "Apr", current: 13, previous: 12 },
  { month: "May", current: 15, previous: 15 },
  { month: "Jun", current: 19, previous: 20 },
  { month: "Jul", current: 21, previous: 19.5 },
];

const locations = [
  { city: "New York",      value: "72K" },
  { city: "San Fransisco", value: "39K" },
  { city: "Sydney",        value: "25K" },
  { city: "Singapore",     value: "61K" },
];

/* --- tooltip pill --- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const v = payload[0].value;
    return (
      <div className="px-2.5 py-1 rounded-md bg-purple-600 text-white text-[12px] font-semibold shadow">
        {v.toLocaleString()}M
      </div>
    );
  }
  return null;
};

const UserTrafficChart = () => {
  const [segment, setSegment] = useState("Domestic");
  const [periodOpen, setPeriodOpen] = useState(false);
  const [period, setPeriod] = useState("Current Week");

  const data = segment === "Domestic" ? dataDomestic : dataInternational;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px] mt-5">
      {/* ===== Left: Chart Card ===== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-semibold text-gray-800">Total Users</h3>
            <div className="flex items-center gap-3 text-sm">
              {["Domestic", "International"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSegment(t)}
                  className={`px-2 py-1 rounded-md ${
                    segment === t ? "text-gray-900 font-semibold" : "text-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setPeriodOpen((v) => !v)}
              className="h-8 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 inline-flex items-center gap-1"
            >
              {period}
              <IoChevronDown size={14} />
            </button>
            {periodOpen && (
              <ul className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow z-10 text-sm">
                {["Current Week", "Previous Week", "This Month", "This Year"].map((p) => (
                  <li
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setPeriodOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* legend */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#ec4899" }} />
            <span>Current</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#7c3aed" }} />
            <span>Previous</span>
          </div>
        </div>

        {/* chart */}
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#eee" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                stroke="#9ca3af"          // light gray ticks like mock
                fontSize={12}
              />
              <YAxis
                domain={[0, 30]}
                ticks={[0, 10, 20, 30]}
                tickFormatter={(v) => (v === 0 ? "0" : `${v}M`)}
                axisLine={false}
                tickLine={false}
                stroke="#9ca3af"          // light gray ticks like mock
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "transparent" }} />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#ec4899"           // pink solid
                strokeWidth={4}
                dot={{ r: 4, fill: "#ec4899", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#ec4899", stroke: "#fff", strokeWidth: 3 }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#7c3aed"           // purple dashed
                strokeWidth={4}
                strokeDasharray="6 6"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Right: Green Card (uses image from public/assets/Map.png) ===== */}
      <div className="bg-emerald-500 rounded-2xl p-4 sm:p-5 text-white shadow-sm">
        <h4 className="text-lg font-semibold mb-3">Revenue by Location</h4>

        {/* Map image — put your file at public/assets/Map.png */}
        <div className="rounded-xl overflow-hidden bg-emerald-600/40 p-2">
          <img
            src="/assets/Map.png"           // <-- correct way to reference files in /public
            alt="World map"
            className="w-full h-28 sm:h-32 object-contain opacity-90"
          />
        </div>

        <ul className="mt-4 space-y-4">
          {locations.map((l) => {
            const val = Number(l.value.replace("K", "")); // 72 -> 72%
            const percent = Math.max(0, Math.min(100, val)); // clamp 0..100
            return (
              <li key={l.city}>
                <div className="flex items-center justify-between text-[15px]">
                  <span className="truncate">{l.city}</span>
                  <span className="font-semibold">{l.value}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/30 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserTrafficChart;
