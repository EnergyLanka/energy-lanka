import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0e7c66", dark: "#075e4d", light: "#e6f5f1" },
      },
    },
  },
  plugins: [],
} satisfies Config;
