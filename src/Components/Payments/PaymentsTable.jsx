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

/* ----------------------------- Sample data ----------------------------- */
const baseUser = {
  name: "Natali Craig",
  avatar: "https://i.pravatar.cc/64?img=47",
};

const rowsData = [
  { id: "#CM9801", user: baseUser, order: "Jordans 1s",   date: "Just now",     status: "In Progress" },
  { id: "#CM9801", user: baseUser, order: "Campus",       date: "A minute ago", status: "Complete"    },
  { id: "#CM9801", user: baseUser, order: "Track Suit",   date: "1 hour ago",   status: "Pending"     },
  { id: "#CM9801", user: baseUser, order: "Work Boots",   date: "Yesterday",    status: "Approved"    },
  { id: "#CM9801", user: baseUser, order: "a7iii",        date: "Feb 2, 2023",  status: "Rejected"    },
  { id: "#CM9801", user: baseUser, order: "Air Force 1",  date: "Just now",     status: "In Progress" },
  { id: "#CM9801", user: baseUser, order: "Campus",       date: "A minute ago", status: "Complete"    },
  { id: "#CM9801", user: baseUser, order: "Track Suit",   date: "1 hour ago",   status: "Pending"     },
  { id: "#CM9801", user: baseUser, order: "Work Boots",   date: "Yesterday",    status: "Approved"    },
  { id: "#CM9801", user: baseUser, order: "a7iii",        date: "Feb 2, 2023",  status: "Rejected"    },
];

/* ----------------------------- Payments Table ----------------------------- */
const PaymentsTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set()); 

  const rows = useMemo(
    () =>
      rowsData.filter(
        (r) =>
          r.id.toLowerCase().includes(search.toLowerCase()) ||
          r.user.name.toLowerCase().includes(search.toLowerCase()) ||
          r.order.toLowerCase().includes(search.toLowerCase()) ||
          r.status.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === rows.length && rows.length > 0;

  const toggleAll = () => {
    if (allSelected) setChecked(new Set());
    else setChecked(new Set(rows.map((_, i) => i)));
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="rounded-2xl bg-[#7C5AC2] px-3 sm:px-4 py-2.5 flex items-center">
        <div className="flex items-center gap-5 text-white/95">
          <button type="button" className="p-2 hover:text-white"><FiPlus size={18} /></button>
          <button type="button" className="p-2 hover:text-white"><FiFilter size={18} /></button>
          <button type="button" className="p-2 hover:text-white"><FiSliders size={18} /></button>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {/* Select All / Clear pill (works for *all selected*) */}
          <button
            type="button"
            onClick={toggleAll}
            className="hidden sm:inline-flex h-8 pl-3 pr-3 rounded-full bg-white text-gray-700 text-sm shadow-sm items-center gap-2"
            title={allSelected ? "Clear selection" : "Select all"}
          >
            {allSelected ? "Clear Selection" : "Select All"}
            {checked.size > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#7C5AC2] text-white text-[11px] px-1">
                {checked.size}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="w-52 sm:w-64">
            <div className="relative">
              <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="h-9 w-full rounded-lg bg-white/95 ring-1 ring-white/60 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-white/80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* keep a minimum width so the layout matches on small screens */}
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
              <th className="px-4 py-3 w-10">
                <Checkbox checked={allSelected} onChange={toggleAll} />
              </th>
              <th className="py-3 text-left">Order ID</th>
              <th className="py-3 text-left">Users</th>
              <th className="py-3 text-left">Order</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, idx) => {
              const active = checked.has(idx);
              const zebra = idx % 2 === 1;

              return (
                <tr
                  key={`${r.id}-${idx}`}
                  className={`${active ? "bg-[#F6F2FF]" : zebra ? "bg-gray-50/70" : "bg-white"} border-b border-gray-100`}
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

                  <td className="py-3 text-gray-700">{r.id}</td>
                  <td className="py-3"><UserCell {...r.user} /></td>
                  <td className="py-3 text-gray-700">{r.order}</td>
                  <td className="py-3"><DateCell text={r.date} /></td>
                  <td className="py-3"><StatusPill status={r.status} /></td>

                  <td className="py-3">
                    <button className="text-[#7C5AC2] hover:underline font-medium">
                      View More
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-1 p-3">
        <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100">
          <FiChevronLeft />
        </button>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            className={`h-8 w-8 rounded-md text-sm ${
              n === 1 ? "bg-gray-900 text-white" : "bg-white ring-1 ring-gray-300"
            }`}
          >
            {n}
          </button>
        ))}
        <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-gray-100">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PaymentsTable;
