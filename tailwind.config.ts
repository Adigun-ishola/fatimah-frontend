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
        primary: {
          DEFAULT: "#1a365d",
          light: "#2a4a7f",
          dark: "#0f2440",
        },
        accent: {
          DEFAULT: "#c9a84c",
          light: "#dfc06e",
          dark: "#a88a2e",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        body: ["Lora", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;