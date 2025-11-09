import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteUserList',
      filename: 'remoteEntry.js',
      exposes: {
        './UserList': './src/components/UserList.tsx',
      },
      shared: ['react', 'react-dom', 'antd'],
    }),
  ],
  server: {
    port: 5001,
    cors: true
  },
  build: {
    target: 'esnext',
  },
})
