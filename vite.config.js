import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/calc": {
        target: "https://p01--example--fynyvxxwv6zn.code.run",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
