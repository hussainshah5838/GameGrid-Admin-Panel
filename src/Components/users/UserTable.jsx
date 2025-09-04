import React from "react";
import { Checkbox, UserCell, DateCell, StatusPill } from "../ui/shared/TablePrimitives";

export default function UserTable({
  rows, checked, setChecked,
}) {
  const allSelected = checked.size === rows.length && rows.length > 0;

  return (
    <div className="rounded-2xl bg-[#0C0F14] shadow-md ring-1 ring-white/10 overflow-hidden text-white">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead>
            <tr className="text-white/70 border-b border-white/10 bg-[#0A0D12]">
              <th className="px-4 py-3 w-10">
                <Checkbox
                  checked={allSelected}
                  onChange={() =>
                    setChecked(allSelected ? new Set() : new Set(rows.map((r) => r.userId)))
                  }
                />
              </th>
              <th className="py-3 text-left">User ID</th>
              <th className="py-3 text-left">User</th>
              <th className="py-3 text-left hidden lg:table-cell">Email</th>
              <th className="py-3 text-left">Plan</th>
              <th className="py-3 text-left hidden md:table-cell">Amount</th>
              <th className="py-3 text-left">Status</th>
              <th className="py-3 text-left hidden xl:table-cell">Date</th>
              <th className="py-3 text-left hidden md:table-cell">Join Date</th>
              <th className="py-3 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, idx) => {
              const active = checked.has(row.userId);
              return (
                <tr
                  key={row.userId}
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
                        v ? next.add(row.userId) : next.delete(row.userId);
                        setChecked(next);
                      }}
                    />
                  </td>

                  <td className="py-3 text-white">{row.userId}</td>
                  <td className="py-3"><UserCell avatar={row.avatar} name={row.name} /></td>
                  <td className="py-3 text-white/80 hidden lg:table-cell">{row.email}</td>
                  <td className="py-3 text-white">{row.plan}</td>
                  <td className="py-3 text-white/80 hidden md:table-cell">{row.amount}</td>
                  <td className="py-3"><StatusPill status={row.status} /></td>
                  <td className="py-3 hidden xl:table-cell"><DateCell text={row.date} /></td>
                  <td className="py-3 text-white/80 hidden md:table-cell">{row.joinDate}</td>
                  <td className="py-3 text-white/80">{row.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
