/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
    },
    screens: {
      xl: {max: "1200px"},
      lg: {max: "1080px"},
      "md-lg": {max: "991px"},
      md: {max: "768px"},
      sm: {max: "576px"},
      xs: {max: "480px"},
      "2xs": {max: "340px"},
    },
  },
  plugins: [],
};
