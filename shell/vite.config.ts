import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite"
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [
      vue(),
      tailwindcss(),
      federation({
        name: "shell",
        filename: "remoteEntry.js",
        remotes: {
          invoices_mf: isProduction
            ? "https://trista-invoices.vercel.app/assets/remoteEntry.js"
            : "http://localhost:4174/assets/remoteEntry.js",
          products_mf: isProduction 
            ? "https://trista-products.vercel.app/assets/remoteEntry.js"
            : "http://localhost:4175/assets/remoteEntry.js",
          },
        shared: ["vue", "@tanstack/vue-query", "vue-router"],
      }),
    ],
    server: {
      port: 5173, // Shell port
    },
    build: {
      target: "esnext", // Required for Module Federation
    },
  };
});
