import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import i18n from "./i18n.service";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
try {
  await import("invoices_mf/invoices_css");
  await import("products_mf/products_css");
} catch (error) {
  console.error("Error loading microfrontends CSS:", error);
}
createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: ".darktheme",
        cssLayer: false,
      },
    },
  })
  .use(router)
  .use(i18n)
  .use(VueQueryPlugin)
  .mount("#app");
