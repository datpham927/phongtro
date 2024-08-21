/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#f5f5f5",
        "red-custom": "#f73859",
        "blue-custom": "#1266dd",
        secondary: "#65676b",
      },
      boxShadow: {
        custom: " 0 0 10px 1px rgb(0 0 0 / 10%)",
      },
    },
  },
  plugins: [],
}