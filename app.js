import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { H3, proxyRequest, serve, serveStatic } from 'h3'
import { RELEASE_PROXY } from './config/proxy'

const PORT = process.env.PORT || 3300

const app = new H3()

for (const key in RELEASE_PROXY) {
  app.use(`${key}`, async (handler) => {
    return await proxyRequest(handler, RELEASE_PROXY[key])
  })
}

app.use((event) => {
  return serveStatic(event, {
    indexNames: ['/index.html'],
    getContents: id => readFile(join('dist', id)),
    getMeta: async (id) => {
      const stats = await stat(join('dist', id)).catch(() => {})
      if (stats?.isFile()) {
        return {
          size: stats.size,
          mtime: stats.mtimeMs,
        }
      }
    },
  })
})

serve(app, { port: PORT })
