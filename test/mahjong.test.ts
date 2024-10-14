import { describe, expect, test } from "@jest/globals"

import {
  createSource,
  createTag,
  replaceHanHonorPattern,
  replaceHanSuitedPattern,
  replaceMahjongTile,
  replaceMpszHonorPattern,
  replaceMpszSuitedPattern,
} from "../src/mahjong"

const createTagWithStyle = (tile: string): string => {
  return `<img src="${createSource(tile)}" alt="${tile}" class="tile" style="width: 1.25em; height: auto; margin-block: 2px; margin-right: 4px;">`
}

const wrapContent = (content: string): string => {
  return `<span>${content}</span>`
}

const wrapContentWithStyle = (content: string): string => {
  return `<span style="margin-right: 4px;">${content}</span>`
}

describe("replaceMahjongTile", () => {
  test("exec check", () => {
    const text = "正解は12mです"
    const expected = `${wrapContentWithStyle("正解は")}${createTag("m1")}${createTagWithStyle("m2")}${wrapContent("です")}`
    const actual = replaceMahjongTile(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszSuitedPattern", () => {
  test("exec check", () => {
    const content = "正解は12mです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は1２mです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const content = "正解は12ｍです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const content = "正解は1mr5pです"
    const expected = `正解は${createTag("m1")}${createTag("p0")}です`
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
    const expected = `正解は${createTag("m1")}-${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszHonorPattern", () => {
  test("exec check", () => {
    const content = "正解は12zです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は1２zです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const content = "正解は12ｚです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
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
    const expected = `正解は${createTag("z1")}-${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanSuitedPattern", () => {
  test("exec check", () => {
    const content = "正解は１２萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile", () => {
    const content = "正解は1２萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("mixed tile 2", () => {
    const content = "正解は１二萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("red tile", () => {
    const content = "正解は１萬赤５筒です"
    const expected = `正解は${createTag("m1")}${createTag("p0")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は１－２萬です"
    const expected = `正解は${createTag("m1")}-${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanHonorPattern", () => {
  test("exec check", () => {
    const content = "正解は東南です"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("bar included", () => {
    const content = "正解は東-南です"
    const expected = `正解は${createTag("z1")}-${createTag("z2")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })
})
