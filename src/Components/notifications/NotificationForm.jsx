import React, { useMemo, useState } from "react";
import RecipientModeToggle from "./RecipientModeToggle";
import UserMultiSelect from "./UserMultiSelect";

export default function NotificationForm({ users = [], onSubmit }) {
  const [mode, setMode] = useState("all"); // 'all' | 'specific'
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState(new Set()); // userIds
  const [planFilterForAll, setPlanFilterForAll] = useState("all");
  const [statusFilterForAll, setStatusFilterForAll] = useState("all");

  // Count preview when mode = all (filters applied)
  const allTargetCount = useMemo(() => {
    return users.filter(u => {
      const planOk = planFilterForAll === "all" || u.plan === planFilterForAll;
      const statusOk = statusFilterForAll === "all" || u.status === statusFilterForAll;
      return planOk && statusOk;
    }).length;
  }, [users, planFilterForAll, statusFilterForAll]);

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      mode,
      title: title.trim(),
      message: message.trim(),
      filters: mode === "all" ? { plan: planFilterForAll, status: statusFilterForAll } : {},
      recipients: mode === "specific" ? Array.from(selected) : [],
      // you can add: scheduledAt, deepLinkUrl, etc.
    };
    if (!payload.title || !payload.message) return alert("Please fill title and message.");
    if (mode === "specific" && payload.recipients.length === 0)
      return alert("Please select at least one recipient.");
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Mode + preview */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-white/90">Send to</label>
        <RecipientModeToggle mode={mode} onChange={setMode} />
        {mode === "all" ? (
          <p className="text-xs text-white/60">
            This will notify{" "}
            <span className="text-[#D0EA59] font-medium">{allTargetCount}</span>{" "}
            users based on the filters below.
          </p>
        ) : (
          <p className="text-xs text-white/60">
            Choose individual recipients with search + filters.
          </p>
        )}
      </div>

      {/* Filters / Recipient select */}
      {mode === "all" ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm text-white/70">Plan filter</label>
            <UserMultiSelect
              users={users}
              disabled
              // re-using the chip UI for consistency by rendering the disabled dropdown
            />
            <div className="mt-2 flex gap-3">
              {/* Simple select inputs for All mode */}
              <select
                value={planFilterForAll}
                onChange={(e) => setPlanFilterForAll(e.target.value)}
                className="h-10 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
              >
                <option value="all">All Plans</option>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="Free">Free</option>
              </select>
              <select
                value={statusFilterForAll}
                onChange={(e) => setStatusFilterForAll(e.target.value)}
                className="h-10 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <label className="text-sm text-white/70">Recipients</label>
          <UserMultiSelect users={users} value={selected} onChange={setSelected} />
        </div>
      )}

      {/* Content */}
      <div className="grid gap-3">
        <input
          type="text"
          placeholder="Notification title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-11 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
        />
        <textarea
          placeholder="Notification message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 p-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
        />
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            setTitle(""); setMessage(""); setSelected(new Set());
            setPlanFilterForAll("all"); setStatusFilterForAll("all");
          }}
          className="h-10 px-4 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5"
        >
          Reset
        </button>
        <button
          type="submit"
          className="h-10 px-5 rounded-lg text-sm font-semibold bg-[#D0EA59]/20 text-[#D0EA59] ring-1 ring-[#D0EA59]/30 hover:bg-[#D0EA59]/25 transition"
        >
          Send Notification
        </button>
      </div>
    </form>
  );
}
