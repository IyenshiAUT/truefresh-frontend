// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-green': {
          light: '#65D375',
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
        },
        'brand-blue': {
          light: '#64B5F6',
          DEFAULT: '#2196F3',
          dark: '#1976D2',
        },
        'neutral': {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
    },
  },
  plugins: [],
}