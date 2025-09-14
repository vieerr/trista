import './main.css'
import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { i18n } from './i18n'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(i18n)
  .use(VueQueryPlugin)
  .mount('#app')
