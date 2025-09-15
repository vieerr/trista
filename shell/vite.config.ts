import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        invoices_mf: "http://localhost:4174/assets/remoteEntry.js", // Adjust port
        // invoices_mf: "http://localhost:4175/assets/remoteEntry.js", // Adjust port
      },
      shared:["vue"]
    }),
  ],
  server: {
    port: 5173, // Shell port
  },
  build: {
    target: "esnext", // Required for Module Federation
  },
});
