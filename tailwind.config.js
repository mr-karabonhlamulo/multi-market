/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Dark Mode (Now Greenleaf Dark)
        royal: {
          900: '#022c22', // Dark teal-green
          800: '#064e3b',
          700: '#065f46',
          accent: '#10b981', // Emerald green glowing accent
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
        // Override indigo to green/teal for Greenleaf brand
        indigo: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
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
