/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // Add if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',
        secondary: {
          100: '#E0E7FF',
          500: '#6366F1',
          900: '#312E81',
        },
        background: '#F9FAFB',
      },
    },
  },
  plugins: [],
};