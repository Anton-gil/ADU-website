import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "adu-black": "#0a0a0a",
        "adu-gold": "#D4AF37",
        "bright-gold": "#FFD700",
        "carbon": "#1a1a1a",
      },
    },
  },
  plugins: [],
};
export default config;
