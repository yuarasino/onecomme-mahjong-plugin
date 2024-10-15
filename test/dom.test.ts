import { describe, expect, test } from "@jest/globals"
import { Window } from "happy-dom"

import {
  execFuncOnElementNode,
  execFuncOnTextNode,
  updateTextNode,
  wrapUrlPattern,
} from "../src/dom"

describe("wrapUrlPattern", () => {
  test("動作確認", () => {
    const text = `告知！<img src="https://example.com/icon.png"> https://example.com/page/ 見に来てね！`
    const expected = `告知！<img src="https://example.com/icon.png"> <span>https://example.com/page/</span> 見に来てね！`
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })

  test("URLがないとき", () => {
    const text = "テストコメントです"
    const expected = "テストコメントです"
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })

  test("URLが複数のとき", () => {
    const text = "https://example.com/test/ https://example.com/test/"
    const expected =
      "<span>https://example.com/test/</span> <span>https://example.com/test/</span>"
    const actual = wrapUrlPattern(text)
    expect(actual).toBe(expected)
  })
})

describe("execFuncOnElementNode", () => {
  test("動作確認", () => {
    const text = "テスト<span>コメント</span>です"
    const expected = "テスト<span>コメントにゃ</span>です"
    const actual = execFuncOnElementNode(text, (child, document) => {
      child.innerText += "にゃ"
    })
    expect(actual).toBe(expected)
  })
})

describe("execFuncOnTextNode", () => {
  test("動作確認", () => {
    const text = "テスト<span>コメント</span>です"
    const expected = "テストにゃ<span>コメント</span>ですにゃ"
    const actual = execFuncOnTextNode(text, (child, document) => {
      child.textContent += "にゃ"
    })
    expect(actual).toBe(expected)
  })
})

describe("updateOnTextNode", () => {
  test("動作確認", () => {
    const window = new Window()
    const document = window.document
    document.body.innerHTML = "テストコメントです"
    // biome-ignore lint/style/noNonNullAssertion: for test
    const child = document.body.firstChild!
    const content = "テスト<span>コメント</span>です"
    const expected = "テスト<span>コメント</span>です"
    updateTextNode(child, document, content)
    const actual = document.body.innerHTML
    expect(actual).toBe(expected)
  })
})
