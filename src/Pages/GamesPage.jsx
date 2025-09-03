import React from "react";
//import StatsOverview from "../Components/dashboard/StatsOverview";
import GameListTable from "../Components/userlist/GameListTable";

const GamesPage = () => {
  return (
    <div>
      
      <GameListTable />
    </div>
  );
};

export default GamesPage;


// import React from "react";
// import { games } from "../Data/mockData";

// export default function GamesPage() {
//   const statusColor = {
//     Live: "bg-green-500",
//     Upcoming: "bg-blue-500",
//     Finished: "bg-gray-500",
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Games Management</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b border-gray-200 dark:border-gray-700">
//               <th className="p-2">Game</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Players</th>
//             </tr>
//           </thead>
//           <tbody>
//             {games.map((game) => (
//               <tr key={game.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                 <td className="p-2">{game.title}</td>
//                 <td className="p-2">
//                   <span className={`text-white px-2 py-1 rounded ${statusColor[game.status]}`}>
//                     {game.status}
//                   </span>
//                 </td>
//                 <td className="p-2">{game.players}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import React from "react";

// export default function GamesPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Games Management</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <p className="text-gray-500">List of games, matches, and live updates...</p>
//       </div>
//     </div>
//   );
// }
