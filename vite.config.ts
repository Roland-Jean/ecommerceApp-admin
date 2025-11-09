import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to your repository name for GitHub Pages only in production
  base: process.env.GITHUB_PAGES === 'true' ? '/ecommerceApp-admin/' : '/',
  define: {
    // Expose GITHUB_PAGES flag to the app
    'import.meta.env.VITE_GITHUB_PAGES': JSON.stringify(process.env.GITHUB_PAGES === 'true')
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router'],
          'refine-vendor': ['@refinedev/core', '@refinedev/antd'],
          'antd-vendor': ['antd', '@ant-design/icons'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})