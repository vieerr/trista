import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
// import App from "./App.vue";

let routes: RouteRecordRaw[] = [

];

try {
  const Invoices = await import("invoices_mf/InvoicesRoutes");
  console.log(Invoices);
  if (Invoices && Invoices.default) {
    const prefixedRoutes = (await Invoices.default).map((route: RouteRecordRaw) => ({
      ...route,
      path: `/invoices${route.path}`,
    }));
    routes = [...routes, ...prefixedRoutes];
    console.log(routes);
  }
} catch (error) {
  console.error(error);
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
