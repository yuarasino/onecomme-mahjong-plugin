import applyMahjongPretty from "./logics/applyMahjongPretty"

import type { Comment } from "@onecomme.com/onesdk/types/Comment"

export default async function filter(comment: Comment): Promise<Comment> {
  comment.data.comment = applyMahjongPretty(comment.data.comment)
  return comment
}
