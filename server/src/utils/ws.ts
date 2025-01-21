import type { WebSocket } from 'ws'
import { WebSocketServer } from 'ws'
import { logger } from '.'
import { HOST, WS_PATH, WS_PORT } from '../config'

export const connections = new Map<WebSocket, object>()
export function getConnections() {
  return connections
}
export const wss = new WebSocketServer({
  port: WS_PORT,
  path: WS_PATH,
}, () => {
  logger.success(`ws server is running at ws://${HOST}:${WS_PORT}${WS_PATH}`)
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
