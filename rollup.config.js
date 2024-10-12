import typescript from "@rollup/plugin-typescript"

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/plugin.ts",
  output: {
    file: "dist/plugin.js",
    format: "commonjs",
  },
  plugins: [typescript()],
}
