import React, { useEffect, useState } from "react";
import { FiX, FiMail, FiCheckCircle } from "react-icons/fi";

const statusOpts = ["Open", "In Review", "Resolved"];

export default function ReplyDrawer({ open, onClose, item, onReply }) {
  const [status, setStatus] = useState(item?.status || "Open");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      setStatus(item?.status || "Open");
      setMessage("");
    }
  }, [open, item]);

  if (!item) return null;

  const submit = (e) => {
    e.preventDefault();
    // Hook to API
    onReply?.({
      id: item.id,
      status,
      reply: message.trim(),
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-xl bg-[#0C0F14] ring-1 ring-white/10 shadow-2xl
                    transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Feedback</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-white/5 text-white/80"><FiX size={18} /></button>
        </div>

        <div className="p-4 space-y-4">
          {/* User */}
          <div className="flex items-start gap-3">
            <img src={item.user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <p className="text-white font-medium">{item.user.name}</p>
              <p className="text-sm text-white/70">{item.user.email}</p>
            </div>
            <span className="ml-auto text-xs text-white/60">{item.id}</span>
          </div>

          {/* Meta */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-[#0A0D12] ring-1 ring-white/10 p-3">
              <p className="text-xs text-white/60">Type</p>
              <p className="text-sm text-white font-medium">{item.type}</p>
            </div>
            <div className="rounded-lg bg-[#0A0D12] ring-1 ring-white/10 p-3">
              <p className="text-xs text-white/60">Rating</p>
              <p className="text-sm text-white font-medium">{item.rating} / 5</p>
            </div>
            <div className="rounded-lg bg-[#0A0D12] ring-1 ring-white/10 p-3">
              <p className="text-xs text-white/60">Date</p>
              <p className="text-sm text-white font-medium">{item.date}</p>
            </div>
          </div>

          {/* Subject + message */}
          <div className="rounded-xl bg-[#0A0D12] ring-1 ring-white/10 p-3">
            <p className="text-sm text-white font-semibold">{item.subject}</p>
            <p className="mt-2 text-sm text-white/80 whitespace-pre-line">{item.message}</p>
          </div>

          {/* Reply form */}
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-sm text-white/80">
                Update Status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 w-full h-10 rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#D0EA59]"
                >
                  {statusOpts.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>
            </div>
            <label className="text-sm text-white/80 block">
              Response
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a helpful response…"
                className="mt-1 w-full rounded-lg bg-[#0A0D12] text-white ring-1 ring-white/10 p-3 text-sm outline-none placeholder:text-white/40 focus:ring-2 focus:ring-[#D0EA59]"
              />
            </label>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button type="button" onClick={onClose}
                className="h-10 px-4 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5">
                Close
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="h-10 px-4 rounded-lg text-sm font-semibold bg-[#D0EA59] hover:bg-[#dff481] text-black ring-1 ring-black/10"
              >
                <span className="inline-flex items-center gap-2"><FiMail /> Send & Update</span>
              </button>
              <button
                type="submit"
                onClick={() => setStatus("Resolved")}
                disabled={!message.trim()}
                className="h-10 px-4 rounded-lg text-sm font-semibold bg-[#D0EA59]/20 text-[#D0EA59] ring-1 ring-[#D0EA59]/30 hover:bg-[#D0EA59]/25"
              >
                <span className="inline-flex items-center gap-2"><FiCheckCircle /> Resolve</span>
              </button>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
