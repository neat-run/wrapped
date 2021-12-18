const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./index.html",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      gray: colors.neutral,
      white: colors.white,
      black: colors.black,
      green: colors.green,
      yellow: colors.amber,
      purple: colors.purple,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.red,
      orange: colors.orange,
    },
    fontFamily: {
      mono: ["mister-pixel"],
    },
    extend: {
      animation: {
        "pulse-slow": "halfPulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        halfPulse: {
          "0%": { opacity: 1 },
          "50%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
};
