import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  build: {
    // Called "docs" so that the output is compatible with GitHub Pages
    outDir: "docs",
  },
  plugins: [
    react(),
    biomePlugin({
      mode: "check",
      files: ".",
      applyFixes: true,
      failOnError: true,
    }),
    tailwindcss(),
  ],
});
