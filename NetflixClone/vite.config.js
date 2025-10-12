import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    mode === "analyze" &&
      visualizer({ open: true, filename: "bundle-analysis.html" }),
  ].filter(Boolean),

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;`,
      },
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: mode !== "production",
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "vendor-react";
            if (id.includes("@tanstack")) return "vendor-react-query";
            if (id.includes("axios")) return "vendor-axios";
            return "vendor";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },

  server: {
    port: 3000,
    strictPort: true,
  },

  preview: {
    port: 3000,
    strictPort: true,
  },
}));
