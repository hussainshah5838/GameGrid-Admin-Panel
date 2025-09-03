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

// Sample payments data
const payments = [
  { id: "TXN1001", name: "Ali Khan", email: "ali.khan@example.com", amount: "$120.00", method: "Credit Card", status: "Approved", date: "2023-08-01", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "TXN1002", name: "Sara Malik", email: "sara.malik@example.com", amount: "$85.50", method: "PayPal", status: "Pending", date: "2023-08-03", avatar: "https://i.pravatar.cc/64?img=33" },
  { id: "TXN1003", name: "Hamza Yousaf", email: "hamza.yousaf@example.com", amount: "$250.00", method: "Bank Transfer", status: "Cancel", date: "2023-08-05", avatar: "https://i.pravatar.cc/64?img=23" },
  { id: "TXN1004", name: "Ayesha Tariq", email: "ayesha.tariq@example.com", amount: "$60.00", method: "Credit Card", status: "Active", date: "2023-08-06", avatar: "https://i.pravatar.cc/64?img=41" },
  { id: "TXN1005", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", amount: "$99.00", method: "Stripe", status: "In Progress", date: "2023-08-07", avatar: "https://i.pravatar.cc/64?img=56" },
];

// Payment stats
const totalPayments = payments.length;
const approvedPayments = payments.filter(p => p.status === "Approved").length;
const pendingPayments = payments.filter(p => p.status === "Pending").length;
const cancelPayments = payments.filter(p => p.status === "Cancel").length;

// subtle accent tokens
const accent = {
  lime:    { dot: "bg-[#D0EA59]",   text: "text-[#D0EA59]",   bg: "bg-[#D0EA59]/10" },
  green:   { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-400/10" },
  amber:   { dot: "bg-amber-400",   text: "text-amber-400",   bg: "bg-amber-400/10" },
  rose:    { dot: "bg-rose-400",    text: "text-rose-400",    bg: "bg-rose-400/10" },
};

const StatCard = ({ label, value, tone = "lime" }) => {
  const a = accent[tone] || accent.lime;
  return (
    <div className="rounded-2xl p-4 flex flex-col bg-[#0C0F14] ring-1 ring-white/10 shadow-md hover:ring-white/15 transition">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <span className="text-sm font-medium text-white/80">{label}</span>
      </div>
      <span className="mt-2 text-2xl font-semibold text-white">{value}</span>
    </div>
  );
};

const PaymentListTable = () => {
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(() => new Set());

  const filtered = useMemo(
    () =>
      payments.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.email.toLowerCase().includes(search.toLowerCase()) ||
          p.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      {/* Overview / Payment Stats */}
      <h2 className="text-lg font-semibold text-white">Payment Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Payments" value={totalPayments} tone="lime" />
        <StatCard label="Approved"       value={approvedPayments} tone="green" />
        <StatCard label="Pending"        value={pendingPayments} tone="amber" />
        <StatCard label="Cancel"         value={cancelPayments} tone="rose" />
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-2.5 flex items-center shadow-md">
        <div className="flex items-center gap-1.5 text-white/80">
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiPlus size={18} /></button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiFilter size={18} /></button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md"><FiSliders size={18} /></button>
        </div>

        <div className="ml-auto w-52 sm:w-64">
          <div className="relative">
            <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payments"
              className="h-9 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 pl-9 pr-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0C0F14] shadow-md ring-1 ring-white/10 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead>
              <tr className="text-white/70 border-b border-white/10">
                <th className="px-4 py-3 w-10">
                  <Checkbox
                    checked={allSelected}
                    onChange={() =>
                      setChecked(allSelected ? new Set() : new Set(filtered.map((_, i) => i)))
                    }
                  />
                </th>
                <th className="py-3 text-left">Transaction ID</th>
                <th className="py-3 text-left">User</th>
                <th className="py-3 text-left">Email</th>
                <th className="py-3 text-left">Amount</th>
                <th className="py-3 text-left">Method</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, idx) => {
                const active = checked.has(idx);
                return (
                  <tr
                    key={p.id}
                    className={`
                      ${active ? "bg-white/[0.06]" : "odd:bg-white/[0.02] even:bg-transparent"}
                      hover:bg-white/[0.04] border-b border-white/5 transition
                    `}
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

                    <td className="py-3 text-white">{p.id}</td>
                    <td className="py-3">
                      <UserCell avatar={p.avatar} name={p.name} />
                    </td>
                    <td className="py-3 text-white/80">{p.email}</td>
                    <td className="py-3 text-white/80">{p.amount}</td>
                    <td className="py-3 text-white/80">{p.method}</td>
                    <td className="py-3">
                      <StatusPill status={p.status} />
                    </td>
                    <td className="py-3">
                      <DateCell text={p.date} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-1 p-3 border-t border-white/10">
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-white/80">
            <FiChevronLeft />
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`h-8 w-8 rounded-md text-sm transition
                ${n === 1
                  ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-1 ring-[#D0EA59]/30"
                  : "text-white/80 hover:bg-white/5 ring-1 ring-white/10"
                }`}
            >
              {n}
            </button>
          ))}
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-white/5 text-white/80">
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentListTable;
