/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend:{ backgroundImage: {
      'custom-image': "url('/src/assets/background.png')",
    },
      keyframes: {
      moveAround: {
        '0%, 100%': { transform: 'translate(0, 0)' },
        '25%': { transform: 'translate(10px, -10px)' },
        '50%': { transform: 'translate(-10px, 10px)' },
        '75%': { transform: 'translate(10px, 10px)' },
      },
    },
    animation: {
      moveAround: 'moveAround 5s ease-in-out infinite',
    },
      colors: {
        pallette: {
          1: "#0545c1", 
          2:'#BB4430'
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
