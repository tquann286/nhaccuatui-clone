/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#2daaed',
        disable: 'rgba(28, 30, 32, 0.2)',
        hot: '#F44336'
      },
      padding: {
        '6px': '0.6rem',
        '12px': '1.2rem',
        '16px': '1.6rem',
        '32px': '3.2rem',
        '40px': '4rem',
      },
      margin: {
        '8px': '0.8rem',
        '12px': '1.2rem',
        '14px': '1.4rem',
        '16px': '1.6rem',
        '20px': '2rem',
        '24px': '2.4rem',
        '32px': '3.2rem',
        '40px': '4rem',
      },
      spacing: {
        '8px': '0.8rem',
        '20px': '2rem',
        '22px': '2.2rem',
        '26px': '2.6rem',
        '32px': '3.2rem',
        '48px': '4.8rem',
        '56px': '5.6rem',
      },
      lineHeight: {
        'inherit': 'inherit',
        '20px': '2rem',
        '22px': '2.2rem',
        '26px': '2.6rem',
        '32px': '3.2rem',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
    fontSize: {
      '10px': ['1rem', '1.4rem'],
      xs: ['1.2rem', '1.6rem'],
      '13px': ['1.3rem', '1.8rem'],
      sm: ['1.4rem', '2rem'],
      base: ['1.6rem', '2.4rem'],
      md: ['1.8rem', '2.6rem'],
      lg: ['2rem', '2.8rem'],
      '22px': ['2.2rem', '3rem'],
      xl: ['2.4rem', '3.2rem'],
      '2xl': ['2.8rem', '3.6rem'],
      '3xl': ['3.2rem', '4rem'],
    },
    borderRadius: {
      '50%': '50%',
      'circle': '9999px',
      '2px': '0.2rem',
      '4px': '0.4rem',
      '13px': '1.3rem',
      '16px': '1.6rem',
    }
  },
  plugins: [],
}
