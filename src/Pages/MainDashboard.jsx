import React from "react";
import StatsOverview from "../Components/dashboard/StatsOverview";
import TrendListTable from "../Components/userlist/TrendListTable";
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

// mock data for charts
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

const DashboardPage = () => {
  return (
    <div className="p-4 space-y-6 bg-[#111] text-white">
      {/* KPI Cards */}
      <StatsOverview />

      {/* Charts Section */}
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Line Chart */}
        <div className="bg-[#0C0F14] rounded-2xl ring-1 ring-white/10 p-4 shadow-md hover:ring-white/15 transition">
          <h2 className="text-lg font-semibold mb-4 text-white">
            Trend Popularity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendsData}
              margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                {/* Soft glow under line */}
                <linearGradient id="trendGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D0EA59" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D0EA59" stopOpacity="0" />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={40}
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
              {/* Legend omitted (single series) */}

              {/* Fill for subtle area effect */}
              <Line
                type="monotone"
                dataKey="popularity"
                stroke="#D0EA59"
                strokeWidth={2.5}
                dot={{ r: 3, stroke: "#0C0F14", strokeWidth: 2 }}
                activeDot={{ r: 5 }}
              />
              {/* Trick: an Area look via a second line with stroke="none" and fill gradient */}
              <Line
                type="monotone"
                dataKey="popularity"
                stroke="none"
                fill="url(#trendGlow)"
                fillOpacity={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

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
              {/* Legend omitted (single series) */}

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
