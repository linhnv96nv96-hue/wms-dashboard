import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative asset paths work on Vercel, Netlify and GitHub Pages project URLs.
  base: './',
  plugins: [react()],
})
