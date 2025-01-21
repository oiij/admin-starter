import type { App } from 'h3'
import { useBase } from 'h3'
import * as routes from '../api'

export function setupApi(app: App) {
  Object.values(routes).forEach((f) => {
    app.use(useBase('/api', f.handler))
  })
}
