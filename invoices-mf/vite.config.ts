import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'invoices_mf',
      filename: 'remoteEntry.js',
      exposes: {
        './Invoices': './src/App.vue',
        './InvoicesTableView': './src/views/TableView.vue',
        './TestComponent': './src/components/TestComponent.vue',
        './InvoicesForm': './src/components/InvoicesForm/InvoicesForm.vue',
        './InvoicesRoutes': './src/router/routes.ts',
        './InvoicesI18n': './src/i18n.ts',
        './invoices_css': './src/invoices.styles.js',
      },
      shared: ['vue', 'vue-router', 'primevue', 'tailwindcss'],
    }),
    tailwindcss(),
    vueDevTools(),
  ],
  server: {
    port: 5174,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    // target: 'esnext',
    // minify: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
