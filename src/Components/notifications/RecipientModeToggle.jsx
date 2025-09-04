import React from "react";

export default function RecipientModeToggle({ mode, onChange }) {
  const opts = [
    { key: "all", label: "All users" },
    { key: "specific", label: "Specific users" },
  ];

  return (
    <div className="inline-flex rounded-xl ring-1 ring-white/10 p-1 bg-[#0A0D12]">
      {opts.map((o) => {
        const active = mode === o.key;
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            className={`px-4 h-9 rounded-lg text-sm font-medium transition ${
              active ? "bg-[#D0EA59]/20 text-[#D0EA59]" : "text-white/80 hover:bg-white/5"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
