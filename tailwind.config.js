/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': 'rgba(0, 0, 0, 0.4)',
        'O': 'rgba(138, 0, 255, 0.44)',
        'B': 'rgba(0, 85, 255, 0.26)',
        'A': 'rgba(0, 0, 0, 0.03)',
        'F': 'rgba(255, 255, 0, 0.23)',
        'G': 'rgba(255, 255, 0, 0.56)',
        'K': 'rgba(255, 168, 0, 0.56)',
        'M': 'rgba(255, 34, 0, 0.56)'
      }
    },
  },
  plugins: [],
}
