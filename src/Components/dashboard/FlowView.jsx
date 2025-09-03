import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", leagues: 5, teams: 60, players: 600 },
  { month: "Feb", leagues: 6, teams: 65, players: 620 },
  { month: "Mar", leagues: 7, teams: 70, players: 640 },
  { month: "Apr", leagues: 7, teams: 72, players: 660 },
  { month: "May", leagues: 8, teams: 78, players: 700 },
  { month: "Jun", leagues: 9, teams: 85, players: 740 },
];

const FlowView = () => {
  return (
    <div className="bg-[#111] shadow-sm rounded-2xl p-6 mt-6 text-white ring-1 ring-gray-800">
      <h2 className="text-xl font-semibold mb-4">Research Stats Flow</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" tick={{ fill: "#ccc" }} />
          <YAxis stroke="#ccc" tick={{ fill: "#ccc" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
            labelStyle={{ color: "#ccc" }}
          />
          <Line type="monotone" dataKey="leagues" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="teams" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="players" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlowView;
