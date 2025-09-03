import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiSliders,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Checkbox, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

/* ---- sample mock game data ---- */
const games = [
  { id: 1, name: "Cricket",  status: "Active", players: "11 vs 11", startDate: "2023-09-12" },
  { id: 2, name: "Football",  status: "Approved", players: "11 vs 11", startDate: "2023-09-20" },
  { id: 3, name: "Basketball",  status: "Pending", players: "5 vs 5", startDate: "2023-09-25" },
  { id: 4, name: "Soccer",  status: "Approved", players: "11 vs 11", startDate: "2023-10-01" },
  { id: 5, name: "Tennis",  status: "Approved", players: "1 vs 1 / 2 vs 2", startDate: "2023-10-05" },
  { id: 6, name: "Hockey",  status: "Active", players: "11 vs 11", startDate: "2023-10-08" },
  { id: 7, name: "Badminton",  status: "Pending", players: "1 vs 1 / 2 vs 2", startDate: "2023-10-12" },
  { id: 8, name: "Volleyball",  status: "Approved", players: "6 vs 6", startDate: "2023-10-15" },
];

// Game stats
const totalGames = games.length;
const approvedGames = games.filter(g => g.status === "Approved").length;
const pendingGames = games.filter(g => g.status === "Pending" || g.status === "In Progress").length;
const activeGames = games.filter(g => g.status === "Active").length;

const GameListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      games.filter(
        (g) =>
          g.name.toLowerCase().includes(search.toLowerCase()) ||
          g.status.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      {/* Overview / Game Stats */}
      <h2 className="text-lg font-semibold text-white">Game Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-[#D0EA59]">
          <span className="text-sm font-medium text-black">Total Games</span>
          <span className="mt-1 text-2xl font-semibold text-black">{totalGames}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-green-500">
          <span className="text-sm font-medium text-white">Approved</span>
          <span className="mt-1 text-2xl font-semibold text-white">{approvedGames}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-yellow-500">
          <span className="text-sm font-medium text-white">Pending</span>
          <span className="mt-1 text-2xl font-semibold text-white">{pendingGames}</span>
        </div>
        
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-blue-500">
          <span className="text-sm font-medium text-white">Active</span>
          <span className="mt-1 text-2xl font-semibold text-white">{activeGames}</span>
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
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Games"
              className="h-9 w-full rounded-lg bg-[#111] ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 text-white focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#111] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[820px] w-full text-sm">
            <thead>
              <tr className="text-gray-300 border-b border-gray-700">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onChange={() =>
                      setChecked(
                        allSelected ? new Set() : new Set(filtered.map((_, i) => i))
                      )
                    }
                  />
                </th>
                <th className="py-3 text-left">ID</th>
                <th className="py-3 text-left">Game</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Players</th>
                <th className="py-3 text-left">Start Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((game, idx) => {
                const active = checked.has(idx);
                const zebra = idx % 2 === 1;

                return (
                  <tr
                    key={game.id}
                    className={`${active ? "bg-[#1E1E1E]" : zebra ? "bg-[#151515]" : "bg-[#111]"} hover:bg-[#1E1E1E] border-b border-gray-800`}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={active}
                        onChange={(v) => {
                          const next = new Set(checked);
                          v ? next.add(idx) : next.delete(idx);
                          setChecked(next);
                        }}
                      />
                    </td>

                    <td className="py-3 text-white">{game.id}</td>
                    <td className="py-3 text-white font-medium">{game.name}</td>

                    <td className="py-3">
                      <StatusPill status={game.status} />
                    </td>
                    <td className="py-3 text-gray-300">{game.players}</td>
                    <td className="py-3">
                      <DateCell text={game.startDate} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 p-3 border-t border-gray-800">
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white">
            <FiChevronLeft />
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`h-8 w-8 rounded-md text-sm ${n === 1 ? "bg-[#D0EA59] text-black font-semibold" : "bg-[#111] ring-1 ring-gray-700 text-white hover:bg-gray-800"}`}
            >
              {n}
            </button>
          ))}
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameListTable;






// // GameListTable.jsx
// import React, { useMemo, useState } from "react";
// import {
//   FiPlus,
//   FiFilter,
//   FiSliders,
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import {
//   Checkbox,
//   DateCell,
//   StatusPill,
// } from "../ui/shared/TablePrimitives";

// /* ---- sample mock game data ---- */
// const games = [
//   { id: 1, name: "Cricket", category: "Outdoor", status: "Active", players: "11 vs 11", startDate: "2023-09-12" },
//   { id: 2, name: "Football", category: "Outdoor", status: "In Progress", players: "11 vs 11", startDate: "2023-09-20" },
//   { id: 3, name: "Basketball", category: "Indoor", status: "Pending", players: "5 vs 5", startDate: "2023-09-25" },
//   { id: 4, name: "Soccer", category: "Outdoor", status: "Approved", players: "11 vs 11", startDate: "2023-10-01" },
//   { id: 5, name: "Tennis", category: "Outdoor", status: "Rejected", players: "1 vs 1 / 2 vs 2", startDate: "2023-10-05" },
//   { id: 6, name: "Hockey", category: "Outdoor", status: "Active", players: "11 vs 11", startDate: "2023-10-08" },
//   { id: 7, name: "Badminton", category: "Indoor", status: "Pending", players: "1 vs 1 / 2 vs 2", startDate: "2023-10-12" },
//   { id: 8, name: "Volleyball", category: "Outdoor", status: "Approved", players: "6 vs 6", startDate: "2023-10-15" },
// ];

// const GameListTable = () => {
//   const [search, setSearch] = useState("");
//   const [checked, setChecked] = useState(() => new Set());

//   const filtered = useMemo(
//     () =>
//       games.filter(
//         (g) =>
//           g.name.toLowerCase().includes(search.toLowerCase()) ||
//           g.category.toLowerCase().includes(search.toLowerCase()) ||
//           g.status.toLowerCase().includes(search.toLowerCase())
//       ),
//     [search]
//   );

//   const allSelected = checked.size === filtered.length && filtered.length > 0;

//   return (
//     <div className="rounded-2xl mt-4 bg-[#111] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
//       {/* Toolbar */}
//       <div className="rounded-2xl bg-[#D0EA59] px-3 sm:px-4 py-2.5 flex items-center">
//         <div className="flex items-center gap-5 text-black font-medium">
//           <button type="button" className="p-2 hover:text-gray-700">
//             <FiPlus size={18} />
//           </button>
//           <button type="button" className="p-2 hover:text-gray-700">
//             <FiFilter size={18} />
//           </button>
//           <button type="button" className="p-2 hover:text-gray-700">
//             <FiSliders size={18} />
//           </button>
//         </div>

//         <div className="ml-auto w-52 sm:w-64">
//           <div className="relative">
//             <FiSearch
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search Games"
//               className="h-9 w-full rounded-lg bg-black ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 text-white focus:ring-2 focus:ring-[#D0EA59]"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[820px] w-full text-sm">
//           <thead>
//             <tr className="text-gray-300 border-b border-gray-700">
//               <th className="px-4 py-3 w-10">
//                 <Checkbox
//                   checked={allSelected}
//                   onChange={() =>
//                     setChecked(
//                       allSelected ? new Set() : new Set(filtered.map((_, i) => i))
//                     )
//                   }
//                 />
//               </th>
//               <th className="py-3 text-left">ID</th>
//               <th className="py-3 text-left">Game</th>
//               <th className="py-3 text-left">Category</th>
//               <th className="py-3 text-left">Status</th>
//               <th className="py-3 text-left">Players</th>
//               <th className="py-3 text-left">Start Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((game, idx) => {
//               const active = checked.has(idx);
//               const zebra = idx % 2 === 1;

//               return (
//                 <tr
//                   key={game.id}
//                  className={`${active ? "bg-[#1E1E1E]" : zebra ? "bg-[#151515]" : "bg-[#111]"} hover:bg-[#1E1E1E] border-b border-gray-800`}
//                 >
//                   <td className="px-4 py-3">
//                     <Checkbox
//                       checked={active}
//                       onChange={(v) => {
//                         const next = new Set(checked);
//                         v ? next.add(idx) : next.delete(idx);
//                         setChecked(next);
//                       }}
//                     />
//                   </td>

//                   <td className="py-3 text-white">{game.id}</td>
//                   <td className="py-3 text-white font-medium">{game.name}</td>
//                   <td className="py-3 text-gray-300">{game.category}</td>
//                   <td className="py-3">
//                     <StatusPill status={game.status} />
//                   </td>
//                   <td className="py-3 text-gray-300">{game.players}</td>
//                   <td className="py-3">
//                     <DateCell text={game.startDate} />
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-end gap-1 p-3 border-t border-gray-800">
//         <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white">
//           <FiChevronLeft />
//         </button>
//         {[1, 2, 3, 4, 5].map((n) => (
//           <button
//             key={n}
//             className={`h-8 w-8 rounded-md text-sm ${
//               n === 1
//                 ? "bg-[#D0EA59] text-black font-semibold"
//                 : "bg-[#111] ring-1 ring-gray-700 text-white hover:bg-gray-800"
//             }`}
//           >
//             {n}
//           </button>
//         ))}
//         <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white">
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GameListTable;





