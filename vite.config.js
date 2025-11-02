import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Añade esta sección 'test':
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup.js', // <-- ¡Esta es la línea clave!
  },
});