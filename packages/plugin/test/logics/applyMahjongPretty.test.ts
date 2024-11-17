import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import { describe, expect, test } from "vitest"
import applyMahjongPretty, {
  createTag,
  replaceMpszSuitedPattern,
  replaceMpszHonorPattern,
  replaceHanSuitedPattern,
  replaceHanHonorPattern,
} from "../../src/logics/applyMahjongPretty"

describe("applyMahjongPretty/applyMahjongPretty", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test("麻雀牌が画像に変換されること", () => {
    const text = "テスト1m"

    const actual = applyMahjongPretty(text, config)
    const expected = `テスト${createTag("m1", config)}`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const text = 'テスト<img src="https://example.com/1m">'

    const actual = applyMahjongPretty(text, config)
    const expected = 'テスト<img src="https://example.com/1m">'

    expect(actual).toBe(expected)
  })

  test("サニタイズされたタグが復元されないこと", () => {
    const text = "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;"

    const actual = applyMahjongPretty(text, config)
    const expected = "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;"

    expect(actual).toBe(expected)
  })
})

describe("applyMahjongPretty/replaceMpszSuitedPattern", () => {
  const config = deepCopy(consts.DEFAULT_CONFIG)

  test.each([
    [
      "テスト12mテスト",
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト1２mテスト",
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト12ｍテスト",
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト1m2pテスト",
      `テスト${createTag("m1", config)}${createTag("p2", config)}テスト`,
    ],
    [
      "テスト1赤5mテスト",
      `テスト${createTag("m1", config)}${createTag("m0", config)}テスト`,
    ],
    [
      "テスト1mr5pテスト",
      `テスト${createTag("m1", config)}${createTag("p0", config)}テスト`,
    ],
    [
      "テスト1ー２ｍテスト",
      `テスト${createTag("m1", config)}-${createTag("m2", config)}テスト`,
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
      `テスト${createTag("z1", config)}${createTag("z2", config)}テスト`,
    ],
    [
      "テスト1２zテスト",
      `テスト${createTag("z1", config)}${createTag("z2", config)}テスト`,
    ],
    [
      "テスト12ｚテスト",
      `テスト${createTag("z1", config)}${createTag("z2", config)}テスト`,
    ],
    [
      "テスト1ー２ｚテスト",
      `テスト${createTag("z1", config)}-${createTag("z2", config)}テスト`,
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
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト1２萬テスト",
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト1二萬テスト",
      `テスト${createTag("m1", config)}${createTag("m2", config)}テスト`,
    ],
    [
      "テスト1萬2筒テスト",
      `テスト${createTag("m1", config)}${createTag("p2", config)}テスト`,
    ],
    [
      "テスト1赤5萬テスト",
      `テスト${createTag("m1", config)}${createTag("m0", config)}テスト`,
    ],
    [
      "テスト1萬r5筒テスト",
      `テスト${createTag("m1", config)}${createTag("p0", config)}テスト`,
    ],
    [
      "テスト1ー二萬テスト",
      `テスト${createTag("m1", config)}-${createTag("m2", config)}テスト`,
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
      `テスト${createTag("z1", config)}${createTag("z2", config)}テスト`,
    ],
    [
      "テスト東ー南テスト",
      `テスト${createTag("z1", config)}-${createTag("z2", config)}テスト`,
    ],
  ])("漢字形式数牌が変換されること", (text, expected) => {
    const actual = replaceHanHonorPattern(text, config)

    expect(actual).toBe(expected)
  })
})
