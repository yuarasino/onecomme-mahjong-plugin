import { describe, expect, test } from "@jest/globals"

import plugin from "../src/plugin"

describe("plugin", () => {
  test("has name", () => {
    expect(plugin.name).toBeTruthy
  })
})
