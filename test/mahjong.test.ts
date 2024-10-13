import { describe, expect, test } from "@jest/globals"

import {
  createTileTag,
  replaceHanHonorPattern,
  replaceHanSuitedPattern,
  replaceMahjongTile,
  replaceMpszHonorPattern,
  replaceMpszSuitedPattern,
} from "../src/mahjong"

describe("replaceMahjongTile", () => {
  test("exec check", () => {
    const text = "test"
    const actual = replaceMahjongTile(text)
    expect(actual).toBe("test")
  })
})

describe("replaceMpszSuitedPattern", () => {
  test("exec check", () => {
    const text = "正解は12mです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const text = "正解は1２mです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const text = "正解は12ｍです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceMpszSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const text = "正解は1mr5pです"
    const expected = `正解は${createTileTag("m1")}${createTileTag("p0")}です`
    const actual = replaceMpszSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("no tile", () => {
    const text = "今日は100pt稼いだ"
    const expected = "今日は100pt稼いだ"
    const actual = replaceMpszSuitedPattern(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszHonorPattern", () => {
  test("exec check", () => {
    const text = "正解は12zです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(text)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const text = "正解は1２zです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(text)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const text = "正解は12ｚです"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceMpszHonorPattern(text)
    expect(actual).toBe(expected)
  })

  test("no tile", () => {
    const text = "今日は100zt稼いだ"
    const expected = "今日は100zt稼いだ"
    const actual = replaceMpszHonorPattern(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanSuitedPattern", () => {
  test("exec check", () => {
    const text = "正解は１２萬です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceHanSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const text = "正解は１二萬です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("m2")}です`
    const actual = replaceHanSuitedPattern(text)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const text = "正解は１萬赤５筒です"
    const expected = `正解は${createTileTag("m1")}${createTileTag("p0")}です`
    const actual = replaceHanSuitedPattern(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanHonorPattern", () => {
  test("exec check", () => {
    const text = "正解は東南です"
    const expected = `正解は${createTileTag("z1")}${createTileTag("z2")}です`
    const actual = replaceHanHonorPattern(text)
    expect(actual).toBe(expected)
  })
})
