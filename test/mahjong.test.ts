import { describe, expect, test } from "@jest/globals"

import { replaceMahjongTile } from "../src/mahjong"

describe("replaceMahjongTile", () => {
  test("returns text", () => {
    const text = "test"
    const actual = replaceMahjongTile(text)
    expect(actual).toBe("test")
  })
})
