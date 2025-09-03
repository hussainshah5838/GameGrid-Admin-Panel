import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiSliders,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Checkbox, UserCell, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

const tickets = [
  { id: "TCK1001", name: "Ali Khan", email: "ali.khan@example.com", subject: "Unable to login to account", priority: "High", status: "Open", date: "2023-08-01", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "TCK1002", name: "Sara Malik", email: "sara.malik@example.com", subject: "Payment not processed", priority: "Urgent", status: "In Progress", date: "2023-08-02", avatar: "https://i.pravatar.cc/64?img=33" },
  { id: "TCK1003", name: "Hamza Yousaf", email: "hamza.yousaf@example.com", subject: "App crashes on startup", priority: "Medium", status: "Resolved", date: "2023-08-03", avatar: "https://i.pravatar.cc/64?img=23" },
  { id: "TCK1004", name: "Ayesha Tariq", email: "ayesha.tariq@example.com", subject: "Request for account deletion", priority: "Low", status: "Closed", date: "2023-08-05", avatar: "https://i.pravatar.cc/64?img=41" },
  { id: "TCK1005", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", subject: "Refund request for subscription", priority: "High", status: "Open", date: "2023-08-06", avatar: "https://i.pravatar.cc/64?img=56" },
];

// helper for colored priority badge
const PriorityBadge = ({ level }) => {
  const colors = {
    Low: "bg-green-900/40 text-green-300",
    Medium: "bg-yellow-900/40 text-yellow-300",
    High: "bg-orange-900/40 text-orange-300",
    Urgent: "bg-red-900/40 text-red-300",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}>
      {level}
    </span>
  );
};

// Ticket stats
const totalTickets = tickets.length;
const openTickets = tickets.filter(t => t.status === "Open").length;
const inProgressTickets = tickets.filter(t => t.status === "In Progress").length;
const closedTickets = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;

const TicketListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      tickets.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.email.toLowerCase().includes(search.toLowerCase()) ||
          t.subject.toLowerCase().includes(search.toLowerCase()) ||
          t.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      {/* Ticket Stats Cards */}
      <h2 className="text-lg font-semibold text-white">Ticket Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-[#D0EA59]">
          <span className="text-sm font-medium text-black">Total Tickets</span>
          <span className="mt-1 text-2xl font-semibold text-black">{totalTickets}</span>
        </div>
         <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-green-500">
          <span className="text-sm font-medium text-white">Resolved / Closed</span>
          <span className="mt-1 text-2xl font-semibold text-white">{closedTickets}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-yellow-500">
          <span className="text-sm font-medium text-white">In Progress</span>
          <span className="mt-1 text-2xl font-semibold text-white">{inProgressTickets}</span>
        </div>
        <div className="rounded-2xl p-4 flex flex-col shadow-sm bg-blue-500">
          <span className="text-sm font-medium text-white">Open</span>
          <span className="mt-1 text-2xl font-semibold text-white">{openTickets}</span>
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Tickets"
              className="h-9 w-full rounded-lg bg-[#111] text-white ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#111] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full text-sm">
            <thead>
              <tr className="text-gray-300 border-b border-gray-700">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onChange={() =>
                      setChecked(allSelected ? new Set() : new Set(filtered.map((_, i) => i)))
                    }
                  />
                </th>
                <th className="py-3 text-left">Ticket ID</th>
                <th className="py-3 text-left">User</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Subject</th>
                <th className="py-3 text-left">Priority</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t, idx) => {
                const active = checked.has(idx);
                const zebra = idx % 2 === 1;

                return (
                  <tr
                    key={t.id}
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

                    <td className="py-3 text-white">{t.id}</td>
                    <td className="py-3"><UserCell avatar={t.avatar} name={t.name} /></td>
                    <td className="py-3 text-gray-300">{t.email}</td>
                    <td className="py-3 text-gray-300">{t.subject}</td>
                    <td className="py-3"><PriorityBadge level={t.priority} /></td>
                    <td className="py-3"><StatusPill status={t.status} /></td>
                    <td className="py-3"><DateCell text={t.date} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 p-3 border-t border-gray-800">
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-800 text-white"><FiChevronLeft /></button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`h-8 w-8 rounded-md text-sm ${n === 1 ? "bg-[#D0EA59] text-black font-semibold" : "bg-[#111] ring-1 ring-gray-700 text-white hover:bg-gray-800"}`}
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

export default TicketListTable;





// // TicketListTable.jsx
// import React, { useMemo, useState } from "react";
// import {
//   FiPlus,
//   FiFilter,
//   FiSliders,
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { Checkbox, UserCell, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

// const tickets = [
//   {
//     id: "TCK1001",
//     name: "Ali Khan",
//     email: "ali.khan@example.com",
//     subject: "Unable to login to account",
//     priority: "High",
//     status: "Open",
//     date: "2023-08-01",
//     avatar: "https://i.pravatar.cc/64?img=12",
//   },
//   {
//     id: "TCK1002",
//     name: "Sara Malik",
//     email: "sara.malik@example.com",
//     subject: "Payment not processed",
//     priority: "Urgent",
//     status: "In Progress",
//     date: "2023-08-02",
//     avatar: "https://i.pravatar.cc/64?img=33",
//   },
//   {
//     id: "TCK1003",
//     name: "Hamza Yousaf",
//     email: "hamza.yousaf@example.com",
//     subject: "App crashes on startup",
//     priority: "Medium",
//     status: "Resolved",
//     date: "2023-08-03",
//     avatar: "https://i.pravatar.cc/64?img=23",
//   },
//   {
//     id: "TCK1004",
//     name: "Ayesha Tariq",
//     email: "ayesha.tariq@example.com",
//     subject: "Request for account deletion",
//     priority: "Low",
//     status: "Closed",
//     date: "2023-08-05",
//     avatar: "https://i.pravatar.cc/64?img=41",
//   },
//   {
//     id: "TCK1005",
//     name: "Bilal Ahmed",
//     email: "bilal.ahmed@example.com",
//     subject: "Refund request for subscription",
//     priority: "High",
//     status: "Open",
//     date: "2023-08-06",
//     avatar: "https://i.pravatar.cc/64?img=56",
//   },
// ];

// /* helper for colored priority badge */
// const PriorityBadge = ({ level }) => {
//   const colors = {
//     Low: "bg-green-900/40 text-green-300",
//     Medium: "bg-yellow-900/40 text-yellow-300",
//     High: "bg-orange-900/40 text-orange-300",
//     Urgent: "bg-red-900/40 text-red-300",
//   };
//   return (
//     <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[level]}`}>
//       {level}
//     </span>
//   );
// };

// const TicketListTable = () => {
//   const [search, setSearch] = useState("");
//   const [checked, setChecked] = useState(() => new Set());

//   const filtered = useMemo(
//     () =>
//       tickets.filter(
//         (t) =>
//           t.name.toLowerCase().includes(search.toLowerCase()) ||
//           t.email.toLowerCase().includes(search.toLowerCase()) ||
//           t.subject.toLowerCase().includes(search.toLowerCase()) ||
//           t.id.toLowerCase().includes(search.toLowerCase())
//       ),
//     [search]
//   );

//   const allSelected = checked.size === filtered.length && filtered.length > 0;

//   return (
//     <div className="rounded-2xl mt-4 bg-[#111] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white">
//       {/* Toolbar */}
//       <div className="rounded-2xl bg-[#D0EA59] px-3 sm:px-4 py-2.5 flex items-center">
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
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search Tickets"
//               className="h-9 w-full rounded-lg bg-[#111] text-white ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-[#D0EA59]"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-[950px] w-full text-sm">
//           <thead>
//             <tr className="text-gray-300 border-b border-gray-700">
//               <th className="px-4 py-3 w-10">
//                 <Checkbox
//                   checked={allSelected}
//                   onChange={() =>
//                     setChecked(allSelected ? new Set() : new Set(filtered.map((_, i) => i)))
//                   }
//                 />
//               </th>
//               <th className="py-3 text-left">Ticket ID</th>
//               <th className="py-3 text-left">User</th>
//               <th className="py-3 text-left">Email</th>
//               <th className="py-3 text-left">Subject</th>
//               <th className="py-3 text-left">Priority</th>
//               <th className="py-3 text-left">Status</th>
//               <th className="py-3 text-left">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((t, idx) => {
//               const active = checked.has(idx);
//               const zebra = idx % 2 === 1;

//               return (
//                 <tr
//                   key={t.id}
//                   className={`${
//                     active ? "bg-[#1E1E1E]" : zebra ? "bg-[#151515]" : "bg-[#111]"
//                   } hover:bg-[#1E1E1E] border-b border-gray-800`}
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

//                   <td className="py-3 text-white">{t.id}</td>
//                   <td className="py-3">
//                     <UserCell avatar={t.avatar} name={t.name} />
//                   </td>
//                   <td className="py-3 text-gray-300">{t.email}</td>
//                   <td className="py-3 text-gray-300">{t.subject}</td>
//                   <td className="py-3">
//                     <PriorityBadge level={t.priority} />
//                   </td>
//                   <td className="py-3">
//                     <StatusPill status={t.status} />
//                   </td>
//                   <td className="py-3">
//                     <DateCell text={t.date} />
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

// export default TicketListTable;




