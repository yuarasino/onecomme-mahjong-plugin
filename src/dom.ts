import { JSDOM } from "jsdom"

const URL_PATTERN = /https?:\/\/[\w/:%#$&?()~.=+@,-]+/g

/**
 * urlをspanタグで囲う
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const wrapUrlWithTag = (text: string): string => {
  // imgタグのsrcなどを変換しないようにdomを考慮する
  const dom = new JSDOM(text)
  const document = dom.window.document
  for (const child of document.body.childNodes) {
    // テキストノードのみ対象にする
    if (child.nodeType === document.TEXT_NODE) {
      // splitでセパレータを配列に含めるために()で囲む
      const separator = new RegExp(`(${URL_PATTERN.source})`, "g")
      const contents = (child.textContent ?? "").split(separator)
      for (const [index, content] of contents.entries()) {
        if (index % 2 === 1) {
          // urlならspanタグで囲って自身の前に追加
          const node = document.createElement("span")
          node.textContent = content
          document.body.insertBefore(node, child)
        } else {
          // テキストならそのまま自身の前に追加
          if (content) {
            const node = document.createTextNode(content)
            document.body.insertBefore(node, child)
          }
        }
      }
      // 自身を削除
      document.body.removeChild(child)
    }
  }
  return document.body.innerHTML
}
