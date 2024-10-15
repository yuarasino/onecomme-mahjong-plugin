import { describe, expect, test } from "@jest/globals"

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

  test("URLがあること", () => {
    expect(plugin.url).toBeTruthy()
  })
})
