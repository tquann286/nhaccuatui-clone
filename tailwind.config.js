/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#2daaed',
      },
      padding: {
        '16px': '1.6rem',
      },
      margin: {
        '16px': '1.6rem',
      },
      text: {
        '14px': '1.4rem',
      },
    },
  },
  plugins: [],
}
