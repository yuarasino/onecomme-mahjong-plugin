import typescript from "@rollup/plugin-typescript"
import { defineConfig } from "rollup"

export default defineConfig({
  input: "src/plugin.ts",
  output: {
    file: "dist/plugin.js",
    format: "commonjs",
  },
  plugins: [typescript()],
})
