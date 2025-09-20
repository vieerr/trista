import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'dashboard_mf',
      exposes: {
        './DashboardView': './src/App.vue',
        './DashboardRoutes': './src/router/routes.ts',
        './dashboard_css': './src/dashboard.styles.js',
        // './ProductsI18n': './src/i18n.ts',
      },
      shared: ['vue', 'vue-router', 'tailwindcss'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
