import { describe, expect, test } from "@jest/globals"

import {
  createTileTag,
  replaceMahjongTile,
  replaceMpszPattern,
} from "../src/mahjong"

describe("replaceMahjongTile", () => {
  test("exec check", () => {
    const text = "test"
    const actual = replaceMahjongTile(text)
    expect(actual).toBe("test")
  })
})

describe("replaceMpszPattern", () => {
  test("exec check", () => {
    const text = "正解は98mです"
    const expected = `正解は${createTileTag("m9")}${createTileTag("m8")}です`
    const actual = replaceMpszPattern(text)
    expect(actual).toBe(expected)
  })
})
