import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
// import App from "./App.vue";

let routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   component: App,
  // },
];

try {
  const Invoices = await import("invoices_mf/InvoicesRoutes");
    console.log(Invoices);
  if (Invoices && Invoices.default && Invoices.default) {
    routes = [...routes, ...(await Invoices.default)];
    console.log(routes);
  }
} catch (error) {
  console.error(error);
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
