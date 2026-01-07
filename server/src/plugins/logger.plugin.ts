import { consola } from 'consola'
import { definePlugin } from 'h3'

export const logger = consola.withTag('server')

export const loggerPlugin = definePlugin(async (h3) => {
  if (h3.config.debug) {
    h3.use((request) => {
      logger.log(`${request.req.method}: ${request.url}`)
    })
  }
})
