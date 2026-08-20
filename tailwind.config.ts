import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0A0A0A",
        light: "#F5F3EE",
        muted: "#A3A3A3",
        catBlue: "#2E5EFF",
        catRed: "#E63946",
        catYellow: "#F4C430",
        catPurple: "#7B2CBF",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Anton", "Archivo Black", "sans-serif"],
        serif: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        sans: ["var(--font-lora)", "Lora", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
