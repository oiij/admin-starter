import { readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { to } from 'await-to-js'
import { defineEventHandler, serveStatic } from 'h3'
import mime from 'mime'

export function staticServe(dir = 'public') {
  return defineEventHandler(async (event) => {
    const [err, assets] = await to(serveStatic(event, {
      fallthrough: false,
      getContents: id => readFileSync(join(dir, id)),
      getMeta: async (id) => {
        const stats = statSync(join(dir, id))
        if (!stats || !stats.isFile()) {
          return
        }
        return {
          size: stats.size,
          mtime: stats.mtimeMs,
          type: mime.getType(id) ?? '',
        }
      },
    }))
    if (!err && assets) {
      return assets
    }
  })
}
