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
  test("動作確認", () => {
    const text = "正解は12mです"
    const expected = `${wrapContentWithStyle("正解は")}${createTag("m1")}${createTagWithStyle("m2")}${wrapContent("です")}`
    const actual = replaceMahjongTile(text)
    expect(actual).toBe(expected)
  })

  test("URLがあるとき", () => {
    const text = "牌譜URL:https://example.com/12345m6789p"
    const expected = `${wrapContent("牌譜URL:")}${wrapContent("https://example.com/12345m6789p")}`
    const actual = replaceMahjongTile(text)
    expect(actual).toBe(expected)
  })

  test("画像があるとき", () => {
    const text = `こんにちは<img src="data:image/png;base64,12345m6789p">`
    const expected = `${wrapContent("こんにちは")}<img src="data:image/png;base64,12345m6789p">`
    const actual = replaceMahjongTile(text)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszSuitedPattern", () => {
  test("動作確認", () => {
    const content = "正解は12mです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角全角混ざったとき", () => {
    const content = "正解は1２mです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角全角混ざったとき２", () => {
    const content = "正解は12ｍです"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("赤ドラがあるとき", () => {
    const content = "正解は1mr5pです"
    const expected = `正解は${createTag("m1")}${createTag("p0")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("変換しないとき", () => {
    const content = "今日は100pt稼いだ"
    const expected = "今日は100pt稼いだ"
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("横棒が入っているとき", () => {
    const content = "正解は1-2ー３mです"
    const expected = `正解は${createTag("m1")}-${createTag("m2")}-${createTag("m3")}です`
    const actual = replaceMpszSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceMpszHonorPattern", () => {
  test("動作確認", () => {
    const content = "正解は12zです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角全角混ざったとき", () => {
    const content = "正解は1２zです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角全角混ざったとき２", () => {
    const content = "正解は12ｚです"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("変換しないとき", () => {
    const content = "今日は１００ｚｔ稼いだ"
    const expected = "今日は１００ｚｔ稼いだ"
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("横棒が入っているとき", () => {
    const content = "正解は1-2－３zです"
    const expected = `正解は${createTag("z1")}-${createTag("z2")}-${createTag("z3")}です`
    const actual = replaceMpszHonorPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanSuitedPattern", () => {
  test("動作確認", () => {
    const content = "正解は１２萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角全角混ざったとき", () => {
    const content = "正解は1２萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("半角角漢字混ざったとき", () => {
    const content = "正解は1二萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("全角漢字混ざったとき", () => {
    const content = "正解は１二萬です"
    const expected = `正解は${createTag("m1")}${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("赤ドラがあるとき", () => {
    const content = "正解は１萬赤５筒です"
    const expected = `正解は${createTag("m1")}${createTag("p0")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })

  test("横棒が入っているとき", () => {
    const content = "正解は１－２萬です"
    const expected = `正解は${createTag("m1")}-${createTag("m2")}です`
    const actual = replaceHanSuitedPattern(content)
    expect(actual).toBe(expected)
  })
})

describe("replaceHanHonorPattern", () => {
  test("動作確認", () => {
    const content = "正解は東南です"
    const expected = `正解は${createTag("z1")}${createTag("z2")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })

  test("横棒が入っているとき", () => {
    const content = "正解は東-南ー西です"
    const expected = `正解は${createTag("z1")}-${createTag("z2")}-${createTag("z3")}です`
    const actual = replaceHanHonorPattern(content)
    expect(actual).toBe(expected)
  })
})
