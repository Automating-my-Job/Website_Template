import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  safelist: [
    "md:col-span-2",
    "md:col-span-4",
    "md:row-span-1",
    "md:row-span-2",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        surface: {
          DEFAULT: "#FAFAFA",
          100: "#F4F6F9",
          200: "#E9ECF1",
        },
        edge: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
        },
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#334155",
          tertiary: "#64748B",
          quaternary: "#94A3B8",
        },
        accent: {
          DEFAULT: "#2563EB",
          light: "#EFF6FF",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        // Consumed by the global `* { @apply border-border }` reset in globals.css
        border: "hsl(var(--border))",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": [
          "clamp(3.5rem, 8vw, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "500" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "0.75rem",
        cardLg: "1rem",
      },
      boxShadow: {
        zen: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        zenMd:
          "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
        zenLg:
          "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05)",
        "accent-glow":
          "0 0 0 1px rgba(37,99,235,0.3), 0 8px 30px -8px rgba(37,99,235,0.4)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
