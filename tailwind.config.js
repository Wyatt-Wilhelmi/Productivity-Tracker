/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./index.html"],
  theme: {
    screens:{
      'sm': '526px'
    },
    extend: {
      fontFamily: {
        'Lato': ['Lato']
      }
    },
  },
  plugins: [],
}

