import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build output
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          vendor: ["react", "react-dom"],
          // Add more chunks as needed
        },
      },
    },
    // Generate sourcemaps for better debugging
    sourcemap: true,
  },
  // Optimize serving of assets
  server: {
    // Configure CORS for development
    cors: true,
  },
});
