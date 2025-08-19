// OrderListTable.jsx
import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiFilter,
  FiSliders,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  Checkbox,
  UserCell,
  DateCell,
  StatusPill,
} from "../ui/shared/TablePrimitives";

/* ---- sample rows shaped to the mock ---- */
const baseUser = {
  userId: "#CM9801",
  name: "Natali Craig",
  avatar: "https://i.pravatar.cc/64?img=47",
};

const rowsData = [
  { ...baseUser, type: "Customer", date: "Just now",     status: "In Progress" },
  { ...baseUser, type: "Seller",   date: "A minute ago", status: "Complete"    },
  { ...baseUser, type: "Admin",    date: "1 hour ago",   status: "Pending"     },
  { ...baseUser, type: "Customer", date: "Yesterday",    status: "Approved"    },
  { ...baseUser, type: "Seller",   date: "Feb 2, 2023",  status: "Rejected"    },
  { ...baseUser, type: "Admin",    date: "Just now",     status: "In Progress" },
  { ...baseUser, type: "Customer", date: "A minute ago", status: "Complete"    },
  { ...baseUser, type: "Admin",    date: "1 hour ago",   status: "Pending"     },
  { ...baseUser, type: "Customer", date: "Yesterday",    status: "Approved"    },
  { ...baseUser, type: "Customer", date: "Feb 2, 2023",  status: "Rejected"    },
];

const OrderListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      rowsData.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.type.toLowerCase().includes(search.toLowerCase()) ||
          r.userId.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="rounded-2xl mt-4 bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
      {/* Toolbar */}
      <div className="rounded-2xl bg-[#7C5AC2] px-3 sm:px-4 py-2.5 flex items-center">
        <div className="flex items-center gap-5 text-white/95">
          <button type="button" className="p-2 hover:text-white"><FiPlus size={18} /></button>
          <button type="button" className="p-2 hover:text-white"><FiFilter size={18} /></button>
          <button type="button" className="p-2 hover:text-white"><FiSliders size={18} /></button>
        </div>

        <div className="ml-auto w-52 sm:w-64">
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-[820px] w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b border-gray-200">
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
              <th className="py-3 text-left">User ID</th>
              <th className="py-3 text-left">Users</th>
              <th className="py-3 text-left">Type</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, idx) => {
              const active = checked.has(idx);
              const zebra = idx % 2 === 1;

              return (
                <tr
                  key={`${row.userId}-${idx}`}
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

                  <td className="py-3 text-gray-700">{row.userId}</td>

                  <td className="py-3">
                    <UserCell avatar={row.avatar} name={row.name} />
                  </td>

                  <td className="py-3 text-gray-700">{row.type}</td>

                  <td className="py-3">
                    <DateCell text={row.date} />
                  </td>

                  <td className="py-3">
                    <StatusPill status={row.status} />
                  </td>

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

export default OrderListTable;
