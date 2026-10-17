/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        rule: "var(--rule)",
        signal: "var(--signal)",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Variable"', "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
