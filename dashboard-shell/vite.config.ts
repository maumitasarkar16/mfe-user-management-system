import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        remoteUserList: 'http://localhost:5001/assets/remoteEntry.js', // remote app
        remoteUserDetails: 'http://localhost:5002/assets/remoteEntry.js', // remote app
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
  server: {
    port: 5000,
  },
  build: {
    target: 'esnext',
  },
})
