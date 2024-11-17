import { setOutput } from "@actions/core"
import * as consts from "@mahjongpretty/core/src/consts"

function infobuild() {
  setOutput("name", consts.PLUGIN_NAME)
  setOutput("version", `v${consts.PLUGIN_VERSION}`)
  setOutput("file", `${consts.PLUGIN_NAME}_v${consts.PLUGIN_VERSION}.zip`)
}

infobuild()
