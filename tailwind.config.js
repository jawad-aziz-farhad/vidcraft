/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#161622',
        secondary: {
          DEFAULT: '#FF9C01',
          100: '#FF9001',
          200: '#FF8E01'
        },
        black: {
          DEFAULT: '#000',
          100: '#1E1E2D',
          200: '#232533'
        },
        gray: {
          100: '#CDCDE0'
        }
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sens-serif"],
        pregular: ["Poppins-Regular", "sens-serif"],
        pmedium: ["Poppins-Medium", "sens-serif"],
        psemibold: ["Poppins-SemiBold", "sens-serif"],
        pbold: ["Poppins-Bold", "sens-serif"],
        pextrabold: ["Poppins-ExtraBold", "sens-serif"],
        pblack: ["Poppins-Black", "sens-serif"]
      }
    },
  },
  plugins: [],
}