/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Dark Mode
        royal: {
          900: '#0f172a', // Midnight blue
          800: '#1e293b',
          700: '#334155',
          accent: '#6366f1', // Indigo glowing accent
        },
        // Comfort Nude Mode
        nude: {
          50: '#fafaf9',
          100: '#f5f5f4', // Warm bone
          200: '#e7e5e4',
          300: '#d6d3d1', // Beige
          400: '#a8a29e',
          900: '#44403c', // Warm dark
        },
        glass: {
            white: 'rgba(255, 255, 255, 0.1)',
            black: 'rgba(0, 0, 0, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Premium font
        serif: ['Playfair Display', 'serif'], // Luxurious feel
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
