import * as consts from "@mahjongpretty/core/src/consts"
import fs from "fs-extra"
import Mustache from "mustache"

function renderSync(src: string, dst: string) {
  let text = fs.readFileSync(src, { encoding: "utf-8" })
  text = Mustache.render(text, consts)
  fs.writeFileSync(dst, text, { encoding: "utf-8" })
}

function postbuild() {
  fs.removeSync("dist")
  fs.mkdirSync("dist")
  fs.copySync("packages/plugin/dist", "dist")
  renderSync("scripts/README.temp", "dist/README.txt")
}

postbuild()
