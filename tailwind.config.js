/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        oi: ['Oi', 'serif'],
        roboto: ['"Roboto Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

