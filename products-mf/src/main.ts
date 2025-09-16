import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { i18n } from './i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

app
  .use(router)
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
  .use(VueQueryPlugin)
  .use(i18n)
  .use(router)

app.mount('#app')
