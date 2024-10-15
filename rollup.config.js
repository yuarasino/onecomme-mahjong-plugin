import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
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
    replace({
      preventAssignment: true,
      values: {
        __PACKAGE_NAME__: JSON.stringify(process.env.npm_package_name),
        __PACKAGE_VERSION__: JSON.stringify(process.env.npm_package_version),
        __PACKAGE_URL__: JSON.stringify(process.env.npm_package_homepage),
      },
    }),
    resolve(),
    commonjs(),
    json(),
    typescript(),
    terser(),
    copy({
      targets: [{ src: "public/*", dest: "dist" }],
    }),
  ],
}
