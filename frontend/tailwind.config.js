/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e0233',
        secondary: '#342d50',
        accent: '#895575',
        light: '#e7d3cc',
      }
    },
  },
  plugins: [],
}
