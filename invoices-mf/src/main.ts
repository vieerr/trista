import './main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { i18n } from './i18n'
import { router } from './router/router'
import { ToastService } from 'primevue'
import { AVPlugin } from 'vue-audio-visual'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: '.darktheme',
        cssLayer: false,
      },
    },
  })
  .use(i18n)
  .use(router)
  .use(ToastService)
  .use(VueQueryPlugin)
  .use(AVPlugin)
  .mount('#app')
