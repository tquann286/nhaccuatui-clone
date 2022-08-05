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
      spacing: {
        '8px': '0.8rem',
      }
    },
    fontSize: {
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      md: ['1.8rem', '2.6rem'],
      lg: ['2rem', '2.8rem'],
      xl: ['2.4rem', '3.2rem'],
      '2xl': ['2.8rem', '3.6rem'],
    }
  },
  plugins: [],
}
