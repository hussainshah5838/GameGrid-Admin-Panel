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
  { id: "TCK1001", name: "Ali Khan",    email: "ali.khan@example.com",    subject: "Unable to login to account",     priority: "High",   status: "Open",        date: "2023-08-01", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "TCK1002", name: "Sara Malik",  email: "sara.malik@example.com",  subject: "Payment not processed",          priority: "Urgent", status: "In Progress", date: "2023-08-02", avatar: "https://i.pravatar.cc/64?img=33" },
  { id: "TCK1003", name: "Hamza Yousaf",email: "hamza.yousaf@example.com",subject: "App crashes on startup",         priority: "Medium", status: "Resolved",    date: "2023-08-03", avatar: "https://i.pravatar.cc/64?img=23" },
  { id: "TCK1004", name: "Ayesha Tariq",email: "ayesha.tariq@example.com",subject: "Request for account deletion",    priority: "Low",    status: "Closed",      date: "2023-08-05", avatar: "https://i.pravatar.cc/64?img=41" },
  { id: "TCK1005", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", subject: "Refund request for subscription", priority: "High",   status: "Open",        date: "2023-08-06", avatar: "https://i.pravatar.cc/64?img=56" },
];

/* Priority badge with soft accents */
const PriorityBadge = ({ level }) => {
  const map = {
    Low:    "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20",
    Medium: "bg-amber-500/15  text-amber-300  ring-1 ring-amber-500/20",
    High:   "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/20",
    Urgent: "bg-rose-500/15   text-rose-300   ring-1 ring-rose-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${map[level] || ""}`}>
      {level}
    </span>
  );
};

// Ticket stats
const totalTickets     = tickets.length;
const openTickets      = tickets.filter(t => t.status === "Open").length;
const inProgressTickets= tickets.filter(t => t.status === "In Progress").length;
const closedTickets    = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;

/* Subtle stat card */
const accents = {
  lime:   { dot: "bg-[#D0EA59]" },
  green:  { dot: "bg-emerald-400" },
  amber:  { dot: "bg-amber-400" },
  sky:    { dot: "bg-sky-400" },
};
const StatCard = ({ label, value, tone = "lime" }) => {
  const a = accents[tone] || accents.lime;
  return (
    <div className="rounded-2xl p-4 flex flex-col bg-[#0C0F14] ring-1 ring-white/10 shadow-md hover:ring-white/15 hover:shadow-lg transition">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <span className="text-sm font-medium text-white/80">{label}</span>
      </div>
      <span className="mt-2 text-2xl font-semibold text-white">{value}</span>
    </div>
  );
};

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
        <StatCard label="Total Tickets"      value={totalTickets}      tone="lime" />
        <StatCard label="Resolved / Closed"  value={closedTickets}     tone="green" />
        <StatCard label="In Progress"        value={inProgressTickets} tone="amber" />
        <StatCard label="Open"               value={openTickets}       tone="sky" />
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
              placeholder="Search tickets"
              className="h-9 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 pl-9 pr-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0C0F14] shadow-md ring-1 ring-white/10 overflow-hidden text-white">
        <div className="overflow-x-auto">
          <table className="min-w-[950px] w-full text-sm">
            <thead>
              <tr className="text-white/70 border-b border-white/10 bg-[#0A0D12]">
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
                return (
                  <tr
                    key={t.id}
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

                    <td className="py-3 text-white">{t.id}</td>
                    <td className="py-3"><UserCell avatar={t.avatar} name={t.name} /></td>
                    <td className="py-3 text-white/80">{t.email}</td>
                    <td className="py-3 text-white/80">{t.subject}</td>
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

export default TicketListTable;
