import { describe, expect, test } from "@jest/globals"

import {
  TILE_STYLE_TAG,
  createTileTag,
  replaceHanHonorPattern,
  replaceHanSuitedPattern,
  replaceMahjongTile,
  replaceMpszHonorPattern,
  replaceMpszSuitedPattern,
} from "../src/mahjong"

describe("replaceMahjongTile", () => {
  test("exec check", () => {
    const text = "正解は12mです"
    const expected = `${TILE_STYLE_TAG}<span>正解は</span>${createTileTag("m1")}${createTileTag("m2")}<span>です</span>`
    const actual = replaceMahjongTile(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszSuitedPattern", () => {
  test("exec check", () => {
    const content = "正解は12mです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は1２mです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const content = "正解は12ｍです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const content = "正解は1mr5pです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("p0")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("no tile", () => {
    const content = "今日は100pt稼いだ"
    const expected = "今日は100pt稼いだ"
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は1-2mです"
    const expected = `正解は${createTileTag("m1")}-${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszHonorPattern", () => {
  test("exec check", () => {
    const content = "正解は12zです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は1２zです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const content = "正解は12ｚです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("no tile", () => {
    const content = "今日は100zt稼いだ"
    const expected = "今日は100zt稼いだ"
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は1-2zです"
    const expected = `正解は${createTileTag("z1")}-${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanSuitedPattern", () => {
  test("exec check", () => {
    const content = "正解は１２萬です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は１二萬です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const content = "正解は１萬赤５筒です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("p0")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は１－２萬です"
    const expected = `正解は${createTileTag("m1")}-${createTileTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanHonorPattern", () => {
  test("exec check", () => {
    const content = "正解は東南です"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は東-南です"
    const expected = `正解は${createTileTag("z1")}-${createTileTag("z2")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })
})
