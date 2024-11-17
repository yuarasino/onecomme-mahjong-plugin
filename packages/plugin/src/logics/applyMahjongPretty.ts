import * as consts from "@mahjongpretty/core/src/consts"
import { execFuncOnTextNode, wrapUrlPattern } from "../utils/dom"

import type { PluginConfig } from "@mahjongpretty/core/src/types"

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
export default function applyMahjongPretty(
  text: string,
  config: PluginConfig,
): string {
  text = wrapUrlPattern(text)
  text = replaceMpszSuitedPattern(text, config)
  text = replaceMpszHonorPattern(text, config)
  text = replaceHanSuitedPattern(text, config)
  text = replaceHanHonorPattern(text, config)
  return text
}

/**
 * テキスト中のmpsz形式数牌をimgタグに置き換える
 * @param text 対象テキスト
 * @returns 処理済みテキスト
 */
export const replaceMpszSuitedPattern = (
  text: string,
  config: PluginConfig,
): string => {
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
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replaceAll(h, (_, hand: string, suit: string) => {
      suit = normalizeSuit(suit)
      hand = hand.replaceAll(a, "0")
      hand = hand.replaceAll(b, "-")
      hand = hand.replaceAll(r, (rank) => {
        rank = normalizeRank(rank)
        const tile = `${suit}${rank}`
        return createTag(tile, config)
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
export const replaceMpszHonorPattern = (
  text: string,
  config: PluginConfig,
): string => {
  const s = MPSZ_HONOR_PATTERN
  const r = MPSZ_LETTER_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const rb = new RegExp(`(?:${r.source}|${b.source})`, "g")
  const h = new RegExp(
    `(${rb.source}*${r.source})(${s.source})(?![a-qs-zａ-ｑｓ-ｚ])`,
    "g",
  )
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(h, (_, hand: string) => {
      hand = hand.replace(b, "-")
      hand = hand.replace(r, (rank) => {
        rank = normalizeRank(rank)
        const tile = `z${rank}`
        return createTag(tile, config)
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
export const replaceHanSuitedPattern = (
  text: string,
  config: PluginConfig,
): string => {
  const s = HAN_SUIT_PATTERN
  const r = HAN_RANK_PATTERN
  const a = HAN_RED_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const ra = new RegExp(`(?:${r.source}|${a.source})`, "g")
  const rb = new RegExp(`(?:${ra.source}|${b.source})`, "g")
  const h = new RegExp(`(${rb.source}*${ra.source})(${s.source})`, "g")
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(h, (_, hand: string, suit: string) => {
      suit = normalizeSuit(suit)
      hand = hand.replace(a, "0")
      hand = hand.replace(b, "-")
      hand = hand.replace(r, (rank) => {
        rank = normalizeRank(rank)
        const tile = `${suit}${rank}`
        return createTag(tile, config)
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
export const replaceHanHonorPattern = (
  text: string,
  config: PluginConfig,
): string => {
  const r = HAN_LETTER_PATTERN
  const b = SYMBOL_BAR_PATTERN
  const rb = new RegExp(`(?:${r.source}|${b.source})`, "g")
  const h = new RegExp(`(${rb.source}*${r.source})`, "g")
  text = execFuncOnTextNode(text, (child) => {
    return child.data.replace(h, (_, hand: string) => {
      hand = hand.replace(/発/g, "發")
      hand = hand.replace(b, "-")
      hand = hand.replace(r, (rank) => {
        rank = normalizeRank(rank)
        const tile = `z${rank}`
        return createTag(tile, config)
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

export const createTag = (
  tile: string,
  { size, marginY }: PluginConfig,
): string => {
  const src = `${consts.PLUGIN_WEB_EP}/images/${tile}.png`
  return `<img src="${src}" alt="${tile}" class="tile" style="width: auto; height: ${size}px; margin-block: ${marginY}px;">`
}
