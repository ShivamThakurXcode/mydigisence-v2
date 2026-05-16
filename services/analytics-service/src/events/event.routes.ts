import type { FastifyInstance } from 'fastify'
import { prisma } from '@mydigisence/database'
import { z } from 'zod'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('analytics-service')

const eventSchema = z.object({
  eventType: z.string().min(1).max(100),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
  sessionId: z.string().optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  data: z.record(z.unknown()).default({}),
})

const batchSchema = z.object({
  events: z.array(eventSchema).max(100),
})

export async function eventRoutes(app: FastifyInstance) {
  // POST /analytics/events — ingest single event
  app.post('/analytics/events', async (req, reply) => {
    const event = eventSchema.parse(req.body)
    await prisma.analyticsEvent.create({ data: event }).catch((err) => log.warn({ err }, 'Failed to store event'))
    return reply.code(202).send({ success: true })
  })

  // POST /analytics/events/batch — ingest batch of events
  app.post('/analytics/events/batch', async (req, reply) => {
    const { events } = batchSchema.parse(req.body)
    await prisma.analyticsEvent.createMany({ data: events }).catch((err) => log.warn({ err }, 'Failed to store batch events'))
    return reply.code(202).send({ success: true, data: { count: events.length } })
  })

  // GET /analytics/reports/:workspaceId — workspace analytics summary
  app.get('/analytics/reports/:workspaceId', async (req, reply) => {
    const { workspaceId } = req.params as { workspaceId: string }
    const q = req.query as { from?: string; to?: string }
    const from = q.from ? new Date(q.from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const to = q.to ? new Date(q.to) : new Date()

    const [totalEvents, eventsByType, recentEvents] = await Promise.all([
      prisma.analyticsEvent.count({ where: { workspaceId, createdAt: { gte: from, lte: to } } }),
      prisma.analyticsEvent.groupBy({ by: ['eventType'], where: { workspaceId, createdAt: { gte: from, lte: to } }, _count: { eventType: true }, orderBy: { _count: { eventType: 'desc' } }, take: 10 }),
      prisma.analyticsEvent.findMany({ where: { workspaceId }, orderBy: { createdAt: 'desc' }, take: 10 }),
    ])

    return reply.send({
      success: true,
      data: {
        workspaceId, period: { from, to },
        summary: { totalEvents },
        eventsByType: eventsByType.map((e) => ({ type: e.eventType, count: e._count.eventType })),
        recentEvents,
      },
    })
  })

  // GET /analytics/platform — platform-wide stats (admin only)
  app.get('/analytics/platform', async (_req, reply) => {
    const [totalUsers, totalWorkspaces, totalBookings, totalEvents] = await Promise.all([
      prisma.user.count(),
      prisma.workspace.count(),
      prisma.booking.count(),
      prisma.analyticsEvent.count(),
    ])
    return reply.send({ success: true, data: { totalUsers, totalWorkspaces, totalBookings, totalEvents } })
  })
}
