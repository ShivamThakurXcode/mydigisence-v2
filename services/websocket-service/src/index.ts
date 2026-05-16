import { createServer } from 'http'
import { Server } from 'socket.io'
import { Redis } from 'ioredis'
import { verifyAccessToken } from '@mydigisence/auth'
import { prisma } from '@mydigisence/database'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('websocket-service')
const PORT = Number(process.env['WEBSOCKET_SERVICE_PORT'] ?? 4015)
const REDIS_URL = process.env['REDIS_URL'] ?? 'redis://localhost:6379'

const httpServer = createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', service: 'websocket-service' }))
    return
  }
  res.writeHead(404); res.end()
})

const io = new Server(httpServer, {
  cors: { origin: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000').split(','), credentials: true },
  transports: ['websocket', 'polling'],
})

// Auth middleware
io.use((socket, next) => {
  const token = (socket.handshake.auth as { token?: string }).token
  if (!token) return next(new Error('Authentication required'))
  try {
    const payload = verifyAccessToken(token)
    ;(socket as typeof socket & { userId: string }).userId = payload.sub
    next()
  } catch { next(new Error('Invalid token')) }
})

// /messages namespace
const messagesNs = io.of('/messages')
messagesNs.on('connection', (socket) => {
  const userId = (socket as typeof socket & { userId: string }).userId
  log.info({ userId }, 'Messages connected')

  socket.on('join:conversation', (conversationId: string) => { void socket.join(`conversation:${conversationId}`) })

  socket.on('message:send', async (data: { conversationId: string; content: string }) => {
    try {
      const message = await prisma.message.create({ data: { conversationId: data.conversationId, authorId: userId, content: data.content } })
      messagesNs.to(`conversation:${data.conversationId}`).emit('message:new', message)
    } catch (err) { log.error({ err }, 'Failed to save message'); socket.emit('error', { message: 'Failed to send message' }) }
  })

  socket.on('disconnect', () => log.info({ userId }, 'Messages disconnected'))
})

// /notifications namespace
const notificationsNs = io.of('/notifications')
notificationsNs.on('connection', (socket) => {
  const userId = (socket as typeof socket & { userId: string }).userId
  void socket.join(`user:${userId}`)
  socket.on('disconnect', () => log.info({ userId }, 'Notifications disconnected'))
})

// /dashboard namespace
const dashboardNs = io.of('/dashboard')
dashboardNs.on('connection', (socket) => {
  socket.on('join:workspace', (workspaceId: string) => { void socket.join(`workspace:${workspaceId}`) })
})

httpServer.listen(PORT, '0.0.0.0', () => { log.info(`WebSocket service running on port ${PORT}`) })

const shutdown = async () => {
  io.close(); await prisma.$disconnect(); process.exit(0)
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
