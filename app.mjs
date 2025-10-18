/* eslint-disable no-console */
/* eslint-disable node/prefer-global/process */
import fs from 'node:fs'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const PORT = process.env.PORT || 3300

app.use('/api', createProxyMiddleware({
  target: `http://localhost:5633`,
  changeOrigin: true,
}))

app.use('/', express.static('./dist'))
app.get((req, res) => {
  const indexHtml = fs.readFileSync('./dist/index.html', 'utf-8')
  res.send(indexHtml)
})

app.listen(PORT, () => {
  console.log(`Local: http://localhost:${PORT}`)
})
