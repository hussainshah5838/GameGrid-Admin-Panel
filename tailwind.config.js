// tailwind.config.js (excerpt)
module.exports = {
  darkMode: ["class"], // keep switch option
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          950: "var(--brand-950)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        info: "var(--info)",
        live: "var(--live)",
        upcoming: "var(--upcoming)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,.35)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};
