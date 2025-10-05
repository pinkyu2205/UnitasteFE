import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // tuỳ bạn, mặc định là 5173
    historyApiFallback: true, // ⚡ Quan trọng: fix lỗi 404 khi reload ở React Router
  },
})
