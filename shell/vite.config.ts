import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        child: "http://localhost:4174/assets/remoteEntry.js", // Adjust port
      },
      shared: ["vue"], // Share Vue to avoid duplication
    }),
  ],
  server: {
    port: 5173, // Shell port
  },
  build: {
    target: "esnext", // Required for Module Federation
  },
});
