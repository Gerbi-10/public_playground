import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The browser never calls an LLM provider directly. All AI traffic goes
// through /api/* which is proxied to the backend container that holds the key.
const apiTarget = process.env.API_PROXY_TARGET || 'http://localhost:8787'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
      },
    },
  },
})
