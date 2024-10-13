import { describe, expect, test } from "@jest/globals"
import { JSDOM } from "jsdom"

import { execFuncOnTextNode, updateTextNode, wrapUrlPattern } from "../src/dom"

describe("wrapUrlPattern", () => {
  test("exec check", () => {
    const text = `告知！<img src="https://example.com/icon.png"> https://example.com/page/ 見に来てね！`
    const expected = `告知！<img src="https://example.com/icon.png"> <span>https://example.com/page/</span> 見に来てね！`
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })

  test("no url", () => {
    const text = "テストコメントです"
    const expected = "テストコメントです"
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })

  test("multi url", () => {
    const text = "https://example.com/test/ https://example.com/test/"
    const expected =
      "<span>https://example.com/test/</span> <span>https://example.com/test/</span>"
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })
})

describe("execFuncOnTextNode", () => {
  test("exec check", () => {
    const text = "テスト<span>コメント</span>です"
    const func = (child: Node, document: Document) => {
      child.textContent += "にゃ"
    }
    const expected = "テストにゃ<span>コメント</span>ですにゃ"
    const actual = execFuncOnTextNode(text, func)
    expect(actual).toBe(expected)
  })
})

describe("updateOnTextNode", () => {
  test("exec check", () => {
    const dom = new JSDOM("テストコメントです")
    const document = dom.window.document
    // biome-ignore lint/style/noNonNullAssertion: for test
    const child = document.body.firstChild!
    const content = "テスト<span>コメント</span>です"
    const expected = "テスト<span>コメント</span>です"
    updateTextNode(child, document, content)
    const actual = document.body.innerHTML
    expect(actual).toBe(expected)
  })
})
