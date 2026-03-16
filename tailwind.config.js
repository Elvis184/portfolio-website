/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050814",
        navy: "#0A1023",
        electric: "#2D7BFF",
        cyan: "#34E7FF",
        violet: "#8E5BFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        ripple: {
          "0%": {
            transform: "scale(0.92)",
            opacity: "0.55",
          },
          "100%": {
            transform: "scale(1.28)",
            opacity: "0",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.7s ease-out forwards",
        ripple: "ripple 0.9s ease-out infinite",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(58, 130, 255, 0.28), 0 22px 60px -26px rgba(45, 123, 255, 0.8)",
        card: "0 18px 60px -32px rgba(0, 0, 0, 0.95)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
