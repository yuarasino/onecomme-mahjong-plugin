import { describe, expect, test } from "@jest/globals"

import plugin from "../src/plugin"

describe("plugin", () => {
  test("name requied", () => {
    expect(plugin.name).toBeTruthy()
  })

  test("uid requied", () => {
    expect(plugin.uid).toBeTruthy()
  })

  test("version requied", () => {
    expect(plugin.version).toBeTruthy()
  })
})
