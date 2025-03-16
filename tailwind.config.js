/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arvo: ["Arvo", "serif"]
      },
    },
  },
  variants: {
    extend: {
      borderColor: ['focus'], // Ensure focus variant is enabled for borderColor
    },
  },
  plugins: [],
}

