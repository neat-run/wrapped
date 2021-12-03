const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      gray: colors.gray,
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
      mono: ["Space\\ Mono"],
    },
    extend: {
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
