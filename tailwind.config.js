export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E63946',
        secondary: '#2A9D8F',
        neutral: {
          900: '#0F1115',
          800: '#1B1F28',
          100: '#F1FAEE'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif']
      }
    }
  },
  plugins: []
};