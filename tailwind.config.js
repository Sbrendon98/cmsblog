/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const fancy = require("tailwindcss-plugin-fancy")
const shadow = require("tailwindcss-textshadow")
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      textShadow: {
        'date': "1px 1px 1px #ffffff"
      },
      fontFamily: {
        "Train": [ 'Train One', 'cursive'],
       "Old": ['Old Standard TT', 'serif']
      },
      width: {
        "1415":"1415px",
        "1390":"1390px",
        "1309":"1309px",
        "1087":"1087px",
        "395":"395px",
        "382":"382px",
      },
      height: {
        "1357":"1357px",
        "652": "652px",
        "473":"473px",
        "382":"382px",
        "283":"283px",
        "670":"670px",
        "985":"985px",
        "87":"87px",
        "1":"1px"
      },
      colors: {
      "mainBackground": "#282828",
      "placeholderURL": "#d9d9d9",
      "slidesColor": "#ffc6b5",
    },
    margin: {
      "400":"400px"
    }
    },
  },
  plugins: [fancy, shadow],
}
