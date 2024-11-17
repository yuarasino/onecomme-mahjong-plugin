import { describe, expect, test } from "vitest"
import plugin from "../src/plugin"

describe("plugin", () => {
  test("プラグイン名が設定されていること", () => {
    expect(plugin.name).toBeTruthy()
  })
})
