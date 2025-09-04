import React, { useMemo, useRef, useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiCheck } from "react-icons/fi";
import ChipToggle from "./ChipToggle";
import SearchBar from "./SearchBar";

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-white/5 text-white/80 ring-white/10",
    lime: "bg-[#D0EA59]/15 text-[#D0EA59] ring-[#D0EA59]/25",
    sky: "bg-sky-500/15 text-sky-300 ring-sky-500/25",
  };
  return (
    <span
      className={`text-xs inline-flex items-center px-2 py-0.5 rounded-full ring-1 ${
        tones[tone] || tones.neutral
      }`}
    >
      {children}
    </span>
  );
}

export default function UserMultiSelect({
  users = [],
  value = new Set(), // selected userIds
  onChange = () => {},
  initialPlan = "all",
  initialStatus = "all",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [plan, setPlan] = useState(initialPlan);
  const [status, setStatus] = useState(initialStatus);
  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onClick(e) {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const planOptions = useMemo(() => {
    const uniques = Array.from(new Set(users.map((u) => u.plan))).filter(
      Boolean
    );
    return [
      { value: "all", label: "All Plans" },
      ...uniques.map((p) => ({ value: p, label: p })),
    ];
  }, [users]);

  const statusOptions = useMemo(() => {
    const uniques = Array.from(new Set(users.map((u) => u.status))).filter(
      Boolean
    );
    return [
      { value: "all", label: "All Statuses" },
      ...uniques.map((s) => ({ value: s, label: s })),
    ];
  }, [users]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchText =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.userId.toLowerCase().includes(q);
      const matchPlan = plan === "all" || u.plan === plan;
      const matchStatus = status === "all" || u.status === status;
      return matchText && matchPlan && matchStatus;
    });
  }, [users, search, plan, status]);

  const selectedCount = value.size;

  const toggleUser = (id) => {
    const next = new Set(value);
    next.has(id) ? next.delete(id) : next.add(id);
    onChange(next);
  };

  const clearAll = () => onChange(new Set());

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full h-11 rounded-lg px-3 flex items-center justify-between text-sm ring-1 transition
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:ring-white/20"}
          bg-[#0A0D12] text-white ring-white/10`}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <Badge tone="lime">{selectedCount}</Badge>
          {selectedCount > 0 ? "Selected recipients" : "Choose recipients"}
        </span>
        <FiChevronDown className="text-white/60" />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute z-20 mt-2 w-[min(720px,90vw)] rounded-2xl bg-[#0C0F14] ring-1 ring-white/10 shadow-xl p-3"
        >
          {/* Filters */}
          <div className="flex flex-col gap-3 p-2">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <SearchBar value={search} setValue={setSearch} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60 mb-1">Plan</p>
                <ChipToggle
                  options={planOptions}
                  value={plan}
                  onChange={setPlan}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white/60 mb-1">Status</p>
                <ChipToggle
                  options={statusOptions}
                  value={status}
                  onChange={setStatus}
                />
              </div>
            </div>

            {/* Selected summary */}
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>
                Showing <span className="text-white">{filtered.length}</span>{" "}
                users • Selected{" "}
                <span className="text-white">{selectedCount}</span>
              </span>
              {selectedCount > 0 && (
                <button
                  onClick={clearAll}
                  type="button"
                  className="text-[#D0EA59] hover:underline"
                >
                  Clear selection
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <div className="max-h-[320px] overflow-auto rounded-xl ring-1 ring-white/5">
            <ul className="divide-y divide-white/5">
              {filtered.map((u) => {
                const isChecked = value.has(u.userId);
                return (
                  <li
                    key={u.userId}
                    className={`flex items-center gap-3 px-3 py-2.5 bg-transparent hover:bg-white/[0.03]`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleUser(u.userId)}
                      className={`h-5 w-5 rounded grid place-items-center ring-1 transition
                        ${
                          isChecked
                            ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-[#D0EA59]/40"
                            : "text-white/60 ring-white/10"
                        }`}
                      aria-pressed={isChecked}
                    >
                      {isChecked && <FiCheck />}
                    </button>

                    <img
                      src={u.avatar}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white truncate">{u.name}</p>
                        <Badge tone="lime">{u.plan}</Badge>
                        <Badge tone="sky">{u.status}</Badge>
                      </div>
                      <p className="text-xs text-white/60 truncate">
                        {u.email}
                      </p>
                    </div>

                    <span className="text-xs text-white/50">{u.userId}</span>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="p-6 text-center text-sm text-white/60">
                  No users match the current filters.
                </li>
              )}
            </ul>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-2 p-2 mt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-9 px-4 rounded-lg text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/5"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
