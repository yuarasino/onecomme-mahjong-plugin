import type { PluginConfig } from "@mahjongpretty/core/src/types"

export const PLUGIN_NAME = "mahjongpretty"
export const PLUGIN_NAME_JA = "MahjongPretty"
export const PLUGIN_UID = `net.yuarasino.${PLUGIN_NAME}`
export const PLUGIN_VERSION = "1.0.0"
export const PLUGIN_AUTHOR = "yuarasino"
export const PLUGIN_AUTHOR_JA = "新篠ゆう"
export const PLUGIN_WEB_EP = `http://localhost:11180/plugins/${PLUGIN_UID}`
export const PLUGIN_API_EP = `http://localhost:11180/api/plugins/${PLUGIN_UID}`

export const DEFAULT_CONFIG = {
  imageClass: "tile",
  imageHeight: 36,
  imageMarginX: 4,
  imageMarginY: 4,
} as PluginConfig
