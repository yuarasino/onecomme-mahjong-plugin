import { describe, expect, test } from "@jest/globals"

import * as constants from "../src/constants"
import plugin from "../src/plugin"

describe("plugin", () => {
  test("name", () => {
    expect(plugin.name).toBe(constants.PLUGIN_NAME)
  })
})
