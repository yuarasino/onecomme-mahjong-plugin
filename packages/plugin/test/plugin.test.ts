import { describe, expect, test } from "vitest"

import plugin from "../src/plugin"

describe("plugin", () => {
  test("名前があること", () => {
    expect(plugin.name).toBeTruthy()
  })

  test("UIDがあること", () => {
    expect(plugin.uid).toBeTruthy()
  })

  test("バージョンがあること", () => {
    expect(plugin.version).toBeTruthy()
  })
})
