/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle .5s ease-in-out infinite',
      },
      boxShadow: {
        'b': '0 4px 2px -2px rgba(0, 0, 0, 0.1)',
      }
    },
    fontFamily: {
      'sans': ["Noto Sans"]
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}
