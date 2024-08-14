/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        pallette: {
          1: "#0545c1", //text
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
