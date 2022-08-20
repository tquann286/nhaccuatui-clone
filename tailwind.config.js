/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      "mons": "'Montserrat', sans-serif"
    },
    extend: {
      colors: {
        main: '#2daaed',
        disable: 'rgba(28, 30, 32, 0.2)',
        hot: '#F44336',
        yellow: '#FFC40E',
        green: '#95D96D',
      },
      padding: {
        '4px': '0.4rem',
        '6px': '0.6rem',
        '12px': '1.2rem',
        '16px': '1.6rem',
        '18px': '1.8rem',
        '22px': '2.2rem',
        '24px': '2.4rem',
        '32px': '3.2rem',
        '40px': '4rem',
        '54px': '5.4rem',
      },
      margin: {
        unset: 'unset',
        '2px': '0.2rem',
        '4px': '0.4rem',
        '6px': '0.6rem',
        '8px': '0.8rem',
        '9px': '0.9rem',
        '12px': '1.2rem',
        '14px': '1.4rem',
        '16px': '1.6rem',
        '20px': '2rem',
        '24px': '2.4rem',
        '32px': '3.2rem',
        '40px': '4rem',
      },
      spacing: {
        '4px': '0.4rem',
        '8px': '0.8rem',
        '17px': '1.7rem',
        '18px': '1.8rem',
        '20px': '2rem',
        '22px': '2.2rem',
        '24px': '2.4rem',
        '26px': '2.6rem',
        '28px': '2.8rem',
        '32px': '3.2rem',
        '36px': '3.6rem',
        '42px': '4.2rem',
        '48px': '4.8rem',
        '56px': '5.6rem',
        '64px': '6.4rem',
        '72px': '7.2rem',
        '120px': '12rem',
        '144px': '14.4rem',
        '160px': '16rem',
        '240px': '24rem',
      },
      lineHeight: {
        'inherit': 'inherit',
        '18px': '1.8rem',
        '20px': '2rem',
        '22px': '2.2rem',
        '24px': '2.4rem',
        '26px': '2.6rem',
        '32px': '3.2rem',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
      },
      willChange: {
        'height': 'height',
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
      '8px': '0.8rem',
      '13px': '1.3rem',
      '16px': '1.6rem',
    }
  },
  plugins: [
    require('@neojp/tailwindcss-line-clamp-utilities')
],
variants: {
  lineClamp: ['responsive']
}
}
