import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

   build: {
    chunkSizeWarningLimit: 1500, // Увеличиваем лимит, чтобы не видеть предупреждений
    rollupOptions: {
      output: {
        // Упрощенное разделение: всё из node_modules в один файл vendor
        manualChunks: {
          vendor: ['react'],
        },
      },
    },
  },
  base: '/compshop/'
})
  