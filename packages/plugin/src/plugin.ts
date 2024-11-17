import * as consts from "@mahjongpretty/core/src/consts"

import type { OnePlugin } from "@onecomme.com/onesdk/types/Plugin"

export default {
  name: consts.PLUGIN_NAME_JA,
  uid: consts.PLUGIN_UID,
  version: consts.PLUGIN_VERSION,
  author: consts.PLUGIN_AUTHOR_JA,
  url: `${consts.PLUGIN_WEB_EP}/index.html`,
  permissions: ["filter.comment"],
  defaultState: {},

  async filterComment(comment) {
    return comment
  },
} satisfies OnePlugin
