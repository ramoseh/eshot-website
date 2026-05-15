/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        teal:          '#00C8CC',
        magenta:       '#CC00CC',
        lime:          '#C8D400',
        'eshot-green': '#6CBF00',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans:  ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
