import React from "react";
import { FiChevronRight } from "react-icons/fi";

const toneByType = {
  Bug: "bg-rose-400/15 text-rose-300 ring-rose-400/25",
  Feature: "bg-sky-400/15 text-sky-300 ring-sky-400/25",
  Praise: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
};

const toneByStatus = {
  Open: "bg-amber-400/15 text-amber-300 ring-amber-400/25",
  "In Review": "bg-indigo-400/15 text-indigo-300 ring-indigo-400/25",
  Resolved: "bg-[#D0EA59]/15 text-[#D0EA59] ring-[#D0EA59]/25",
};

function Pill({ children, tone = "bg-white/5 text-white/80 ring-white/10" }) {
  return <span className={`text-xs px-2 py-0.5 rounded-full ring-1 ${tone}`}>{children}</span>;
}

export default function FeedbackTable({ rows = [], onOpen }) {
  return (
    <div className="rounded-2xl bg-[#0C0F14] shadow-md ring-1 ring-white/10 overflow-hidden text-white">
      <div className="overflow-x-auto">
        <table className="min-w-[950px] w-full text-sm">
          <thead>
            <tr className="text-white/70 border-b border-white/10 bg-[#0A0D12]">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="py-3 text-left">User</th>
              <th className="py-3 text-left">Subject</th>
              <th className="py-3 text-left">Type</th>
              <th className="py-3 text-left">Rating</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left">Date</th>
              <th className="py-3 text-right pr-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                className={`${
                  idx % 2 ? "bg-white/[0.02]" : "bg-transparent"
                } hover:bg-white/[0.04] border-b border-white/5 transition`}
              >
                <td className="px-4 py-3">{r.id}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <img src={r.user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <p className="text-white">{r.user.name}</p>
                      <p className="text-xs text-white/60">{r.user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-white/90">{r.subject}</td>
                <td className="py-3"><Pill tone={toneByType[r.type]}>{r.type}</Pill></td>
                <td className="py-3 text-white/80">{r.rating} / 5</td>
                <td className="py-3"><Pill tone={toneByStatus[r.status]}>{r.status}</Pill></td>
                <td className="py-3 text-white/70">{r.date}</td>
                <td className="py-3 pr-4 text-right">
                  <button
                    onClick={() => onOpen?.(r)}
                    className="inline-flex items-center gap-1 h-8 px-3 rounded-lg text-sm
                               bg-[#D0EA59] hover:bg-[#dff481] text-black ring-1 ring-black/10"
                  >
                    Open <FiChevronRight />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-white/60">No feedback matches your filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
