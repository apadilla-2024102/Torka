import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // El visor 3D (Three.js, ~540 kB) es un paquete aparte que solo se
    // descarga al abrir la ficha de un modelo; no afecta la portada.
    chunkSizeWarningLimit: 600,
  },
})
