import { describe, expect, test } from "vitest"
import { wrapUrlPattern } from "../../src/utils/dom"

describe("dom/wrapUrlPattern", () => {
  test("URLがspanタグでラップされること", () => {
    const text = "testhttps://example.com"

    const actual = wrapUrlPattern(text)
    const expected = "test<span>https://example.com</span>"

    expect(actual).toBe(expected)
  })

  test("imgタグの中がラップされないこと", () => {
    const text = 'test<img src="https://example.com">'

    const actual = wrapUrlPattern(text)
    const expected = 'test<img src="https://example.com">'

    expect(actual).toBe(expected)
  })

  test("サニタイズされたタグが復元されないこと", () => {
    const text = "test&lt;style&gt;* { color: red; }&lt;/style&gt;"

    const actual = wrapUrlPattern(text)
    const expected = "test&lt;style&gt;* { color: red; }&lt;/style&gt;"

    expect(actual).toBe(expected)
  })
})
