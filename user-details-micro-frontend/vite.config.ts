import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteUserDetails',
      filename: 'remoteEntry.js',
      exposes: {
        './UserDetails': './src/components/UserDetails.tsx',
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
  server: {
    port: 5002,
  },
  build: {
    target: 'esnext',
  },
})
