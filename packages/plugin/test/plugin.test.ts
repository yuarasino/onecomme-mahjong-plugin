import { assert, describe, test } from "vitest"
import plugin from "../src/plugin"

describe("plugin", () => {
  test("name", () => {
    assert(plugin.name !== undefined)
  })
})
