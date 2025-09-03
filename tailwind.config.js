// tailwind.config.js (excerpt)
module.exports = {
content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
theme: {
extend: {
fontFamily: { satoshi: ["Satoshi", "sans-serif"] },
colors: {
brand: {
primary: "#D0EA59", // buttons / accents
primaryDark: "#B7D24A", // hover / active
bg: "#111111", // page background
text: "#FFFFFF", // primary text / headings
surface: "#141414" // cards / panels (subtle lift)
}
}
}
},
plugins: [],
};










// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         satoshi: ["Satoshi", "sans-serif"],
//       },
//       colors: {
//         brand: {
//           primary: "#1E40AF",     // main blue
//           primaryDark: "#1E3A8A", // hover/darker
//           secondary: "#9333EA",   // accent purple
//           bg: "#F9FAFB",          // app background
//           text:"#111827",        // default text
//         },
//       },
//     },
//   },
//   plugins: [],
// };
