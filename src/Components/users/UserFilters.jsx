import React from "react";
import SearchBar from "../ui/shared/SearchBar";
import ChipGroup from "../ui/shared/ChipGroup";

const makeOptions = (labelAll, uniques) => [
  { value: "all", label: labelAll },
  ...uniques.map((v) => ({ value: v, label: v })),
];

export default function UserFilters({
  users,
  search,
  setSearch,
  plan,
  setPlan,
  status,
  setStatus,
  role,
  setRole,
}) {
  const plans = Array.from(new Set(users.map((u) => u.plan))).filter(Boolean);
  const statuses = Array.from(new Set(users.map((u) => u.status))).filter(
    Boolean
  );
  const roles = Array.from(new Set(users.map((u) => u.role))).filter(Boolean);

  return (
    <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-3 shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
          <div>
            <p className="text-xs text-white/60 mb-1">Plan</p>
            <ChipGroup
              options={makeOptions("All", plans)}
              value={plan}
              onChange={setPlan}
            />
          </div>
          <div>
            <p className="text-xs text-white/60 mb-1">Status</p>
            <ChipGroup
              options={makeOptions("All", statuses)}
              value={status}
              onChange={setStatus}
            />
          </div>
          <div>
            <p className="text-xs text-white/60 mb-1">Role</p>
            <ChipGroup
              options={makeOptions("All", roles)}
              value={role}
              onChange={setRole}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
