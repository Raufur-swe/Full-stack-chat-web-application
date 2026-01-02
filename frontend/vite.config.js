import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import daisyui from 'daisyui'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),daisyui()],
  server:{
    host:"0.0.0.0",
    port:3000
  }
})
