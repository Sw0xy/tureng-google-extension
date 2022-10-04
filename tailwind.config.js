/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,tsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "#34B27B",
        bg: "#1C1C1C",
        light_gray: "#2E2E2E",
        dark_gray: "#232323",
      },
    },
  },
  plugins: [],
};
