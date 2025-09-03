import React, { useMemo, useState } from "react";
import { FiPlus, FiFilter, FiSliders, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Checkbox, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

const trends = [
  { id: "TR1001", category: "Cricket", name: "World Cup 2023", popularity: "95%", status: "Rising", updated: "2023-11-12" },
  { id: "TR1002", category: "Football", name: "Champions League", popularity: "88%", status: "Stable", updated: "2023-10-20" },
  { id: "TR1003", category: "Basketball", name: "NBA Finals", popularity: "92%", status: "Rising", updated: "2023-11-05" },
  { id: "TR1004", category: "E-Sports", name: "Valorant Masters", popularity: "75%", status: "Stable", updated: "2023-09-29" },
  { id: "TR1005", category: "Soccer", name: "La Liga", popularity: "64%", status: "Declining", updated: "2023-08-14" },
];

// Trend stats
const totalTrends = trends.length;
const risingTrends = trends.filter(t => t.status === "Rising").length;
const stableTrends = trends.filter(t => t.status === "Stable").length;
const decliningTrends = trends.filter(t => t.status === "Declining").length;

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
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-[#D0EA59]">
          <span className="text-sm font-medium text-black">Total Trends</span>
          <span className="mt-1 text-2xl font-semibold text-black">{totalTrends}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-green-500">
          <span className="text-sm font-medium text-white">Rising</span>
          <span className="mt-1 text-2xl font-semibold text-white">{risingTrends}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-yellow-500 bg-blue-500">
          <span className="text-sm font-medium text-white">Stable</span>
          <span className="mt-1 text-2xl font-semibold text-white">{stableTrends}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-blue-500">
          <span className="text-sm font-medium text-white">Declining</span>
          <span className="mt-1 text-2xl font-semibold text-white">{decliningTrends}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-[#D0EA59] px-3 sm:px-4 py-2.5 flex items-center">
        <div className="flex items-center gap-5 text-black font-medium">
          <button type="button" className="p-2 hover:text-gray-700"><FiPlus size={18} /></button>
          <button type="button" className="p-2 hover:text-gray-700"><FiFilter size={18} /></button>
          <button type="button" className="p-2 hover:text-gray-700"><FiSliders size={18} /></button>
        </div>
        <div className="ml-auto w-52 sm:w-64">
          <div className="relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search Trends"
              className="h-9 w-full rounded-lg bg-[#1E1E1E] ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 text-white focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#1E1E1E] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[850px] w-full text-sm">
            <thead>
              <tr className="text-gray-300 border-b border-gray-700 bg-[#111]">
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
                const zebra = idx % 2 === 1;
                return (
                  <tr
                    key={t.id}
                    className={`${active ? "bg-[#2A2A2A]" : zebra ? "bg-[#1E1E1E]" : "bg-[#111]"} hover:bg-[#2A2A2A] border-b border-gray-800`}
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
                    <td className="py-3 text-gray-300">{t.category}</td>
                    <td className="py-3 text-gray-300">{t.name}</td>
                    <td className="py-3 text-gray-300">{t.popularity}</td>
                    <td className="py-3"><StatusPill status={t.status} /></td>
                    <td className="py-3"><DateCell text={t.updated} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 p-3 border-t border-gray-800">
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white"><FiChevronLeft /></button>
          {[1,2,3,4,5].map(n => (
            <button
              key={n}
              className={`h-8 w-8 rounded-md text-sm ${n === 1 ? "bg-[#D0EA59] text-black font-semibold" : "bg-[#1E1E1E] text-white ring-1 ring-gray-700 hover:bg-gray-800"}`}
            >
              {n}
            </button>
          ))}
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white"><FiChevronRight /></button>
        </div>
      </div>
    </div>
  );
};

export default TrendListTable;



// // TrendListTable.jsx
// import React, { useMemo, useState } from "react";
// import { FiPlus, FiFilter, FiSliders, FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { Checkbox, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

// const trends = [
//   { id: "TR1001", category: "Cricket", name: "World Cup 2023", popularity: "95%", status: "Rising", updated: "2023-11-12" },
//   { id: "TR1002", category: "Football", name: "Champions League", popularity: "88%", status: "Stable", updated: "2023-10-20" },
//   { id: "TR1003", category: "Basketball", name: "NBA Finals", popularity: "92%", status: "Rising", updated: "2023-11-05" },
//   { id: "TR1004", category: "E-Sports", name: "Valorant Masters", popularity: "75%", status: "Stable", updated: "2023-09-29" },
//   { id: "TR1005", category: "Soccer", name: "La Liga", popularity: "64%", status: "Declining", updated: "2023-08-14" },
// ];

// const TrendListTable = () => {
//   const [search, setSearch] = useState("");
//   const [checked, setChecked] = useState(() => new Set());

//   const filtered = useMemo(
//     () =>
//       trends.filter(
//         t =>
//           t.name.toLowerCase().includes(search.toLowerCase()) ||
//           t.category.toLowerCase().includes(search.toLowerCase()) ||
//           t.id.toLowerCase().includes(search.toLowerCase())
//       ),
//     [search]
//   );

//   const allSelected = checked.size === filtered.length && filtered.length > 0;

//   return (
//     <div className="rounded-2xl mt-4 bg-[#1E1E1E] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
//       {/* Toolbar */}
//       <div className="rounded-t-2xl bg-[#D0EA59] px-3 sm:px-4 py-2.5 flex items-center">
//         <div className="flex items-center gap-5 text-black font-medium">
//           <button type="button" className="p-2 hover:text-gray-700"><FiPlus size={18} /></button>
//           <button type="button" className="p-2 hover:text-gray-700"><FiFilter size={18} /></button>
//           <button type="button" className="p-2 hover:text-gray-700"><FiSliders size={18} /></button>
//         </div>
//         <div className="ml-auto w-52 sm:w-64">
//           <div className="relative">
//             <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//               placeholder="Search Trends"
//               className="h-9 w-full rounded-lg bg-[#1E1E1E] ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 text-white focus:ring-2 focus:ring-[#D0EA59]"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[850px] w-full text-sm">
//           <thead>
//             <tr className="text-gray-300 border-b border-gray-700 bg-[#111]">
//               <th className="px-4 py-3 w-10">
//                 <Checkbox
//                   checked={allSelected}
//                   onChange={() =>
//                     setChecked(allSelected ? new Set() : new Set(filtered.map(t => t.id)))
//                   }
//                 />
//               </th>
//               <th className="py-3 text-left">Trend ID</th>
//               <th className="py-3 text-left">Category</th>
//               <th className="py-3 text-left">Name</th>
//               <th className="py-3 text-left">Popularity</th>
//               <th className="py-3 text-left">Status</th>
//               <th className="py-3 text-left">Updated At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((t, idx) => {
//               const active = checked.has(t.id);
//               const zebra = idx % 2 === 1;
//               return (
//                 <tr
//                   key={t.id}
//                   className={`${active ? "bg-[#2A2A2A]" : zebra ? "bg-[#1E1E1E]" : "bg-[#111]"} hover:bg-[#2A2A2A] border-b border-gray-800`}
//                 >
//                   <td className="px-4 py-3">
//                     <Checkbox
//                       checked={active}
//                       onChange={v => {
//                         const next = new Set(checked);
//                         v ? next.add(t.id) : next.delete(t.id);
//                         setChecked(next);
//                       }}
//                     />
//                   </td>
//                   <td className="py-3 text-white">{t.id}</td>
//                   <td className="py-3 text-gray-300">{t.category}</td>
//                   <td className="py-3 text-gray-300">{t.name}</td>
//                   <td className="py-3 text-gray-300">{t.popularity}</td>
//                   <td className="py-3"><StatusPill status={t.status} /></td>
//                   <td className="py-3"><DateCell text={t.updated} /></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-end gap-1 p-3 border-t border-gray-800">
//         <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white"><FiChevronLeft /></button>
//         {[1,2,3,4,5].map(n => (
//           <button
//             key={n}
//             className={`h-8 w-8 rounded-md text-sm ${n === 1 ? "bg-[#D0EA59] text-black font-semibold" : "bg-[#1E1E1E] text-white ring-1 ring-gray-700 hover:bg-gray-800"}`}
//           >
//             {n}
//           </button>
//         ))}
//         <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white"><FiChevronRight /></button>
//       </div>
//     </div>
//   );
// };

// export default TrendListTable;



