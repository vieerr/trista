import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import i18n from "./i18n.service";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
await import("invoices_mf/invoices_css");
createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(router)
  .use(i18n)
  .use(VueQueryPlugin)
  // .use(ToastService)
  .mount("#app");
