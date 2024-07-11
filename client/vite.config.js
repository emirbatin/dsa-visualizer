import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: isDevelopment ? "http://localhost:4000" : "https://dsa-visualizer-gilt.vercel.app",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
    plugins: [react()],
    define: {
      'process.env': {
        NODE_ENV: mode,
      },
    },
  };
});
