import type { PluginAPI } from "@onecomme.com/onesdk/types/Plugin"
import applyMahjongPretty from "./logics/applyMahjongPretty"

import type { PluginConfig } from "@mahjongpretty/core/src/types"
import type { Comment } from "@onecomme.com/onesdk/types/Comment"

export default async function filter(
  comment: Comment,
  api: PluginAPI,
): Promise<Comment> {
  const config = api.store.store as PluginConfig
  comment.data.comment = applyMahjongPretty(comment.data.comment, config)
  return comment
}
