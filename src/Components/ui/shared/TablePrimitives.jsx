// TablePrimitives.jsx
import React from "react";
import { FiCalendar } from "react-icons/fi";

/* ---------- Reusable UI primitives for tables ---------- */

export const Checkbox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    className="h-4 w-4 rounded border-gray-500 text-[#D0EA59] focus:ring-[#D0EA59] bg-black"
    checked={checked}
    onChange={(e) => onChange?.(e.target.checked)}
  />
);

export const UserCell = ({ avatar, name }) => (
  <div className="flex items-center gap-2">
    <img
      src={avatar}
      alt={name}
      className="w-8 h-8 rounded-full object-cover border border-gray-700"
    />
    <span className="text-white">{name}</span>
  </div>
);

export const DateCell = ({ text }) => (
  <span className="inline-flex items-center gap-2 text-white">
    <FiCalendar className="text-[#D0EA59]" size={16} />
    {text}
  </span>
);

/* Status with colored dot */
const STATUS_STYLES = {
  Active:       { dot: "bg-[#D0EA59]",  text: "text-[#D0EA59]" },
  Pending:      { dot: "bg-yellow-400", text: "text-yellow-400" },
  Approved:     { dot: "bg-green-400",  text: "text-green-400" },
  Rejected:     { dot: "bg-red-500",    text: "text-red-500" },
  "In Progress":{ dot: "bg-blue-400",   text: "text-blue-400" },
};

export const StatusPill = ({ status }) => {
  const st = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
  return (
    <span className={`inline-flex items-center gap-2 ${st.text} font-medium`}>
      <span className={`w-2 h-2 rounded-full ${st.dot}`} />
      {status}
    </span>
  );
};




// // TablePrimitives.jsx
// import React from "react";
// import { FiCalendar } from "react-icons/fi";

// /* ---------- Reusable UI primitives for tables ---------- */

// export const Checkbox = ({ checked, onChange }) => (
//   <input
//     type="checkbox"
//     className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//     checked={checked}
//     onChange={(e) => onChange?.(e.target.checked)}
//   />
// );

// export const UserCell = ({ avatar, name }) => (
//   <div className="flex items-center gap-2">
//     <img
//       src={avatar}
//       alt={name}
//       className="w-8 h-8 rounded-full object-cover"
//     />
//     <span className="text-gray-800">{name}</span>
//   </div>
// );

// export const DateCell = ({ text }) => (
//   <span className="inline-flex items-center gap-2 text-gray-700">
//     <FiCalendar className="text-gray-400" size={16} />
//     {text}
//   </span>
// );

// /* Status with colored dot */
// const STATUS_STYLES = {
//   Active:       { dot: "bg-emerald-500", text: "text-emerald-600" },
//   Pending:      { dot: "bg-sky-500",     text: "text-sky-600" },
//   Approved:     { dot: "bg-amber-400",   text: "text-amber-500" },
//   Rejected:     { dot: "bg-gray-300",    text: "text-gray-400" },
//   "In Progress":{ dot: "bg-indigo-500",  text: "text-indigo-600" },
// };

// export const StatusPill = ({ status }) => {
//   const st = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
//   return (
//     <span className={`inline-flex items-center gap-2 ${st.text} font-medium`}>
//       <span className={`w-2 h-2 rounded-full ${st.dot}`} />
//       {status}
//     </span>
//   );
// };



// import React from "react";
// import { FiCalendar } from "react-icons/fi";

// /* ---------- Reusable UI primitives for tables ---------- */

// export const Checkbox = ({ checked, onChange }) => (
//   <input
//     type="checkbox"
//     className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//     checked={checked}
//     onChange={(e) => onChange?.(e.target.checked)}
//   />
// );
// export const UserCell = ({ avatar, name }) => (
//   <div className="flex items-center gap-2">
//     <img
//       src={avatar}
//       alt={name}
//       className="w-8 h-8 rounded-full object-cover"
//     />
//     <span className="text-gray-800">{name}</span>
//   </div>
// );

// export const DateCell = ({ text }) => (
//   <span className="inline-flex items-center gap-2 text-gray-700">
//     <FiCalendar className="text-gray-400" size={16} />
//     {text}
//   </span>
// );

// /* Status with colored dot (used by Payments table) */
// const STATUS_STYLES = {
//   "In Progress": { dot: "bg-indigo-500", text: "text-indigo-600" },
//   "Complete":    { dot: "bg-emerald-500", text: "text-emerald-600" },
//   "Pending":     { dot: "bg-sky-500",     text: "text-sky-600" },
//   "Approved":    { dot: "bg-amber-400",   text: "text-amber-500" },
//   "Rejected":    { dot: "bg-gray-300",    text: "text-gray-400" },
// };

// export const StatusPill = ({ status }) => {
//   const st = STATUS_STYLES[status] ?? STATUS_STYLES.Pending;
//   return (
//     <span className={`inline-flex items-center gap-2 ${st.text} font-medium`}>
//       <span className={`w-2 h-2 rounded-full ${st.dot}`} />
//       {status}
//     </span>
//   );
// };
