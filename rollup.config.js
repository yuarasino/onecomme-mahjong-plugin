import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import copy from "rollup-plugin-copy"

/** @type {import("rollup").RollupOptions} */
export default {
  input: "src/plugin.ts",
  output: {
    file: "dist/plugin.js",
    format: "commonjs",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    json(),
    terser(),
    copy({
      targets: [{ src: "public/*", dest: "dist" }],
    }),
  ],
}
