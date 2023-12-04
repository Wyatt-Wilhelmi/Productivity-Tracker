/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: ["./index.html",
            "./post.js"],
  theme: {
    screens:{
      'sm': '526px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        'Lato': ['Lato']
      }
    },
  },
  plugins: [],
}

