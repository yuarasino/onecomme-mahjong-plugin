import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import { describe, expect, test } from "vitest"
import applyMahjongPretty, {
  createTag,
} from "../../src/logics/applyMahjongPretty"

describe("applyMahjongPretty/applyMahjongPretty", () => {
  test("麻雀牌が画像に変換されること", () => {
    const text = "test1m"
    const config = deepCopy(consts.DEFAULT_CONFIG)

    const actual = applyMahjongPretty(text, config)
    const expected = `test${createTag("m1", config)}`

    expect(actual).toBe(expected)
  })

  test("imgタグの中が変換されないこと", () => {
    const text = 'test<img src="https://example.com/1m">'
    const config = deepCopy(consts.DEFAULT_CONFIG)

    const actual = applyMahjongPretty(text, config)
    const expected = 'test<img src="https://example.com/1m">'

    expect(actual).toBe(expected)
  })

  test("サニタイズされたタグが復元されないこと", () => {
    const text = "test&lt;style&gt;* { color: red; }&lt;/style&gt;"
    const config = deepCopy(consts.DEFAULT_CONFIG)

    const actual = applyMahjongPretty(text, config)
    const expected = "test&lt;style&gt;* { color: red; }&lt;/style&gt;"

    expect(actual).toBe(expected)
  })
})
