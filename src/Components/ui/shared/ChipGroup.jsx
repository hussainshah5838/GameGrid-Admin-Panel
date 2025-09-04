import React from "react";

export default function ChipGroup({ options = [], value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 h-8 rounded-full text-sm transition ring-1
              ${active ? "bg-[#D0EA59]/20 text-[#D0EA59] ring-[#D0EA59]/40"
                       : "text-white/80 ring-white/10 hover:bg-white/5"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
