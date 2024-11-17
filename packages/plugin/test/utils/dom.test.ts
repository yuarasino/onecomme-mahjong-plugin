import { describe, expect, test } from "vitest"
import { createSpan, wrapTextNode, wrapUrlPattern } from "../../src/utils/dom"

describe("dom/wrapUrlPattern", () => {
  test("URLがspanタグでラップされること", () => {
    const text = "テストhttps://example.comテスト"

    const actual = wrapUrlPattern(text)
    const expected = `テスト${createSpan("https://example.com")}テスト`

    expect(actual).toBe(expected)
  })

  test("imgタグの中がラップされないこと", () => {
    const text = 'テスト<img src="https://example.com">テスト'

    const actual = wrapUrlPattern(text)
    const expected = 'テスト<img src="https://example.com">テスト'

    expect(actual).toBe(expected)
  })

  test.each([
    [
      "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト",
      "テスト&lt;style&gt;* { color: red; }&lt;/style&gt;テスト",
    ],
    [
      "テスト<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>テスト",
      "テスト<span>&lt;style&gt;* { color: red; }&lt;/style&gt;</span>テスト",
    ],
  ])("サニタイズされたタグが復元されないこと", (text, expected) => {
    const actual = wrapUrlPattern(text)

    expect(actual).toBe(expected)
  })
})

describe("dom/wrapTextNode", () => {
  test("テキストノードがspanタグでラップされること", () => {
    const text = "テスト<span>https://example.com</span>テスト"

    const actual = wrapTextNode(text)
    const expected = `${createSpan("テスト")}<span>https://example.com</span>${createSpan("テスト")}`

    expect(actual).toBe(expected)
  })

  test("imgタグがラップされないこと", () => {
    const text = 'テスト<img src="https://example.com">テスト'

    const actual = wrapTextNode(text)
    const expected = `${createSpan("テスト")}<img src="https://example.com">${createSpan("テスト")}`

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
    const actual = wrapTextNode(text)

    expect(actual).toBe(expected)
  })
})
