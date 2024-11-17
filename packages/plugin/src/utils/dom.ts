import { render } from "dom-serializer"
import { ElementType, parseDocument } from "htmlparser2"

import type { Text } from "domhandler"

const URL_PATTERN = /https?:\/\/[\w/:%#$&?()~.=+@,-]+/g

/**
 * テキスト中のURLをspanタグでラップする
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export function wrapUrlPattern(text: string): string {
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replaceAll(URL_PATTERN, (url) => {
      return `<span>${url}</span>`
    })
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
    }
    if (child.type === ElementType.Tag) {
      // エレメントノードの場合はそのままにする
      text += render(child)
    }
  }
  return text
}
