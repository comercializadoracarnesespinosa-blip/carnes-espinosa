/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        vino: {
          50: "#FFF1F0",
          100: "#FFE0DE",
          200: "#FFC3BF",
          500: "#FF5A52",
          600: "#F42A1E",
          700: "#E11010",
          800: "#B50E0E",
          900: "#7D0909",
          950: "#330404",
        },
        carbon: "#171311",
        marfil: "#FAF7F3",
        humo: "#E6DDD5",
        arena: "#F4ECE4",
        oro: "#C3A06B",
      },
      boxShadow: {
        premium:
          "0 24px 60px rgba(118, 58, 36, 0.08), 0 10px 24px rgba(31, 17, 11, 0.05)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, rgba(194,154,91,0), rgba(194,154,91,0.72), rgba(194,154,91,0))",
      },
      keyframes: {
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatUp: "floatUp 700ms ease-out both",
      },
    },
  },
  plugins: [],
};
