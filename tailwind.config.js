/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#06070a",
        surface: "#0b0d12",
        panel: "rgba(255,255,255,0.06)",
        line: "rgba(255,255,255,0.09)",
        brand: "#ff7a18",
        brandSoft: "#ff9f5a",
        ink: "#f5f7fb",
        muted: "#94a3b8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,122,24,0.24), 0 18px 60px rgba(255,122,24,0.18)",
        panel: "0 10px 40px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        float: "float 9s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.45, transform: "scale(1)" },
          "50%": { opacity: 0.9, transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
