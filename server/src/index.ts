import { createServer } from 'node:http'
import { createApp, toNodeListener } from 'h3'
import { HOST, PORT, PUBLIC_DIR } from './config'
import { injectToken, staticServe } from './middleware'
import { logger, setupApi } from './utils'
import './utils/ws'

const app = createApp({
  debug: true,
  onError: (error) => {
    logger.error(error)
  },
  onRequest: async (event) => {
    logger.log(`${event.method}: ${event.path}`)
  },
})
app.use(staticServe(PUBLIC_DIR))
app.use(injectToken())

setupApi(app)

const server = createServer(toNodeListener(app))
server.listen(PORT, () => {
  logger.success(`server is running at http://${HOST}:${PORT}/`)
})
