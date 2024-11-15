/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#225F78',
        secondary: '#CE9E19',
        white: {
          DEFAULT: '#fff',
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533',
        },
        gray: {
          100: '#f7f7f7',
          300: '#a5a5a5',
          500: '#8e8e8e',
        },
        unavailable: '#cccccc',
      },
      fontFamily: {
        rthin: ['Roboto-Thin', 'sans-serif'],
        rlight: ['Roboto-Light', 'sans-serif'],
        rregular: ['Roboto-Regular', 'sans-serif'],
        rmedium: ['Roboto-Medium', 'sans-serif'],
        rbold: ['Roboto-Bold', 'sans-serif'],
        rblack: ['Roboto-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
