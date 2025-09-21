import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    federation({
      name: 'producs_mf',
      exposes: {
        './ProductsTableView': './src/views/ProductsTableView.vue',
        './ProductsFormView': './src/views/ProductsFormView.vue',
        './ProductsRoutes': './src/router/routes.ts',
        './products_css': './src/products.styles.js',
        './ProductsI18n': './src/i18n.ts',
      },
      shared: ['vue', 'vue-router', 'primevue', 'tailwindcss', 'pinia', '@tanstack/vue-query'],
    }),
  ],
  server: {
    port: 5175,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
