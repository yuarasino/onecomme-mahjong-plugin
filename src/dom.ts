import { Window } from "happy-dom"
import type { Document, HTMLElement, Node } from "happy-dom"

// urlの正規表現
const URL_PATTERN = /https?:\/\/[\w/:%#$&?()~.=+@,-]+/g

/**
 * テキスト中のurlをspanタグで囲う
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const wrapUrlPattern = (text: string): string => {
  // imgタグのsrcなどを変換しないようにテキストノードのみを対象にする
  text = execFuncOnTextNode(text, (child, document) => {
    let content = child.textContent ?? ""
    content = content.replace(URL_PATTERN, (url) => {
      return `<span>${url}</span>`
    })
    updateTextNode(child, document, content)
  })
  return text
}

/**
 * テキスト中のテキストノードをspanタグで囲う
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const wrapTextNode = (text: string): string => {
  text = execFuncOnTextNode(text, (child, document) => {
    let content = child.textContent ?? ""
    content = `<span>${content}</span>`
    updateTextNode(child, document, content)
  })
  return text
}

/**
 * テキスト中のエレメントノードのみを対象に処理を実行する
 * @param text 対象テキスト
 * @param func 実行したい処理
 * @returns 処理済みテキスト
 */
export const execFuncOnElementNode = (
  text: string,
  func: (child: HTMLElement, document: Document) => void,
): string => {
  const window = new Window()
  const document = window.document
  document.body.innerHTML = text
  const children = Array.from(document.body.childNodes)
  for (const child of children) {
    // エレメントノードのみ対象にする
    if (child.nodeType === document.ELEMENT_NODE) {
      func(child as HTMLElement, document)
    }
  }
  text = document.body.innerHTML
  return text
}

/**
 * テキスト中のテキストノードのみを対象に処理を実行する
 * @param text 対象テキスト
 * @param func 実行したい処理
 * @returns 処理済みテキスト
 */
export const execFuncOnTextNode = (
  text: string,
  func: (child: Node, document: Document) => void,
): string => {
  const window = new Window()
  const document = window.document
  document.body.innerHTML = text
  const children = Array.from(document.body.childNodes)
  for (const child of children) {
    // テキストノードのみ対象にする
    if (child.nodeType === document.TEXT_NODE) {
      func(child, document)
    }
  }
  text = document.body.innerHTML
  return text
}

/**
 * テキストノードをdomを考慮して更新する
 * @param child テキストノード
 * @param document ドキュメント
 * @param content タグを含んだテキスト
 */
export const updateTextNode = (
  child: Node,
  document: Document,
  content: string,
) => {
  const node = document.createElement("div")
  node.innerHTML = content
  const children = Array.from(node.childNodes)
  for (const n of children) {
    document.body.insertBefore(n, child)
  }
  document.body.removeChild(child)
}
