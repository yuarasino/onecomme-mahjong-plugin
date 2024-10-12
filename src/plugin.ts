import type { OnePlugin } from "@onecomme.com/onesdk/types/Plugin"

import { replaceMahjongTile } from "./mahjong"

export default {
  name: "わんコメ麻雀プラグイン",
  uid: "net.yuarasino.onecomme-mahjong-plugin",
  version: "1.0.0",
  author: "新篠ゆう",
  url: "https://github.com/yuarasino/onecomme-mahjong-plugin",
  permissions: ["filter.comment"],
  defaultState: {},
  filterComment: async (comment) => {
    comment.data.comment = replaceMahjongTile(comment.data.comment)
    return comment
  },
} satisfies OnePlugin
