/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.jsx",
    "./main.jsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ferraz-red': '#E30613',
      },
    },
  },
  plugins: [],
}
