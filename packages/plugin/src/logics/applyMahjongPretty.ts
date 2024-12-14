import * as consts from "@mahjongpretty/core/src/consts"
import { render } from "dom-serializer"
import { DomUtils } from "htmlparser2"
import {
  execFuncOnElementNode,
  execFuncOnTextNode,
  wrapTextNode,
  wrapUrlPattern,
} from "../utils/dom"

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
const HAN_RED_PATTERN = /(?:r5|赤5|ｒ５|赤５|ｒ五|赤五)/g
// 記号
const SYMBOL_BAR_PATTERN = /(?:-|－|ー|‐|－|―)/g

/**
 * テキスト中の麻雀牌を画像に置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export default function applyMahjongPretty(text: string): string {
  text = wrapUrlPattern(text)
  text = replaceMpszSuitedPattern(text)
  text = replaceMpszHonorPattern(text)
  text = replaceHanSuitedPattern(text)
  text = replaceHanHonorPattern(text)
  text = wrapTextNode(text)
  text = addImageMargin(text)
  return text
}

/**
 * テキスト中のmpsz形式数牌をimgタグに置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszSuitedPattern = (text: string): string => {
  const sp = MPSZ_SUIT_PATTERN
  const rp = MPSZ_RANK_PATTERN
  const ap = MPSZ_RED_PATTERN
  const bp = SYMBOL_BAR_PATTERN
  const rap = new RegExp(`(?:${rp.source}|${ap.source})`, "g")
  const rbp = new RegExp(`(?:${rap.source}|${bp.source})`, "g")
  const hp = new RegExp(
    `(${rbp.source}*${rap.source})(${sp.source})(?![a-qs-zａ-ｑｓ-ｚ])`,
    "g",
  )
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replaceAll(hp, (_, hand: string, suit: string) => {
      suit = normalizeSuit(suit)
      hand = hand.replaceAll(ap, "0")
      hand = hand.replaceAll(bp, "-")
      hand = hand.replaceAll(rp, (rank) => {
        rank = normalizeRank(rank)
        const tile = `${suit}${rank}`
        return createImg(tile)
      })
      return hand
    })
  })
  return text
}

/**
 * テキスト中のmpsz形式字牌をimgタグに置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszHonorPattern = (text: string): string => {
  const sp = MPSZ_HONOR_PATTERN
  const rp = MPSZ_LETTER_PATTERN
  const bp = SYMBOL_BAR_PATTERN
  const rbp = new RegExp(`(?:${rp.source}|${bp.source})`, "g")
  const hp = new RegExp(
    `(${rbp.source}*${rp.source})(${sp.source})(?![a-qs-zａ-ｑｓ-ｚ])`,
    "g",
  )
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(hp, (_, hand: string) => {
      hand = hand.replace(bp, "-")
      hand = hand.replace(rp, (rank) => {
        rank = normalizeRank(rank)
        const tile = `z${rank}`
        return createImg(tile)
      })
      return hand
    })
  })
  return text
}

/**
 * テキスト中の漢字形式数牌をimgタグに置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceHanSuitedPattern = (text: string): string => {
  const sp = HAN_SUIT_PATTERN
  const rp = HAN_RANK_PATTERN
  const ap = HAN_RED_PATTERN
  const bp = SYMBOL_BAR_PATTERN
  const rap = new RegExp(`(?:${rp.source}|${ap.source})`, "g")
  const rbp = new RegExp(`(?:${rap.source}|${bp.source})`, "g")
  const h = new RegExp(`(${rbp.source}*${rap.source})(${sp.source})`, "g")
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(h, (_, hand: string, suit: string) => {
      suit = normalizeSuit(suit)
      hand = hand.replace(ap, "0")
      hand = hand.replace(bp, "-")
      hand = hand.replace(rp, (rank) => {
        rank = normalizeRank(rank)
        const tile = `${suit}${rank}`
        return createImg(tile)
      })
      return hand
    })
  })
  return text
}

/**
 * テキスト中の漢字形式字牌をimgタグに置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceHanHonorPattern = (text: string): string => {
  const rp = HAN_LETTER_PATTERN
  const bp = SYMBOL_BAR_PATTERN
  const rbp = new RegExp(`(?:${rp.source}|${bp.source})`, "g")
  const hp = new RegExp(`(${rbp.source}*${rp.source})`, "g")
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(hp, (_, hand: string) => {
      hand = hand.replace(/発/g, "發")
      hand = hand.replace(bp, "-")
      hand = hand.replace(rp, (rank) => {
        rank = normalizeRank(rank)
        const tile = `z${rank}`
        return createImg(tile)
      })
      return hand
    })
  })
  return text
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

export const createImg = (tile: string): string => {
  const src = `${consts.PLUGIN_WEB_EP}/images/${tile}.png`
  return `<img src="${src}" alt="${tile}" class="pai">`
}

export function addImageMargin(text: string): string {
  text = execFuncOnElementNode(text, (child) => {
    const sibling = DomUtils.nextElementSibling(child)
    if (sibling) {
      const cc = child.attribs.class
      const sc = sibling.attribs.class
      const cb = cc ? cc.includes("pai") : false
      const sb = sc ? sc.includes("pai") : false
      if ((cb && !sb) || (!cb && sb)) {
        const cl = child.attribs.class
        child.attribs.class = `${cl ? `${cl} ` : ""}margin`
      }
    }
    return render(child, { encodeEntities: false })
  })
  return text
}
