import type { OnePlugin } from "@onecomme.com/onesdk/types/Plugin"

import * as constants from "./constants"
import { replaceMahjongTile } from "./mahjong"

export default {
  name: constants.PLUGIN_NAME,
  uid: constants.PLUGIN_UID,
  version: constants.PLUGIN_VERSION,
  author: constants.PLUGIN_AUTHOR,
  url: constants.PLUGIN_URL,
  permissions: ["filter.comment"],
  defaultState: {},
  filterComment: async (comment) => {
    comment.data.comment = replaceMahjongTile(comment.data.comment)
    return comment
  },
} satisfies OnePlugin
