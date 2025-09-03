// src/Components/ui/shared/Button.jsx
export function Button({ children, className = "", variant = "primary", ...props }) {
const base = "font-satoshi font-medium px-4 py-2 rounded-xl transition shadow-sm";
const variants = {
primary: "bg-brand-primary text-brand-bg hover:bg-brand-primaryDark",
secondary:"bg-transparent text-brand-text border border-brand-primary hover:bg-brand-primary/8",
ghost: "bg-transparent hover:bg-white/5 text-brand-text",
};


return (
<button className={`${base} ${variants[variant]} ${className}`} {...props}>
{children}
</button>
);
}







// import React from "react";

// export function Button({ children, className = "", variant = "primary", ...props }) {
//   const base = "font-satoshi font-medium px-4 py-2 rounded-xl transition shadow-sm";
//   const variants = {
//     primary:  "bg-brand-primary text-white hover:bg-brand-primaryDark",
//     secondary:"bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary/10",
//     ghost:    "bg-transparent hover:bg-black/5 text-brand-text",
//   };

//   return (
//     <button className={`${base} ${variants[variant]} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// }
