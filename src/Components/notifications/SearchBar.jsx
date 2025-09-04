import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({
  value,
  setValue,
  placeholder = "Search by name, email, or ID…",
  className = "",
}) {
  return (
    <div
      className={
        "flex items-center h-10 rounded-lg bg-[#0A0D12] ring-1 ring-white/10 px-2 " +
        "transition focus-within:ring-2 focus-within:ring-[#D0EA59] hover:ring-white/20 " +
        "shadow-sm " + className
      }
    >
      <FiSearch
        size={16}
        className="mr-2 text-white/50 group-focus-within:text-[#D0EA59]"
        aria-hidden="true"
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 h-full bg-transparent text-white placeholder:text-white/40 text-sm outline-none caret-[#D0EA59]"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setValue("")}
          className="ml-1 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/5"
        >
          <FiX size={14} />
        </button>
      ) : null}
    </div>
  );
}
