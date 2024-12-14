import * as consts from "@mahjongpretty/core/src/consts"
import { deepCopy } from "@mahjongpretty/core/src/utils"
import filter from "./filter"

import type { OnePlugin, PluginAPI } from "@onecomme.com/onesdk/types/Plugin"

let m_api: PluginAPI

const plugin: OnePlugin = {
  name: consts.PLUGIN_NAME_JA,
  uid: consts.PLUGIN_UID,
  version: consts.PLUGIN_VERSION,
  author: consts.PLUGIN_AUTHOR_JA,
  url: consts.BOOTH_URL,
  permissions: ["filter.comment"],
  defaultState: {},

  async filterComment(comment) {
    return await filter(comment)
  },
}

export default plugin
