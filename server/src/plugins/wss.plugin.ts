import type { WebSocket } from 'ws'

import { definePlugin } from 'h3'
import { WebSocketServer } from 'ws'
import { HOST, WS_PATH, WS_PORT } from '../config'
import { logger } from '../plugins'

export const connections = new Map<WebSocket, object>()
export function getConnections() {
  return connections
}
export const wss = new WebSocketServer({
  port: WS_PORT,
  path: WS_PATH,
}, () => {
  logger.success(`websocket server is running at ws://${HOST}:${WS_PORT}${WS_PATH}`)
})

wss.on('connection', (socket, request) => {
  const key = request.headers['sec-websocket-key']
  logger.info(`ws connected ${request.socket.remoteAddress}`)
  connections.set(socket, { key })
  socket.send(`wss:hello ${key}`)
  socket.on('message', (data) => {
    socket.send(`wss:${data}`)
  })
  socket.on('close', () => {
    connections.delete(socket)
  })
})
wss.on('error', (err) => {
  logger.error(err)
})

export const wssPlugin = definePlugin(async () => {

})
