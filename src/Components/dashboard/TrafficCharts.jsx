import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { SiNike, SiAdidas, SiPuma, SiSony } from "react-icons/si";
import { TbTree } from "react-icons/tb";

/* -------- Data -------- */
const sales = [
  { label: "Direct", amount: 300.56, color: "#6D6AEF" }, // blue-violet dot like mock
  { label: "Affiliate", amount: 135.18, color: "#F59E0B" }, // amber
  { label: "Sponsored", amount: 154.02, color: "#EC4899" }, // pink
  { label: "E-mail", amount: 48.96, color: "#10B981" }, // green
];

// used for the donut ring (adds a white "gap" slice to match the visual)
const donutSlices = [
  { key: "sponsored", value: 154.02, color: "#EC4899" }, // top magenta arc
  { key: "direct", value: 300.56, color: "#7C3AED" }, // large purple arc
  { key: "gap", value: 110, color: "#FFFFFF" }, // white highlight segment
  { key: "email", value: 48.96, color: "#2DD4BF" }, // teal small arc
];

const sellers = [
  {
    name: "Nike",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
    Icon: SiNike,
    bg: "bg-black text-white",
  },
  {
    name: "Adidas",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
    Icon: SiAdidas,
    bg: "bg-white text-black border",
  },
  {
    name: "Puma",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
    Icon: SiPuma,
    bg: "bg-black text-white",
  },
  {
    name: "Timberland",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
    Icon: TbTree,
    bg: "bg-amber-400 text-black",
  },
  {
    name: "Sony",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
    Icon: SiSony,
    bg: "bg-black text-white",
  },
];

/* -------- Utils -------- */
const currency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

/* -------- Tooltip for donut -------- */
const DonutTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;
  const p = payload[0].payload;
  return (
    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
      {currency(p.value)}
    </div>
  );
};

const TrafficCharts = () => {
  // fixed to match the mock’s label
  const percentLabel = 38.6;

  return (
    <div className="my-4 mx-2 flex flex-col lg:flex-row gap-5">
      {/* ===== Left: Total Sales (exact look) ===== */}
      <div className="w-full lg:w-[340px] lg:shrink-0 rounded-2xl bg-[#F4B423] p-4 sm:p-5 shadow-sm">

        <div className="bg-[#F4B423] p-4 ">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Total Sales
          </h3>

          {/* Donut */}
          <div className="relative h-40 flex justify-center">
            <ResponsiveContainer width="80%" height="100%">
              <PieChart>
                <Tooltip content={<DonutTooltip />} />
                <Pie
                  data={donutSlices}
                  dataKey="value"
                  innerRadius={48}
                  outerRadius={72}
                  startAngle={230}
                  endAngle={-130}
                  paddingAngle={3}
                  cornerRadius={10}
                  isAnimationActive={false}
                >
                  {donutSlices.map((s, i) => (
                    <Cell key={i} fill={s.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* purple pill on the ring */}
            <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#7C3AED] text-white text-[11px] font-semibold px-2 py-1 rounded-md shadow">
              {percentLabel}%
            </span>
          </div>

          {/* Legend */}
          <ul className="mt-4 space-y-2 text-sm">
            {sales.map((s) => (
              <li key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-gray-900">{s.label}</span>
                </div>
                <span className="font-semibold text-gray-900 tabular-nums">
                  {currency(s.amount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ===== Right: Top Sellers table (kept as before) ===== */}
      <div className="flex-1 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 py-4">
          <h4 className="text-sm font-semibold text-gray-800">Top Sellers</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left font-medium px-4 sm:px-6 py-2">
                  Name
                </th>
                <th className="text-left font-medium px-4 sm:px-6 py-2">
                  Price
                </th>
                <th className="text-left font-medium px-4 sm:px-6 py-2">
                  Quantity
                </th>
                <th className="text-left font-medium px-4 sm:px-6 py-2">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4}>
                  <div className="h-px bg-gray-200 mx-4 sm:mx-6" />
                </td>
              </tr>
              {sellers.map(({ name, price, quantity, amount, Icon, bg }, i) => (
                <tr key={i} className="text-gray-700">
                  <td className="px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full grid place-items-center ${bg} border border-black/10`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span>{name}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3">{currency(price)}</td>
                  <td className="px-4 sm:px-6 py-3">{quantity}</td>
                  <td className="px-4 sm:px-6 py-3">{currency(amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="h-3" />
      </div>
    </div>
  );
};

export default TrafficCharts;
