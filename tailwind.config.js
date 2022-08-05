/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#2daaed',
      },
      padding: {
        '12px': '1.2rem',
        '16px': '1.6rem',
        '32px': '3.2rem',
      },
      margin: {
        '16px': '1.6rem',
      },
      spacing: {
        '8px': '0.8rem',
      }
    },
    fontSize: {
      xs: ['1.2rem', '1.6rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      md: ['1.8rem', '2.6rem'],
      lg: ['2rem', '2.8rem'],
      xl: ['2.4rem', '3.2rem'],
      '2xl': ['2.8rem', '3.6rem'],
      '3xl': ['3.2rem', '4rem'],
    }
  },
  plugins: [],
}
