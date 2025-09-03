import React from "react";

export default function NotificationsPage() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Notification Title"
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Notification Message"
            rows={4}
            className="w-full p-3 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
          >
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
}



// import React from "react";

// export default function NotificationsPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Notification Title"
//             className="w-full p-2 border rounded"
//           />
//           <textarea
//             placeholder="Notification Message"
//             className="w-full p-2 border rounded"
//           />
//           <button className="bg-green-600 text-white px-4 py-2 rounded">
//             Send Notification
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
