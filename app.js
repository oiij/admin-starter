/* eslint-disable no-console */

import fs from 'node:fs'
import { createServer } from 'node:http'
import process from 'node:process'
import { createApp, createRouter, eventHandler, toNodeListener } from 'h3'

const PORT = Number(process.env.PORT) || 5632

const app = createApp()
const router = createRouter()
app.use(router)

router.get('/*', eventHandler(() => {
  try {
    const index = fs.readFileSync('./dist/index.html', 'utf-8')
    return index
  }
  catch {
    return 'Server Error'
  }
}))

const server = createServer(toNodeListener(app))
server.listen(PORT, () => {
  console.log(`server is running at http://127.0.0.1:${PORT}/`)
})
