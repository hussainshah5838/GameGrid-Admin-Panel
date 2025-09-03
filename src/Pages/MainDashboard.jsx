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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trends Line Chart */}
        <div className="bg-[#111] rounded-2xl shadow-sm ring-1 ring-gray-800 p-4">
          <h2 className="text-lg font-semibold mb-4 text-white">Trend Popularity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#ccc" tick={{ fill: "#ccc" }} />
              <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
                labelStyle={{ color: "#ccc" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Line
                type="monotone"
                dataKey="popularity"
                stroke="#D0EA59"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Bar Chart */}
        <div className="bg-[#111] rounded-2xl shadow-sm ring-1 ring-gray-800 p-4">
          <h2 className="text-lg font-semibold mb-4 text-white">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#ccc" tick={{ fill: "#ccc" }} />
              <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
                labelStyle={{ color: "#ccc" }}
              />
              <Legend wrapperStyle={{ color: "#ccc" }} />
              <Bar dataKey="revenue" fill="#D0EA59" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      
      {/* Payments Section */}
      <div className="bg-[#111] rounded-2xl shadow-sm ring-1 ring-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Latest Payments</h2>
        <PaymentListTable />
      </div>

      {/* Trends Table Full */}
      <div className="bg-[#111] rounded-2xl shadow-sm ring-1 ring-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Trends Details</h2>
        <TrendListTable />
      </div>
    </div>
  );
};

export default DashboardPage;
