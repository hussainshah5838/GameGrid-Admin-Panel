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

/* ---------------------------------------
   Sample payments (same as yours)
--------------------------------------- */
const payments = [
  { id: "TXN1001", name: "Ali Khan",    email: "ali.khan@example.com",    amount: "$120.00", method: "Credit Card",  status: "Approved",    date: "2023-08-01", avatar: "https://i.pravatar.cc/64?img=12" },
  { id: "TXN1002", name: "Sara Malik",  email: "sara.malik@example.com",  amount: "$85.50",  method: "PayPal",       status: "Pending",     date: "2023-08-03", avatar: "https://i.pravatar.cc/64?img=33" },
  { id: "TXN1003", name: "Hamza Yousaf",email: "hamza.yousaf@example.com",amount: "$250.00", method: "Bank Transfer",status: "Cancel",      date: "2023-08-05", avatar: "https://i.pravatar.cc/64?img=23" },
  { id: "TXN1004", name: "Ayesha Tariq",email: "ayesha.tariq@example.com",amount: "$60.00",  method: "Credit Card",  status: "Active",       date: "2023-08-06", avatar: "https://i.pravatar.cc/64?img=41" },
  { id: "TXN1005", name: "Bilal Ahmed", email: "bilal.ahmed@example.com", amount: "$99.00",  method: "Stripe",       status: "In Progress",  date: "2023-08-07", avatar: "https://i.pravatar.cc/64?img=56" },
];

/* ---------------------------------------
   Money utilities (swap currency easily)
--------------------------------------- */
const parseMoneyToCents = (str) =>
  Math.round((Number(String(str).replace(/[^0-9.]/g, "")) || 0) * 100);

const formatMoney = (cents, currency = "USD", locale = "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format((cents || 0) / 100);

/* ---------------------------------------
   Accent tokens
--------------------------------------- */
const accent = {
  lime:   { dot: "bg-[#D0EA59]",  text: "text-[#D0EA59]" },
  green:  { dot: "bg-emerald-400",text: "text-emerald-400" },
  amber:  { dot: "bg-amber-400",  text: "text-amber-400" },
  sky:    { dot: "bg-sky-400",    text: "text-sky-400" },
  rose:   { dot: "bg-rose-400",   text: "text-rose-400" },
};

const StatCard = ({ label, value, hint, tone = "lime" }) => {
  const a = accent[tone] || accent.lime;
  return (
    <div className="rounded-2xl p-4 bg-[#0C0F14] ring-1 ring-white/10 shadow-md hover:ring-white/15 transition">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
        <span className="text-sm font-medium text-white/80">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {hint ? <div className={`mt-1 text-xs ${a.text}`}>{hint}</div> : null}
    </div>
  );
};

/* ---------------------------------------
   Component
--------------------------------------- */
const PaymentListTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [checked, setChecked] = useState(() => new Set());

  /* ------- derived amounts ------- */
  const totals = useMemo(() => {
    const toCents = (p) => parseMoneyToCents(p.amount);

    const gross = payments.reduce((s, p) => s + toCents(p), 0); // all rows
    const collected = payments
      .filter((p) => ["Approved", "Active"].includes(p.status))
      .reduce((s, p) => s + toCents(p), 0);
    const pending = payments
      .filter((p) => ["Pending", "In Progress"].includes(p.status))
      .reduce((s, p) => s + toCents(p), 0);
    const canceled = payments
      .filter((p) => ["Cancel", "Refunded"].includes(p.status))
      .reduce((s, p) => s + toCents(p), 0);

    // Estimated fees (Stripe-like): 2.9% + $0.30 per txn on collected only
    const feePct = 0.029;
    const feeFixed = 30; // cents
    const collectedCount = payments.filter((p) =>
      ["Approved", "Active"].includes(p.status)
    ).length;
    const estFees = Math.round(collected * feePct + collectedCount * feeFixed);

    const net = collected - estFees;

    return {
      count: payments.length,
      gross,
      collected,
      pending,
      canceled,
      estFees,
      net,
    };
  }, []);

  /* ------- filters, search, list ------- */
  const methods = useMemo(
    () => ["all", ...Array.from(new Set(payments.map((p) => p.method)))],
    []
  );
  const statuses = useMemo(
    () => ["all", ...Array.from(new Set(payments.map((p) => p.status)))],
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return payments.filter((p) => {
      const t =
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q);
      const mOk = methodFilter === "all" || p.method === methodFilter;
      const sOk = statusFilter === "all" || p.status === statusFilter;
      return t && mOk && sOk;
    });
  }, [search, methodFilter, statusFilter]);

  const allSelected = checked.size === filtered.length && filtered.length > 0;

  return (
    <div className="space-y-6">
      {/* Overview / Payment Stats */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Payment Overview</h2>
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setMethodFilter("all");
            setStatusFilter("all");
          }}
          className="h-9 px-3 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5"
        >
          Reset
        </button>
      </div>

      {/* Cards row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Payments"
          value={totals.count}
          hint="All transactions"
          tone="lime"
        />
        <StatCard
          label="Gross Volume"
          value={formatMoney(totals.gross)}
          hint="Sum of all amounts"
          tone="green"
        />
        <StatCard
          label="Collected Revenue"
          value={formatMoney(totals.collected)}
          hint="Approved + Active"
          tone="sky"
        />
        <StatCard
          label="Pending Amount"
          value={formatMoney(totals.pending)}
          hint="Pending + In Progress"
          tone="amber"
        />
      </div>

      {/* Cards row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Canceled/Refunded"
          value={formatMoney(totals.canceled)}
          hint="Not collected"
          tone="rose"
        />
        <StatCard
          label="Estimated Fees"
          value={formatMoney(totals.estFees)}
          hint="2.9% + $0.30/txn (collected)"
          tone="amber"
        />
        <StatCard
          label="Net Revenue (Est.)"
          value={formatMoney(totals.net)}
          hint="Collected − Fees"
          tone="green"
        />
      </div>

      {/* Toolbar */}
      <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-2.5 flex items-center shadow-md">
        <div className="flex items-center gap-1.5 text-white/80">
          <button type="button" className="p-2 hover:bg-white/5 rounded-md" title="Add">
            <FiPlus size={18} />
          </button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md" title="Filters">
            <FiFilter size={18} />
          </button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md" title="More">
            <FiSliders size={18} />
          </button>
        </div>

        {/* search */}
        <div className="ml-auto w-52 sm:w-64">
          <div className="flex items-center h-9 rounded-lg bg-[#0A0D12] ring-1 ring-white/10 px-2
                          transition focus-within:ring-2 focus-within:ring-[#D0EA59] hover:ring-white/20">
            <FiSearch size={16} className="mr-2 text-white/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payments"
              className="flex-1 h-full bg-transparent text-white placeholder:text-white/40 text-sm outline-none caret-[#D0EA59]"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="ml-1 px-1.5 py-0.5 rounded-md text-white/60 hover:text-white hover:bg-white/5"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {/* Method */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Method:</span>
          <div className="flex flex-wrap gap-2">
            {methods.map((m) => {
              const active = methodFilter === m;
              return (
                <button
                  key={m}
                  onClick={() => setMethodFilter(m)}
                  className={`px-3 h-8 rounded-full text-sm ring-1 transition
                    ${active ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-[#D0EA59]/40"
                             : "text-white/80 ring-white/10 hover:bg-white/5"}`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60">Status:</span>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => {
              const active = statusFilter === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 h-8 rounded-full text-sm ring-1 transition
                    ${active ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-[#D0EA59]/40"
                             : "text-white/80 ring-white/10 hover:bg-white/5"}`}
                >
                  {s}
                </button>
              );
            })}
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
                    <td className="py-3"><UserCell avatar={p.avatar} name={p.name} /></td>
                    <td className="py-3 text-white/80">{p.email}</td>
                    <td className="py-3 text-white/80">{p.amount}</td>
                    <td className="py-3 text-white/80">{p.method}</td>
                    <td className="py-3"><StatusPill status={p.status} /></td>
                    <td className="py-3"><DateCell text={p.date} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination (static demo) */}
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
