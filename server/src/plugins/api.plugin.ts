import { definePlugin, withBase } from 'h3'
import * as routes from '../api'
import { logger } from './logger.plugin'

export const apiPlugin = definePlugin(async (h3) => {
  const routesValues = Object.values(routes)
  routesValues.forEach((f) => {
    h3.use(withBase('/api', f.handler))
  })
  logger.success(`Loaded ${routesValues.length} API routes`)
})
