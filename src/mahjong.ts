import * as constants from "./constants"
import {
  execFuncOnElementNode,
  execFuncOnTextNode,
  updateTextNode,
  wrapTextNode,
  wrapUrlPattern,
} from "./dom"

// mpsz形式
const MPSZ_SUIT_PATTERN = /[mpsｍｐｓ]/g
const MPSZ_RANK_PATTERN = /[0123456789０１２３４５６７８９]/g
const MPSZ_HONOR_PATTERN = /[zｚ]/g
const MPSZ_LETTER_PATTERN = /[1234567１２３４５６７]/g
const MPSZ_RED_PATTERN = /(?:r5|赤5|ｒ５|赤５)/g
// 漢字形式
const HAN_SUIT_PATTERN = /[萬筒索]/g
const HAN_RANK_PATTERN = /[0123456789０１２３４５６７８９〇一二三四五六七八九]/g
const HAN_LETTER_PATTERN = /[東南西北白發中発]/g
const HAN_RED_PATTERN = /(?:r5|赤5|ｒ五|赤五|ｒ５|赤５)/g
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
  text = execFuncOnTextNode(text, (child, document) => {
    let content = child.textContent ?? ""
    content = replaceMpszSuitedPattern(content)
    content = replaceMpszHonorPattern(content)
    content = replaceHanSuitedPattern(content)
    content = replaceHanHonorPattern(content)
    updateTextNode(child, document, content)
  })
  // 牌と文字の間に間隔をあけるためにテキストノードをspanタグで囲う
  text = wrapTextNode(text)
  // 牌と文字の間に間隔をあける
  text = execFuncOnElementNode(text, (child, document) => {
    const sibling = child.nextElementSibling
    if (sibling) {
      const c = child.classList.contains("tile")
      const s = sibling.classList.contains("tile")
      if ((c && !s) || (!c && s)) {
        child.style.marginRight = "4px"
      }
    }
  })
  return text
}

/**
 * テキスト中のmpsz形式数牌を画像に置き換える
 * @param content 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszSuitedPattern = (content: string): string => {
  const s = MPSZ_SUIT_PATTERN
  const r = MPSZ_RANK_PATTERN
  const a = MPSZ_RED_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const ra = new RegExp(`(?:${r.source}|${a.source})`, "g")
  const rb = new RegExp(`(?:${ra.source}|${b.source})`, "g")
  const h = new RegExp(
    `(${rb.source}*${ra.source})(${s.source})(?![a-qs-zａ-ｑｓ-ｚ])`,
    "g",
  )
  content = content.replace(h, (_, hand: string, suit: string) => {
    suit = normalizeSuit(suit)
    hand = hand.replace(a, "0")
    hand = hand.replace(b, "-")
    hand = hand.replace(r, (rank) => {
      rank = normalizeRank(rank)
      const tile = `${suit}${rank}`
      return createTag(tile)
    })
    return hand
  })
  return content
}

/**
 * テキスト中のmpsz形式字牌を画像に置き換える
 * @param content 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszHonorPattern = (content: string): string => {
  const s = MPSZ_HONOR_PATTERN
  const r = MPSZ_LETTER_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const rb = new RegExp(`(?:${r.source}|${b.source})`, "g")
  const h = new RegExp(
    `(${rb.source}*${r.source})(${s.source})(?![a-qs-zａ-ｑｓ-ｚ])`,
    "g",
  )
  content = content.replace(h, (_, hand: string) => {
    hand = hand.replace(b, "-")
    hand = hand.replace(r, (rank) => {
      rank = normalizeRank(rank)
      const tile = `z${rank}`
      return createTag(tile)
    })
    return hand
  })
  return content
}

/**
 * テキスト中の漢字形式数牌を画像に置き換える
 * @param content 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceHanSuitedPattern = (content: string): string => {
  const s = HAN_SUIT_PATTERN
  const r = HAN_RANK_PATTERN
  const a = HAN_RED_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const ra = new RegExp(`(?:${r.source}|${a.source})`, "g")
  const rb = new RegExp(`(?:${ra.source}|${b.source})`, "g")
  const h = new RegExp(`(${rb.source}*${ra.source})(${s.source})`, "g")
  content = content.replace(h, (_, hand: string, suit: string) => {
    suit = normalizeSuit(suit)
    hand = hand.replace(a, "0")
    hand = hand.replace(b, "-")
    hand = hand.replace(r, (rank) => {
      rank = normalizeRank(rank)
      const tile = `${suit}${rank}`
      return createTag(tile)
    })
    return hand
  })
  return content
}

/**
 * テキスト中の漢字形式字牌を画像に置き換える
 * @param content 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceHanHonorPattern = (content: string): string => {
  const r = HAN_LETTER_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const rb = new RegExp(`(?:${r.source}|${b.source})`, "g")
  const h = new RegExp(`(${rb.source}*${r.source})`, "g")
  content = content.replace(h, (_, hand: string) => {
    hand = hand.replace(/発/g, "發")
    hand = hand.replace(b, "-")
    hand = hand.replace(r, (rank) => {
      rank = normalizeRank(rank)
      const tile = `z${rank}`
      return createTag(tile)
    })
    return hand
  })
  return content
}

export const normalizeSuit = (suit: string): string => {
  const targets = "mpsｍｐｓ萬筒索"
  const index = targets.indexOf(suit)
  return "mps"[index % 3]
}

export const normalizeRank = (rank: string): string => {
  const targets =
    "0123456789０１２３４５６７８９〇一二三四五六七八九〇東南西北白發中"
  const index = targets.indexOf(rank)
  return "0123456789"[index % 10]
}

export const createTag = (tile: string): string => {
  return `<img src="${createSource(tile)}" alt="${tile}" class="tile" style="width: 1.25em; height: auto; margin-block: 2px;">`
}

export const createSource = (tile: string): string => {
  return `${constants.PLUGIN_ROOT}/images/${tile}.png`
}
