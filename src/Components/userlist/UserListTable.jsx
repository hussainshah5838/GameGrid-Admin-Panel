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

// Sample rows with new fields added
const rowsData = [
  {
    userId: "#CM9801",
    name: "Natali Craig",
    avatar: "https://i.pravatar.cc/64?img=47",
    email: "natali.craig@example.com",
    date: "2023-01-15",
    status: "Active",
    subscription: "Premium",
    plan: "Premium",              // NEW
    amount: "$99/month",          // NEW
    joinDate: "2023-01-15",
  },
  {
    userId: "#CM9802",
    name: "Ali Khan",
    avatar: "https://i.pravatar.cc/64?img=12",
    email: "ali.khan@example.com",
    date: "A minute ago",
    status: "Pending",
    subscription: "Standard",
    plan: "Standard",             // NEW
    amount: "$29/month",          // NEW
    joinDate: "2023-05-12",
  },
  {
    userId: "#CM9803",
    name: "Sophia Lee",
    avatar: "https://i.pravatar.cc/64?img=32",
    email: "sophia.lee@example.com",
    date: "1 hour ago",
    status: "Approved",
    subscription: "Free",
    plan: "Free",                 // NEW
    amount: "$0",                 // NEW
    joinDate: "2023-06-20",
  },
  {
    userId: "#CM9804",
    name: "David Chen",
    avatar: "https://i.pravatar.cc/64?img=5",
    email: "david.chen@example.com",
    date: "Yesterday",
    status: "Approved",
    subscription: "Premium",
    plan: "Premium",              // NEW
    amount: "$99/month",          // NEW
    joinDate: "2023-02-10",
  },
  {
    userId: "#CM9805",
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/64?img=45",
    email: "emma.watson@example.com",
    date: "Feb 2, 2023",
    status: "In Progress",
    subscription: "Standard",
    plan: "Standard",             // NEW
    amount: "$29/month",          // NEW
    joinDate: "2023-04-14",
  },
  {
    userId: "#CM9806",
    name: "Mohammed Rizwan",
    avatar: "https://i.pravatar.cc/64?img=23",
    email: "rizwan.m@example.com",
    date: "Just now",
    status: "Active",
    subscription: "Premium",
    plan: "Premium",              // NEW
    amount: "$99/month",          // NEW
    joinDate: "2023-03-18",
  },
];

const UserListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      rowsData.filter((r) => {
        const q = search.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.userId.toLowerCase().includes(q) ||
          String(r.plan || "").toLowerCase().includes(q) ||
          String(r.amount || "").toLowerCase().includes(q)
        );
      }),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-2xl bg-[#D0EA59] px-3 sm:px-4 py-2.5 flex items-center">
        <div className="flex items-center gap-5 text-black font-medium">
          <button type="button" className="p-2 hover:text-gray-700">
            <FiPlus size={18} />
          </button>
          <button type="button" className="p-2 hover:text-gray-700">
            <FiFilter size={18} />
          </button>
          <button type="button" className="p-2 hover:text-gray-700">
            <FiSliders size={18} />
          </button>
        </div>

        <div className="ml-auto w-48 sm:w-64">
          <div className="relative">
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users, plan, amount…"
              className="h-9 w-full rounded-lg bg-[#111] ring-1 ring-gray-700 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 text-white focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Mobile (cards) */}
      <ul className="md:hidden space-y-3">
        <li className="px-3 text-xs text-gray-400">Showing {filtered.length} users</li>
        {filtered.map((r, idx) => {
          const active = checked.has(r.userId);
          return (
            <li
              key={r.userId}
              className={`rounded-2xl ring-1 ring-gray-800 bg-[#111] text-white p-3 ${
                active ? "outline outline-2 outline-[#D0EA59]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={active}
                  onChange={(v) => {
                    const next = new Set(checked);
                    v ? next.add(r.userId) : next.delete(r.userId);
                    setChecked(next);
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{r.userId}</span>
                    <StatusPill status={r.status} />
                  </div>
                  <div className="mt-1">
                    <UserCell avatar={r.avatar} name={r.name} />
                    <p className="text-xs text-gray-300 mt-1">{r.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div className="rounded-lg bg-[#151515] p-2">
                      <p className="text-gray-400 text-xs">Plan</p>
                      <p className="font-medium">{r.plan}</p>
                    </div>
                    <div className="rounded-lg bg-[#151515] p-2">
                      <p className="text-gray-400 text-xs">Amount</p>
                      <p className="font-medium">{r.amount}</p>
                    </div>
                    <div className="rounded-lg bg-[#151515] p-2">
                      <p className="text-gray-400 text-xs">Joined</p>
                      <p className="font-medium">{r.joinDate}</p>
                    </div>
                    <div className="rounded-lg bg-[#151515] p-2">
                      <p className="text-gray-400 text-xs">Date</p>
                      <DateCell text={r.date} />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Desktop (table) */}
      <div className="rounded-2xl bg-[#111] shadow-sm ring-1 ring-gray-800 overflow-hidden text-white hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full text-sm">
            <thead>
              <tr className="text-gray-300 border-b border-gray-700">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onChange={() =>
                      setChecked(allSelected ? new Set() : new Set(filtered.map((r) => r.userId)))
                    }
                  />
                </th>
                <th className="py-3 text-left">User ID</th>
                <th className="py-3 text-left">User</th>
                <th className="py-3 text-left hidden lg:table-cell">Email</th>
                <th className="py-3 text-left">Plan</th>         {/* NEW */}
                <th className="py-3 text-left hidden md:table-cell">Amount</th> {/* NEW */}
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left hidden xl:table-cell">Date</th>
                <th className="py-3 text-left hidden md:table-cell">Join Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row, idx) => {
                const active = checked.has(row.userId);
                const zebra = idx % 2 === 1;

                return (
                  <tr
                    key={row.userId}
                    className={`${
                      active ? "bg-[#1E1E1E]" : zebra ? "bg-[#151515]" : "bg-[#111]"
                    } hover:bg-[#1E1E1E] border-b border-gray-800 transition-colors`}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={active}
                        onChange={(v) => {
                          const next = new Set(checked);
                          v ? next.add(row.userId) : next.delete(row.userId);
                          setChecked(next);
                        }}
                      />
                    </td>

                    <td className="py-3">{row.userId}</td>
                    <td className="py-3">
                      <UserCell avatar={row.avatar} name={row.name} />
                    </td>
                    <td className="py-3 text-gray-300 hidden lg:table-cell">{row.email}</td>
                    <td className="py-3 text-gray-200">{row.plan}</td>
                    <td className="py-3 text-gray-300 hidden md:table-cell">{row.amount}</td>
                    <td className="py-3">
                      <StatusPill status={row.status} />
                    </td>
                    <td className="py-3 hidden xl:table-cell">
                      <DateCell text={row.date} />
                    </td>
                    <td className="py-3 text-gray-300 hidden md:table-cell">{row.joinDate}</td>
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
              className={`h-8 w-8 rounded-md text-sm ${
                n === 1
                  ? "bg-[#D0EA59] text-black font-semibold"
                  : "bg-[#111] text-white ring-1 ring-gray-700 hover:bg-gray-800"
              }`}
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

export default UserListTable;
