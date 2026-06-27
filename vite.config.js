import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    cssMinify: "esbuild",
    chunkSizeWarningLimit: 800, // Raise warning threshold (kB)

    rollupOptions: {
      output: {
        /**
         * Vite 8 (rolldown) requires manualChunks as a function.
         * Routes each module id to its named chunk.
         */
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Firebase — large auth + storage bundle
            if (id.includes("firebase")) return "vendor-firebase";
            // Supabase
            if (id.includes("@supabase")) return "vendor-supabase";
            // React ecosystem
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "vendor-react";
            }
            // UI icon library
            if (id.includes("lucide-react")) return "vendor-icons";
            // Toast
            if (id.includes("react-hot-toast")) return "vendor-toast";
          }
        },

        // Organize output assets into subdirectories
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || "";
          const ext = name.split(".").pop() || "";
          if (/css/.test(ext)) return "assets/css/[name]-[hash][extname]";
          if (/png|jpe?g|webp|svg|gif|ico/.test(ext))
            return "assets/img/[name]-[hash][extname]";
          if (/woff2?|ttf|eot/.test(ext))
            return "assets/fonts/[name]-[hash][extname]";
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },

  // Dev server config
  server: {
    port: 5173,
    open: false,
  },
});
