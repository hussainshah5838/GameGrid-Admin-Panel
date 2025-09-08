import React from "react";
import StatsOverview from "../Components/dashboard/StatsOverview";
import MarketTrendsStats from "../Components/dashboard/MarketTrendsStats";
import TrendListTable from "../Components/userlist/TrendListTable";
import TrendsExplorer from "../Components/dashboard/TrendsExplorer";
import PaymentListTable from "../Components/Payments/PaymentsTable";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FiDownload } from "react-icons/fi";
import { utils, writeFile } from "xlsx";

/* NEW: KPI data to feed the cards and export */
const kpiData = [
  { title: "Views", value: "721K", change: 11.01, color: "yellow" },
  { title: "Visits", value: "367K", change: -0.03, color: "green" },
  { title: "New Users", value: "1,156", change: 15.03, color: "purple" },
  { title: "Active Users", value: "239K", change: 6.08, color: "blue" },
];

/* Charts data */
const trendsData = [
  { name: "Cricket", popularity: 95 },
  { name: "Football", popularity: 88 },
  { name: "Basketball", popularity: 92 },
  { name: "E-Sports", popularity: 75 },
  { name: "Soccer", popularity: 64 },
];

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 3000 },
];

/* Auto-fit column widths */
function sheetWithAutoWidth(json) {
  const ws = utils.json_to_sheet(json);
  const keys = Object.keys(json[0] || {});
  ws["!cols"] = keys.map((k) => {
    const headerLen = String(k).length;
    const maxCellLen = json.reduce(
      (m, r) => Math.max(m, String(r[k] ?? "").length),
      0
    );
    return { wch: Math.max(10, headerLen, maxCellLen) + 2 };
  });
  return ws;
}

/* NEW: Single export for cards + charts */
function downloadDashboardXLSX() {
  const wb = utils.book_new();

  const kpiRows = kpiData.map((k) => ({
    Metric: k.title,
    Value: k.value,
    "Change (%)": Number(k.change).toFixed(2),
  }));
  utils.book_append_sheet(wb, sheetWithAutoWidth(kpiRows), "KPIs");

  const trendsRows = trendsData.map((d) => ({
    Trend: d.name,
    Popularity: d.popularity,
  }));
  utils.book_append_sheet(
    wb,
    sheetWithAutoWidth(trendsRows),
    "Trend Popularity"
  );

  const revenueRows = revenueData.map((d) => ({
    Month: d.month,
    Revenue: d.revenue,
  }));
  utils.book_append_sheet(
    wb,
    sheetWithAutoWidth(revenueRows),
    "Monthly Revenue"
  );

  const date = new Date().toISOString().slice(0, 10);
  writeFile(wb, `dashboard_export_${date}.xlsx`);
}

const DashboardPage = () => {
  return (
    <div className="p-4 space-y-6 bg-[#111] text-white">
      {/* Top actions (Download button at top) */}
      <div className="flex items-center justify-end">
        <button
          onClick={downloadDashboardXLSX}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold
                     text-black bg-[#D0EA59] hover:bg-[#dff481] ring-1 ring-black/10 shadow-sm transition"
        >
          <FiDownload />
          Download (.xlsx)
        </button>
      </div>

      {/* KPI Cards (fed with same data we export) */}
      <MarketTrendsStats />
      {/* KPI Cards (fed with same data we export) */}
      <StatsOverview statsData={kpiData} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Trends Line Chart */}
        <TrendsExplorer />

        {/* Revenue Bar Chart */}
        <div className="bg-[#0C0F14] rounded-2xl ring-1 ring-white/10 p-4 shadow-md hover:ring-white/15 transition">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revBars" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D0EA59" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D0EA59" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={48}
                tickMargin={8}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0C0F14",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                labelStyle={{ color: "#CBD5E1" }}
              />
              <Bar
                dataKey="revenue"
                fill="url(#revBars)"
                radius={[8, 8, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payments Section */}
      <div className="bg-[#111] rounded-2xl ring-1 ring-gray-800 p-4 shadow-card shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Latest Payments
        </h2>
        <PaymentListTable />
      </div>

      {/* Trends Table Full */}
      <div className="bg-[#111] rounded-2xl ring-1 ring-gray-800 p-4 shadow-card shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Trends Details
        </h2>
        <TrendListTable />
      </div>
    </div>
  );
};

export default DashboardPage;
