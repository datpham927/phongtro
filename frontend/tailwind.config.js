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
        overlay: "rgba(0, 0, 0, 0.53)",
      },
      boxShadow: {
        custom: " 0 0 10px 1px rgb(0 0 0 / 10%)",
      },
      keyframes: {
        flash: {
          '0%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' },
        },
        openChat: {
          '0%': { transform: 'scale(0)', opacity: "0" },
          '100%': { transform: 'scale(1)', opacity: "1" },
        }, openChatOff: {
          '0%': { transform: 'scale(1)', opacity: "1" },
          '100%': { transform: 'scale(0)', opacity: "0" },
        },
        openBoxChat: {
          '0%': { width: '0px', opacity: "0" },
          '100%': { width: '400px', opacity: "1" },
        }, openBoxChatOff: {
          '0%': { width: '400px', opacity: "1" },
          '100%': { width: '0px', opacity: "0" },
        },
      },
      animation: {
        "active-flash": 'flash 0.6s ease-in-out infinite',
        "active-openChat": 'openChat 0.3s',
        "active-openChatOff": 'openChatOff 0.3s',
        "active-openBoxChat": 'openBoxChat 0.3s',
        "active-openBoxChatOff": 'openBoxChatOff 0.3s'
      },
      boxShadow: {
        search: "rgba(0, 0, 0, 0.28) 0px 6px 12px 0px",
        cart: "rgb(210,223,230) 0px 0px 20px"
      },
      screens: {
        'laptop': { "min": '1024px' },
        'tablet': { "max": '1023px' },
        'mobile': { "max": '739px' }
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}