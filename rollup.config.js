import { defineConfig } from "rollup"
import typescript from "@rollup/plugin-typescript"


export default defineConfig({
  input: "src/plugin.ts",
  output: {
    file: "dist/plugin.js",
    format: "commonjs"
  },
  plugins: [typescript()]
})
