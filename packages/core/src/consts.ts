import type { PluginConfig } from "@mahjongpretty/core/src/types"

export const PLUGIN_NAME = "onecomme-mahjong-plugin"
export const PLUGIN_NAME_JA = "わんコメ麻雀プラグイン"
export const PLUGIN_UID = `net.yuarasino.${PLUGIN_NAME}`
export const PLUGIN_VERSION = "1.1.0"
export const PLUGIN_AUTHOR = "yuarasino"
export const PLUGIN_AUTHOR_JA = "新篠ゆう"
export const PLUGIN_WEB_EP = `http://localhost:11180/plugins/${PLUGIN_UID}`
export const PLUGIN_API_EP = `http://localhost:11180/api/plugins/${PLUGIN_UID}`

export const BOOTH_URL = "https://yuarasino.booth.pm/items/6188675"
export const GITHUB_URL = "https://github.com/yuarasino/mahjongpretty"
export const X_URL = "https://x.com/yuarasino"

export const DEFAULT_CONFIG: PluginConfig = {
  imageHeight: 36,
  imageMarginX: 4,
  imageMarginY: 4,
  imageClass: "tile",
}
