import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import { describe, expect, test } from "vitest"
import applyMahjongPretty, {
  addImageMargin,
  createImg,
  replaceMpszSuitedPattern,
  replaceMpszHonorPattern,
  replaceHanSuitedPattern,
  replaceHanHonorPattern,
} from "../../src/logics/applyMahjongPretty"
import { createSpan } from "../../src/utils/dom"

function createSpanWithMargin(content: string) {
  return `<span class="margin">${content}</span>`
}

function createImgWithMargin(tile: string) {
  const src = `${consts.PLUGIN_WEB_EP}/images/${tile}.png`
  return `<img src="${src}" alt="${tile}" class="pai margin">`
}

describe("applyMahjongPretty/applyMahjongPretty", () => {
  test.each([
    [
      "テスト1m2zテスト",
      `${createSpanWithMargin("テスト")}${createImg("m1")}${createImgWithMargin("z2")}${createSpan("テスト")}`,
    ],
    [
      "テスト1m２筒テスト",
      `${createSpanWithMargin("テスト")}${createImg("m1")}${createImgWithMargin("p2")}${createSpan("テスト")}`,
    ],
    [
      "テスト1m南テスト",
      `${createSpanWithMargin("テスト")}${createImg("m1")}${createImgWithMargin("z2")}${createSpan("テスト")}`,
    ],
  ])("麻雀牌が画像に変換されること", (text, expected) => {
    const actual = applyMahjongPretty(text)

    expect(actual).toBe(expected)
  })

  test("URLが変換されないこと", () => {
    const text = "テストhttps://example.com/12mテスト"

    const actual = applyMahjongPretty(text)
    const expected = `${createSpan("テスト")}${createSpan("https://example.com/12m")}${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const text = 'テスト<img src="https://example.com/12m">テスト'

    const actual = applyMahjongPretty(text)
    const expected = `${createSpan("テスト")}<img src="https://example.com/12m">${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test.each([
    [
      "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト",
      `${createSpan("テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト")}`,
    ],
    [
      "テスト<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>テスト",
      `${createSpan("テスト")}<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>${createSpan("テスト")}`,
    ],
  ])("サニタイズされたタグが復元されないこと", (text, expected) => {
    const actual = applyMahjongPretty(text)

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/addImageMargin", () => {
  test("麻雀牌が隣り合わないときにマージンが入ること", () => {
    const text = `${createSpan("テスト")}${createImg("m1")}${createImg("m2")}${createSpan("テスト")}`

    const actual = addImageMargin(text)
    const expected = `${createSpanWithMargin("テスト")}${createImg("m1")}${createImgWithMargin("m2")}${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceMpszSuitedPattern", () => {
  test.each([
    ["テスト12mテスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト1２mテスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト12ｍテスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト1m2pテスト", `テスト${createImg("m1")}${createImg("p2")}テスト`],
    ["テスト1赤5mテスト", `テスト${createImg("m1")}${createImg("m0")}テスト`],
    ["テスト1mr5pテスト", `テスト${createImg("m1")}${createImg("p0")}テスト`],
    [
      "テスト1ー２ｍテスト",
      `テスト${createImg("m1")}-${createImg("m2")}テスト`,
    ],
  ])("MPSZ形式数牌が変換されること", (text, expected) => {
    const actual = replaceMpszSuitedPattern(text)

    expect(actual).toBe(expected)
  })

  test("r以外の文字が続くときは変換されないこと", () => {
    const text = "テスト12mpテスト"

    const actual = replaceMpszSuitedPattern(text)
    const expected = "テスト12mpテスト"

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceMpszHonorPattern", () => {
  test.each([
    ["テスト12zテスト", `テスト${createImg("z1")}${createImg("z2")}テスト`],
    ["テスト1２zテスト", `テスト${createImg("z1")}${createImg("z2")}テスト`],
    ["テスト12ｚテスト", `テスト${createImg("z1")}${createImg("z2")}テスト`],
    [
      "テスト1ー２ｚテスト",
      `テスト${createImg("z1")}-${createImg("z2")}テスト`,
    ],
  ])("MPSZ形式字牌が変換されること", (text, expected) => {
    const actual = replaceMpszHonorPattern(text)

    expect(actual).toBe(expected)
  })

  test("r以外の文字が続くときは変換されないこと", () => {
    const text = "テスト12zpテスト"

    const actual = replaceMpszHonorPattern(text)
    const expected = "テスト12zpテスト"

    expect(actual).toBe(expected)
  })

  test("8以上の数字は変換されないこと", () => {
    const text = "テスト08zテスト"

    const actual = replaceMpszHonorPattern(text)
    const expected = "テスト08zテスト"

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceHanSuitedPattern", () => {
  test.each([
    ["テスト12萬テスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト1２萬テスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト1二萬テスト", `テスト${createImg("m1")}${createImg("m2")}テスト`],
    ["テスト1萬2筒テスト", `テスト${createImg("m1")}${createImg("p2")}テスト`],
    ["テスト1赤5萬テスト", `テスト${createImg("m1")}${createImg("m0")}テスト`],
    [
      "テスト1萬ｒ五筒テスト",
      `テスト${createImg("m1")}${createImg("p0")}テスト`,
    ],
    [
      "テスト1ー二萬テスト",
      `テスト${createImg("m1")}-${createImg("m2")}テスト`,
    ],
  ])("漢字形式数牌が変換されること", (text, expected) => {
    const actual = replaceHanSuitedPattern(text)

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceHanHonorPattern", () => {
  test.each([
    ["テスト東南テスト", `テスト${createImg("z1")}${createImg("z2")}テスト`],
    ["テスト東ー南テスト", `テスト${createImg("z1")}-${createImg("z2")}テスト`],
    ["テスト發-発テスト", `テスト${createImg("z6")}-${createImg("z6")}テスト`],
  ])("漢字形式数牌が変換されること", (text, expected) => {
    const actual = replaceHanHonorPattern(text)

    expect(actual).toBe(expected)
  })
})
