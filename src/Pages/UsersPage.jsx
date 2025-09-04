import React, { useMemo, useState } from "react";
import { FiPlus, FiFilter, FiSliders } from "react-icons/fi";
import UserFilters from "../Components/users/UserFilters";
import AddUserDrawer from "../Components/users/AddUserDrawer";
import UserTable from "../Components/users/UserTable";
import { UserData as seed, roles } from "../Data/mockData";

export default function UsersPage() {
  const [rows, setRows] = useState(seed);
  const [checked, setChecked] = useState(new Set());

  // filter state
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState("all");
  const [status, setStatus] = useState("all");
  const [role, setRole] = useState("all");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((r) => {
      const text =
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.userId.toLowerCase().includes(q) ||
        String(r.plan || "").toLowerCase().includes(q) ||
        String(r.amount || "").toLowerCase().includes(q);

      const planOk = plan === "all" || r.plan === plan;
      const statusOk = status === "all" || r.status === status;
      const roleOk = role === "all" || r.role === role;

      return text && planOk && statusOk && roleOk;
    });
  }, [rows, search, plan, status, role]);

  const resetFilters = () => {
    setSearch(""); setPlan("all"); setStatus("all"); setRole("all");
  };

  // Integrate with your API here
  const createUser = async (userPayload) => {
    // Example: await api.post("/users", userPayload)
    setRows((prev) => [{ ...userPayload }, ...prev]);
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 px-3 sm:px-4 py-2.5 flex items-center shadow-md">
        <div className="flex items-center gap-1.5 text-white/80">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-[#dff481] bg-[#D0EA59] text-black  rounded-md flex items-center gap-2"
            title="Add user"
          >
            <FiPlus size={18} /> <span className="hidden sm:inline">Add User</span>
          </button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md" title="Filters">
            <FiFilter size={18} />
          </button>
          <button type="button" className="p-2 hover:bg-white/5 rounded-md" title="More">
            <FiSliders size={18} />
          </button>
        </div>

        <div className="ml-auto">
          <button
            onClick={resetFilters}
            className="h-9 px-3 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5"
          >
            Reset filters
          </button>
        </div>
      </div>

      {/* Filters */}
      <UserFilters
        users={rows}
        search={search} setSearch={setSearch}
        plan={plan} setPlan={setPlan}
        status={status} setStatus={setStatus}
        role={role} setRole={setRole}
      />

      {/* Table */}
      <UserTable rows={filtered} checked={checked} setChecked={setChecked} />

      {/* Drawer */}
      <AddUserDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreate={createUser}
      />
    </div>
  );
}
