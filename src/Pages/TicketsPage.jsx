import React from "react";
import TicketListTable from "../Components/userlist/TicketListTable";
//import StatsOverview from "../Components/dashboard/StatsOverview";

const TicketsPage = () => {
  return (
    <div>
      
      <TicketListTable />
    </div>
  );
};

export default TicketsPage;



// import React from "react";
// import { tickets } from "../Data/mockData";

// export default function TicketsPage() {
//   const statusColor = {
//     Open: "bg-red-500",
//     Closed: "bg-green-500",
//     "In Progress": "bg-yellow-500",
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="p-2">User</th>
//               <th className="p-2">Subject</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tickets.map((ticket) => (
//               <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                 <td className="p-2">{ticket.user}</td>
//                 <td className="p-2">{ticket.subject}</td>
//                 <td className="p-2">
//                   <span className={`text-white px-2 py-1 rounded ${statusColor[ticket.status]}`}>
//                     {ticket.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// import React from "react";

// export default function TicketsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Support Tickets</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <p className="text-gray-500">List of tickets (open, closed, assigned)...</p>
//       </div>
//     </div>
//   );
// }
