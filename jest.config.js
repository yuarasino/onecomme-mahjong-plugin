import { createDefaultPreset } from "ts-jest"

/** @type {import("ts-jest").JestConfigWithTsJest} **/
export default {
  ...createDefaultPreset(),
  globals: {
    __PACKAGE_NAME__: process.env.npm_package_name,
    __PACKAGE_VERSION__: process.env.npm_package_version,
  },
}
