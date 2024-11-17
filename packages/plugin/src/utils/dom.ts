import { render } from "dom-serializer"
import { ElementType, parseDocument } from "htmlparser2"

import type { Element, Text } from "domhandler"

const URL_PATTERN = /https?:\/\/[\w/:%#$&?()~.=+@,-]+/g

/**
 * テキスト中のURLをspanタグでラップする
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export function wrapUrlPattern(text: string): string {
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replaceAll(URL_PATTERN, (url) => {
      return createSpan(url)
    })
  })
  return text
}

/**
 * テキスト中のテキストノードをspanタグでラップする
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export function wrapTextNode(text: string): string {
  text = execFuncOnTextNode(text, (child) => {
    return createSpan(child.data)
  })
  return text
}

/**
 * テキスト中のタグ以外の文字列に処理をする
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export function execFuncOnTextNode(
  text: string,
  func: (child: Text) => string,
): string {
  // imgタグのsrcなどをラップしないようにDOMを考慮する
  const document = parseDocument(text, { decodeEntities: false })
  text = ""
  for (const child of document.childNodes) {
    if (child.type === ElementType.Text) {
      // テキストノードの場合のみ処理をする
      text += func(child)
    } else {
      // エレメントノードの場合はそのままにする
      text += render(child, { encodeEntities: false })
    }
  }
  return text
}

/**
 * テキスト中のタグに処理をする
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export function execFuncOnElementNode(
  text: string,
  func: (child: Element) => string,
): string {
  // imgタグのsrcなどをラップしないようにDOMを考慮する
  const document = parseDocument(text, { decodeEntities: false })
  text = ""
  for (const child of document.childNodes) {
    if (child.type === ElementType.Tag) {
      // エレメントノードの場合のみ処理をする
      text += func(child)
    } else {
      // テキストノードの場合はそのままにする
      text += render(child, { encodeEntities: false })
    }
  }
  return text
}

export function createSpan(content: string): string {
  return `<span>${content}</span>`
}
