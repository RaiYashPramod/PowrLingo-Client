/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-light': '#DBDBDB',
        'gray-dark': '#616163',
      },
      fontFamily: {
        "mono-bold": ['AzeretMonoBlackItalic', 'monospace'],
        'mono-regular': ['AzeretMonoRegular', 'monospace'],
      }
    },
  },
  plugins: [],
}