import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import { describe, expect, test } from "vitest"
import applyMahjongPretty, {
  createImg,
  addImageMargin,
  replaceMpszSuitedPattern,
  replaceMpszHonorPattern,
  replaceHanSuitedPattern,
  replaceHanHonorPattern,
} from "../../src/logics/applyMahjongPretty"
import { createSpan } from "../../src/utils/dom"

import type { PluginConfig } from "@mahjongpretty/core/src/types"

function createSpanWithMargin(content: string, config: PluginConfig) {
  return `<span style="margin-inline-end:${config.imageMarginX}px;">${content}</span>`
}

function createImgWithMargin(tile: string, config: PluginConfig) {
  const src = `${consts.PLUGIN_WEB_EP}/images/${tile}.png`
  return `<img src="${src}" alt="${tile}" class="${config.imageClass}" style="width:auto;height:${config.imageHeight}px;margin-block:${config.imageMarginY}px;margin-inline-end:${config.imageMarginX}px;">`
}

describe("applyMahjongPretty/applyMahjongPretty", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test("麻雀牌が画像に変換されること", () => {
    const text = "テスト12mテスト"

    const actual = applyMahjongPretty(text, config)
    const expected = `${createSpanWithMargin("テスト", config)}${createImg("m1", config)}${createImgWithMargin("m2", config)}${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const text = 'テスト<img src="https://example.com/12m">テスト'

    const actual = applyMahjongPretty(text, config)
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
    const actual = applyMahjongPretty(text, config)

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/addImageMargin", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test("麻雀牌が隣り合わないときにマージンが入ること", () => {
    const text = `${createSpan("テスト")}${createImg("m1", config)}${createImg("m2", config)}${createSpan("テスト")}`

    const actual = addImageMargin(text, config)
    const expected = `${createSpanWithMargin("テスト", config)}${createImg("m1", config)}${createImgWithMargin("m2", config)}${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceMpszSuitedPattern", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test.each([
    [
      "テスト12mテスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト1２mテスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト12ｍテスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト1m2pテスト",
      `テスト${createImg("m1", config)}${createImg("p2", config)}テスト`,
    ],
    [
      "テスト1赤5mテスト",
      `テスト${createImg("m1", config)}${createImg("m0", config)}テスト`,
    ],
    [
      "テスト1mr5pテスト",
      `テスト${createImg("m1", config)}${createImg("p0", config)}テスト`,
    ],
    [
      "テスト1ー２ｍテスト",
      `テスト${createImg("m1", config)}-${createImg("m2", config)}テスト`,
    ],
  ])("MPSZ形式数牌が変換されること", (text, expected) => {
    const actual = replaceMpszSuitedPattern(text, config)

    expect(actual).toBe(expected)
  })

  test("r以外の文字が続くときは変換されないこと", () => {
    const text = "テスト12mpテスト"

    const actual = replaceMpszSuitedPattern(text, config)
    const expected = "テスト12mpテスト"

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceMpszHonorPattern", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test.each([
    [
      "テスト12zテスト",
      `テスト${createImg("z1", config)}${createImg("z2", config)}テスト`,
    ],
    [
      "テスト1２zテスト",
      `テスト${createImg("z1", config)}${createImg("z2", config)}テスト`,
    ],
    [
      "テスト12ｚテスト",
      `テスト${createImg("z1", config)}${createImg("z2", config)}テスト`,
    ],
    [
      "テスト1ー２ｚテスト",
      `テスト${createImg("z1", config)}-${createImg("z2", config)}テスト`,
    ],
  ])("MPSZ形式字牌が変換されること", (text, expected) => {
    const actual = replaceMpszHonorPattern(text, config)

    expect(actual).toBe(expected)
  })

  test("r以外の文字が続くときは変換されないこと", () => {
    const text = "テスト12zpテスト"

    const actual = replaceMpszHonorPattern(text, config)
    const expected = "テスト12zpテスト"

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceHanSuitedPattern", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test.each([
    [
      "テスト12萬テスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト1２萬テスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト1二萬テスト",
      `テスト${createImg("m1", config)}${createImg("m2", config)}テスト`,
    ],
    [
      "テスト1萬2筒テスト",
      `テスト${createImg("m1", config)}${createImg("p2", config)}テスト`,
    ],
    [
      "テスト1赤5萬テスト",
      `テスト${createImg("m1", config)}${createImg("m0", config)}テスト`,
    ],
    [
      "テスト1萬r5筒テスト",
      `テスト${createImg("m1", config)}${createImg("p0", config)}テスト`,
    ],
    [
      "テスト1ー二萬テスト",
      `テスト${createImg("m1", config)}-${createImg("m2", config)}テスト`,
    ],
  ])("漢字形式数牌が変換されること", (text, expected) => {
    const actual = replaceHanSuitedPattern(text, config)

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceHanHonorPattern", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test.each([
    [
      "テスト東南テスト",
      `テスト${createImg("z1", config)}${createImg("z2", config)}テスト`,
    ],
    [
      "テスト東ー南テスト",
      `テスト${createImg("z1", config)}-${createImg("z2", config)}テスト`,
    ],
  ])("漢字形式数牌が変換されること", (text, expected) => {
    const actual = replaceHanHonorPattern(text, config)

    expect(actual).toBe(expected)
  })
})
