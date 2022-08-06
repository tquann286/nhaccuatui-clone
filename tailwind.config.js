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
        '8px': '0.8rem',
        '12px': '1.2rem',
        '14px': '1.4rem',
        '16px': '1.6rem',
        '24px': '2.4rem',
        '32px': '3.2rem',
      },
      spacing: {
        '8px': '0.8rem',
        '20px': '2rem',
        '32px': '3.2rem',
        '56px': '5.6rem',
      },
      lineHeight: {
        '20px': '2rem',
        '32px': '3.2rem',
      }
    },
    fontSize: {
      xs: ['1.2rem', '1.6rem'],
      '13px': ['1.3rem', '1.8rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      md: ['1.8rem', '2.6rem'],
      lg: ['2rem', '2.8rem'],
      xl: ['2.4rem', '3.2rem'],
      '2xl': ['2.8rem', '3.6rem'],
      '3xl': ['3.2rem', '4rem'],
    },
    borderRadius: {
      '50%': '50%',
      'circle': '9999px',
      '2px': '0.2rem',
      '4px': '0.4rem',
      '16px': '1.6rem',
    }
  },
  plugins: [],
}
