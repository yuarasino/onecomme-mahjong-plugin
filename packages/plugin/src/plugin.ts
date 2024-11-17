import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import filter from "./filter"

import type { OnePlugin, PluginAPI } from "@onecomme.com/onesdk/types/Plugin"

let m_api: PluginAPI

export default {
  name: consts.PLUGIN_NAME_JA,
  uid: consts.PLUGIN_UID,
  version: consts.PLUGIN_VERSION,
  author: consts.PLUGIN_AUTHOR_JA,
  url: `${consts.PLUGIN_WEB_EP}/index.html`,
  permissions: ["filter.comment"],
  defaultState: deepCopy(consts.DEFAULT_CONFIG),

  init(api) {
    m_api = api
  },

  async filterComment(comment) {
    return await filter(comment, m_api)
  },
} satisfies OnePlugin
