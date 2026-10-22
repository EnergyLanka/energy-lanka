import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0A192F", dark: "#020C1B", light: "#112240" }, // Deep Midnight Blue
        gold: { DEFAULT: "#D4AF37", light: "#F3E5AB" }, // Luxury Gold
        slate: { 50: "#F8FAFC", 100: "#F1F5F9", 800: "#1E293B" }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
