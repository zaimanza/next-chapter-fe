/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'dancing-script': '"Dancing Script",system-ui',
      'cinzel': '"Cinzel",system-ui',
      'cormorant_garamond': '"Cormorant Garamond",system-ui',
      'ibarra_real_nova': '"Ibarra Real Nova",system-ui',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
