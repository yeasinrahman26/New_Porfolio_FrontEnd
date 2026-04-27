import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: "var(--muted)",
        surface: "var(--surface)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
};

export default config;
