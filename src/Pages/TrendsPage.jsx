import React from "react";
import StatsOverview from "../Components/dashboard/StatsOverview";
import TrendListTable from "../Components/userlist/TrendListTable";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// mock data for chart
const trendsData = [
  { name: "Cricket", popularity: 95 },
  { name: "Football", popularity: 88 },
  { name: "Basketball", popularity: 92 },
  { name: "E-Sports", popularity: 75 },
  { name: "Soccer", popularity: 64 },
];

const TrendsPage = () => {
  return (
    <div className="p-4 space-y-6 bg-black text-white">
      {/* stats cards */}
      <StatsOverview />

      {/* Trends Chart */}
      <div className="bg-[#111] rounded-2xl shadow-sm ring-1 ring-gray-800 p-4">
        <h2 className="text-lg font-semibold mb-4 text-white">Trend Popularity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendsData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />
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

      {/* Trends Table */}
      <TrendListTable />
    </div>
  );
};

export default TrendsPage;





// import React from "react";
// import StatsOverview from "../Components/dashboard/StatsOverview";
// import TrendListTable from "../Components/userlist/TrendListTable";

// const TrendsPage = () => {
//   return (
//     <div>
//       <StatsOverview />
//       <TrendListTable/>
//     </div>
//   );
// };

// export default TrendsPage;



// import React from "react";
// import { trends } from "../Data/mockData";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// export default function TrendsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Trends & Analytics</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={trends}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeWidth={2} />
//             <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }


// import React from "react";

// export default function TrendsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Trends & Analytics</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <p className="text-gray-500">Charts showing user activity, subscriptions, and game trends...</p>
//       </div>
//     </div>
//   );
// }
