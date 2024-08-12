import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'mongodb+srv://museartra:umLVasv3TsTdfOkC@arta.lxbab.mongodb.net/'

    },
  },
  plugins: [react()],
});
