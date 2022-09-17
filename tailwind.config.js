/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': 'rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
