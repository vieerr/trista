import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

let routes: RouteRecordRaw[] = [];

try {
  const Dashboard = await import("dashboard_mf/DashboardRoutes");
  if (Dashboard && Dashboard.default) {
    const prefixedRoutes = (await Dashboard.default).map(
      (route: RouteRecordRaw) => ({
        ...route,
        path: `${route.path}`,
      })
    );
    routes = [...routes, ...prefixedRoutes];
  }
} catch (error) {
  console.error(error);
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
});