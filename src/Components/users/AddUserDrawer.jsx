import React, { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { roles as roleOptions } from "../../Data/mockData";

/** Slide-over Drawer with basic validation and easy integration hooks */
export default function AddUserDrawer({ open, onClose, onCreate }) {
  const panelRef = useRef(null);
  const [form, setForm] = useState({
    name: "", email: "", role: "Customer", plan: "Free", status: "Active",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) setForm({ name: "", email: "", role: "Customer", plan: "Free", status: "Active" });
  }, [open]);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e?.preventDefault?.();
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true);
    try {
      // Hook your API/DB create call here. Example payload:
      const payload = {
        ...form,
        userId: crypto.randomUUID().slice(0,8).toUpperCase(), // dummy id
        joinDate: new Date().toISOString().slice(0,10),
        amount: form.plan === "Premium" ? "$99/month" : form.plan === "Standard" ? "$29/month" : "$0",
        avatar: "https://i.pravatar.cc/64?img=1",
        subscription: form.plan,
        date: "Just now",
      };
      await onCreate?.(payload);
      onClose?.();
    } finally { setSubmitting(false); }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        ref={panelRef}
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#0C0F14] ring-1 ring-white/10 shadow-2xl
                    transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Add User</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-white/5 text-white/80"><FiX size={18} /></button>
        </div>

        <form onSubmit={submit} className="p-4 space-y-4">
          <div className="grid gap-3">
            <label className="text-sm text-white/80">
              Name
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
                required
              />
            </label>
            <label className="text-sm text-white/80">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="text-sm text-white/80">
              Role
              <select
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
              >
                {roleOptions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>

            <label className="text-sm text-white/80">
              Plan
              <select
                value={form.plan}
                onChange={(e) => update("plan", e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
              >
                <option>Free</option>
                <option>Standard</option>
                <option>Premium</option>
              </select>
            </label>

            <label className="text-sm text-white/80">
              Status
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
              >
                <option>Active</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>In Progress</option>
              </select>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="h-10 px-4 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" disabled={submitting || !form.name || !form.email}
              className="h-10 px-5 rounded-lg text-sm font-semibold bg-[#D0EA59]/20 text-[#D0EA59] ring-1 ring-[#D0EA59]/30 hover:bg-[#D0EA59]/25 disabled:opacity-50">
              {submitting ? "Saving…" : "Create User"}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
