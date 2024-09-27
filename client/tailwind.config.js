/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f4f6fb",
          100: "#e8ecf6",
          200: "#cbd8ec",
          300: "#9db7dc",
          400: "#6991c7",
          500: "#4673b1",
          600: "#345a95",
          700: "#2b4879",
          800: "#273e65",
          900: "#253655",
          950: "#172135",
        },
      },
    },
  },
  plugins: [],
};
