import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      entry: "src/plugin.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
})
