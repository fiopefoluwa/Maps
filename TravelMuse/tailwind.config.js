/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        customOrange: 'rgb(239, 236, 60)', 
      },
    },
  },
  plugins: [],
}

