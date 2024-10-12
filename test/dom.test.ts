import { describe, expect, test } from "@jest/globals"

import { wrapUrlWithTag } from "../src/dom"

describe("wrapUrlWithTag", () => {
  test("actual pattern", () => {
    const text = `告知！<img src="https://example.com/icon.png"> https://example.com/page/ 見に来てね！`
    const expected = `告知！<img src="https://example.com/icon.png"> <span>https://example.com/page/</span> 見に来てね！`
    const actual = wrapUrlWithTag(text)
    expect(actual).toBe(expected)
  })

  test("no url", () => {
    const text = "テストコメント"
    const expected = "テストコメント"
    const actual = wrapUrlWithTag(text)
    expect(actual).toBe(expected)
  })

  test("multi url", () => {
    const text = "https://example.com/page/ https://example.com/page/"
    const expected =
      "<span>https://example.com/page/</span> <span>https://example.com/page/</span>"
    const actual = wrapUrlWithTag(text)
    expect(actual).toBe(expected)
  })
})
