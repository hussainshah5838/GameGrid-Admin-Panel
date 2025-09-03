import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdClose, MdSearch, MdNotificationsNone } from "react-icons/md";

const Header = ({ isLeftOpen, onMenuClick, isRightOpen, onRightMenuClick }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pageName =
    pathname === "/"
      ? "Default"
      : pathname
          .split("/")
          .filter(Boolean)
          .pop()
          ?.replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) || "Default";

  return (
    <div className="sticky top-0 z-30 px-2 md:px-4 pt-2 transition-all duration-200 bg-[#111]">
      <header className="h-14 w-full rounded-2xl border border-gray-800 shadow-sm flex items-center gap-2 md:gap-3 px-2 md:px-4 text-gray-200">
        
        {/* Breadcrumbs + Left Sidebar Toggle */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={onMenuClick}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#1E1E1E] 
                       focus:outline-none focus:ring-2 focus:ring-[#D0EA59]"
            aria-label="Toggle left sidebar"
            title="Toggle left sidebar"
          >
            {isLeftOpen ? (
              <MdClose size={20} className="text-white" />
            ) : (
              <img
                src="/assets/Sidebar%20Left.png"
                alt="Left sidebar"
                className="h-6 w-6 invert brightness-0 filter"
              />
            )}
          </button>

          <Link
            to="/"
            className="text-[#D0EA59] font-medium hover:underline hover:text-[#D0EA59]/90"
          >
            Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="capitalize text-gray-300">{pageName}</span>
        </div>

        <div className="flex-1" />

        {/* Search + actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Search box */}
          <div className="relative flex-shrink-0">
            <MdSearch
              size={16}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="h-8 w-56 xl:w-72 rounded-full bg-[#1E1E1E] border border-gray-700 
                         pl-8 pr-10 text-sm text-gray-200 focus:outline-none 
                         focus:ring-2 focus:ring-[#D0EA59]"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
              ⌘K
            </kbd>
          </div>

          {/* Notifications */}
          <button
            className="p-1.5 md:p-2 rounded-lg hover:bg-[#1E1E1E] 
                       focus:outline-none focus:ring-2 focus:ring-[#D0EA59]"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <MdNotificationsNone size={18} className="text-white" />
          </button>

          {/* Right Sidebar Toggle */}
          <button
            onClick={onRightMenuClick}
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#1E1E1E] 
                       focus:outline-none focus:ring-2 focus:ring-[#D0EA59]"
            aria-label="Toggle right sidebar"
            title="Toggle right sidebar"
          >
            {isRightOpen ? (
              <MdClose size={20} className="text-white" />
            ) : (
              <img
                src="/assets/Sidebar%20Right.png"
                alt="Right sidebar"
                className="h-6 w-6 invert brightness-0 filter"
              />
            )}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;






// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

// const Header = ({ onMenuClick }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const pageName =
//     pathname === "/"
//       ? "Default"
//       : pathname
//           .split("/")
//           .filter(Boolean)
//           .pop()
//           ?.replace(/-/g, " ")
//           .replace(/\b\w/g, (c) => c.toUpperCase()) || "Default";

//   return (
//     <div
//       className={`sticky top-0 z-30 px-2 md:px-4 pt-2
//         transition-all duration-200 bg-[#111]`}
//     >
//       <header className="h-14 w-full rounded-2xl border border-gray-800 shadow-sm flex items-center gap-2 md:gap-3 px-2 md:px-4 text-gray-200">
//         {/* Mobile menu */}
//         <button
//           onClick={onMenuClick}
//           className="p-1.5 md:p-2 rounded-lg hover:bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D0EA59] z-40"
//         >
//           <MdMenu size={18} />
//         </button>

//         {/* Breadcrumbs */}
//         <div className="flex items-center gap-1.5 md:gap-2 text-sm flex-shrink-0">
//           <Link
//             to="/"
//             className="text-[#D0EA59] font-medium hover:underline hover:text-[#D0EA59]/90"
//           >
//             Dashboard
//           </Link>
//           <span className="text-gray-400">/</span>
//           <span className="capitalize text-gray-300">{pageName}</span>
//         </div>

//         <div className="flex-1" />

//         {/* Search + actions */}
//         <div className="hidden md:flex items-center gap-2.5">
//           <div className="relative flex-shrink-0">
//             <MdSearch
//               size={16}
//               className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search"
//               className="h-8 w-56 xl:w-72 rounded-full bg-[#1E1E1E] border border-gray-700 pl-8 pr-10 text-sm text-gray-200
//                          focus:outline-none focus:ring-2 focus:ring-[#D0EA59]"
//             />
//             <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
//               ⌘K
//             </kbd>
//           </div>

//           {/* Notifications button */}
//           <button
//             className="p-1.5 md:p-2 rounded-lg hover:bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D0EA59]"
//             onClick={() => navigate("/notifications")}
//             aria-label="Notifications"
//           >
//             <MdNotificationsNone size={18} />
//           </button>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;



// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

// const Header = ({ onMenuClick, onNotificationClick }) => {
//   const { pathname } = useLocation();
//   const pageName =
//     pathname === "/"
//       ? "Default"
//       : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
//         "Default";

//   return (
//     <div className="px-3 md:px-4 pt-3">
//       <header className="h-14 w-full bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 px-3 md:px-4">
//         {/* Mobile menu */}
//         <button
//           onClick={onMenuClick}
//           className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
//         >
//           <MdMenu size={18} />
//         </button>

        // {/* Breadcrumbs */}
        // <div className="flex items-center gap-2 text-sm">
        //   <button
        //     type="button"
        //     className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
        //     aria-label="Toggle left sidebar"
        //     title="Toggle left sidebar"
        //   >
        //     <img
        //       src="/assets/Sidebar%20Left.png"
        //       alt="Left sidebar"
        //       className="h-6 w-6"
//             />
//           </button>
//           {/* Dashboard breadcrumb in lime color */}
//           <Link to="/" className="text-[#D0EA59] font-semibold hover:underline">
//             Dashboard
//           </Link>
//           <span className="text-gray-300">/</span>
//           <span className="text-gray-500 capitalize">{pageName}</span>
//         </div>

//         <div className="flex-1" />

//         {/* Search + actions */}
//         <div className="hidden md:flex items-center gap-3">
//           <div className="relative">
//             <MdSearch
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search"
//               className="h-9 w-60 xl:w-80 rounded-full bg-gray-100 border border-gray-200 pl-9 pr-12 text-sm
//                          focus:outline-none focus:ring-2 focus:ring-[#D0EA59]/50"
//             />
//             <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
//               ⌘K
//             </kbd>
//           </div>

//           <button
//             className="p-2 rounded-lg hover:bg-gray-100"
//             onClick={onNotificationClick}
//             aria-label="Notifications"
//           >
//             <MdNotificationsNone size={18} className="text-gray-600" />
//           </button>
//           <button
//             type="button"
//             className="p-2 rounded-lg hover:bg-gray-100"
//             aria-label="Toggle right sidebar"
//             title="Toggle right sidebar"
//           >
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg">
//               <img
//                 src="/assets/Sidebar%20Right.png"
//                 alt="Right sidebar"
//                 className="h-6 w-6"
//               />
//             </span>
//           </button>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;



// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { MdMenu, MdSearch, MdNotificationsNone } from "react-icons/md";

// const Header = ({ onMenuClick, onNotificationClick }) => {
//   const { pathname } = useLocation();
//   const pageName =
//     pathname === "/"
//       ? "Default"
//       : pathname.split("/").filter(Boolean).pop()?.replace(/-/g, " ") ||
//         "Default";

//   return (
//     <div className="px-3 md:px-4 pt-3">
//       <header className="h-14 w-full bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-3 px-3 md:px-4">
//         {/* Mobile menu */}
//         <button
//           onClick={onMenuClick}
//           className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
//         >
//           <MdMenu size={18} />
//         </button>

//         {/* Breadcrumbs */}
//         <div className="flex items-center gap-2 text-sm">
//           <button
//             type="button"
//             className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100"
//             aria-label="Toggle left sidebar"
//             title="Toggle left sidebar"
//           >
//             {/* If filename has spaces, encode them or rename the file */}
//             <img
//               src="/assets/Sidebar%20Left.png"
//               alt="Left sidebar"
//               className="h-6 w-6"
//             />
//           </button>
//           <Link to="/" className="text-[#856bac] font-medium hover:underline">
//             Dashboard
//           </Link>
//           <span className="text-gray-300">/</span>
//           <span className="text-gray-400 capitalize">{pageName}</span>
//         </div>

//         <div className="flex-1" />

//         {/* Search + actions */}
//         <div className="hidden md:flex items-center gap-3">
//           <div className="relative">
//             <MdSearch
//               size={16}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />
//             <input
//               type="text"
//               placeholder="Search"
//               className="h-9 w-60 xl:w-80 rounded-full bg-gray-100 border border-gray-200 pl-9 pr-12 text-sm
//                          focus:outline-none focus:ring-2 focus:ring-gray-200"
//             />
//             <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
//               ⌘K
//             </kbd>
//           </div>

//           <button
//             className="p-2 rounded-lg hover:bg-gray-100"
//             onClick={onNotificationClick}
//             aria-label="Notifications"
//           >
//             <MdNotificationsNone size={18} />
//           </button>
//           <button
//             type="button"
//             className="p-2 rounded-lg hover:bg-gray-100"
//             aria-label="Toggle right sidebar"
//             title="Toggle right sidebar"
//           >
//             <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg">
//               <img
//                 src="/assets/Sidebar%20Right.png"
//                 alt="Right sidebar"
//                 className="h-6 w-6"
//               />
//             </span>
//           </button>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;
