/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Ключи с дефисом всегда пишем в кавычках
        'alumni': ['"Alumni Sans"', 'sans-serif'],
        'alumni-italic': ['"Alumni Sans Italic"', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'slifted': ['"Slifted"', 'sans-serif']
      },
    },
  },
  plugins: [],
}