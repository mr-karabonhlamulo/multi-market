import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path: '/' for Vercel, '/multi-market/' for GitHub Pages
const base = process.env.VITE_BASE_URL || '/'

// https://vitejs.dev/config/
export default defineConfig({
    base,
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    preview: {
        port: 4173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    }
})
