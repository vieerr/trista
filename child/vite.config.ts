import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "child",
      filename: "remoteEntry.js",
      exposes: {
        "./Main": "./src/App.vue", // Expose components
      },
      shared: ["vue"],
    }),
  ],
  server: {
    port: 5174, // Child port
    headers: {
      "Access-Control-Allow-Origin": "*", // Enable cross-origin access
    },
  },
  build: {
    target: "esnext",
  },
});
