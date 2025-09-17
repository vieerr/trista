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
  const Products = await import("products_mf/ProductsRoutes");

  if (Products && Products.default) {
    const prefixedRoutes = (await Products.default).map((route: RouteRecordRaw) => ({
      ...route,
      path: `/products${route.path}`,
    }));
    routes = [...routes, ...prefixedRoutes];
  }
  if (Invoices && Invoices.default) {
    const prefixedRoutes = (await Invoices.default).map((route: RouteRecordRaw) => ({
      ...route,
      path: `/invoices${route.path}`,
    }));
    routes = [...routes, ...prefixedRoutes];
  }
} catch (error) {
  console.error(error);
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
