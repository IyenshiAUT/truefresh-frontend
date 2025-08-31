// File: postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- This is the crucial change
    autoprefixer: {},
  },
}