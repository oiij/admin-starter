import { H3, serve } from 'h3'
import { PORT } from './config'
import { apiPlugin, injectTokenPlugin, loggerPlugin, mongoosePlugin, staticPlugin } from './plugins'

const app = new H3({
  debug: true,
  plugins: [
    mongoosePlugin(),
    loggerPlugin(),
    injectTokenPlugin(),
    apiPlugin(),
    staticPlugin(),
  ],
})

serve(app, {
  port: PORT,
})
