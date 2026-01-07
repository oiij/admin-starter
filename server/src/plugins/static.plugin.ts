import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { definePlugin, serveStatic } from 'h3'
import { PUBLIC_DIR } from '../config'

export const staticPlugin = definePlugin(async (h3) => {
  h3.use(`/${PUBLIC_DIR}/**`, async (handler) => {
    return serveStatic(handler, {
      getContents: id => readFile(join(import.meta.dirname, '../../', id)),
      getMeta: async (id) => {
        const stats = await stat(join(import.meta.dirname, '../../', id)).catch(() => {})

        if (stats?.isFile()) {
          return {
            size: stats.size,
            mtime: stats.mtimeMs,
          }
        }
      },
    })
  })
})
