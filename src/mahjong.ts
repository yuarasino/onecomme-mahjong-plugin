import * as constants from "./constants"
import { execFuncOnTextNode, wrapUrlPattern } from "./dom"

// mpsz形式
const MPSZ_SUIT_PATTERN = /[mpsｍｐｓ]/g
const MPSZ_RANK_PATTERN = /[0-9０-９]/g
const MPSZ_HONOR_PATTERN = /[zｚ]/g
const MPSZ_LETTER_PATTERN = /[1-7１-７]/g
const MPSZ_RED_PATTERN = /(?:r5|赤5|ｒ５|赤５)/g
// 漢字形式
const HAN_SUIT_PATTERN = /[萬筒索]/g
const HAN_RANK_PATTERN = /[一二三四五六七八九〇]/g
const HAN_LETTER_PATTERN = /[東南西北白發中]/g
// 記号
const SYMBOL_BAR_PATTERN = /(?:-|－|ー|‐|－|―)/g

/**
 * テキスト中の麻雀牌を画像に置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMahjongTile = (text: string): string => {
  // urlを変換しないようにspanタグで囲う
  text = wrapUrlPattern(text)
  // imgタグのsrcなどを変換しないようにテキストノードのみを対象にする
  text = execFuncOnTextNode(text, (child, document) => {})
  return text
}

/**
 * テキスト中のmpsz形式数牌を画像に置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszPattern = (text: string): string => {
  const s = MPSZ_SUIT_PATTERN
  const r = MPSZ_RANK_PATTERN
  const a = MPSZ_RED_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const ra = `(?:${r.source}|${a.source})`
  const rb = `(?:${ra}|${b.source})`
  const h = new RegExp(`(${rb}*${ra})(${s.source})`, "g")
  text = text.replace(h, (_, hand: string, suit: string) => {
    suit = "mps"["mpsｍｐｓ".indexOf(suit) % 3]
    hand = hand.replace(a, "0")
    hand = hand.replace(b, "-")
    hand = hand.replace(r, (rank) => {
      rank = "0123456789"["0123456789０１２３４５６７８９".indexOf(rank) % 10]
      const tile = `${suit}${rank}`
      return createTileTag(tile)
    })
    return hand
  })
  return text
}

export const createTileTag = (tile: string): string => {
  return `<img src="${createImageSource(tile)}" alt="${tile}">`
}

export const createImageSource = (tile: string): string => {
  return `/plugins/${constants.PLUGIN_UID}/images/${tile}.png`
}
