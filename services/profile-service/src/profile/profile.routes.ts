import type { FastifyInstance } from 'fastify'
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js'
import { profileService } from './profile.service.js'
import { updateProfileSchema, updateProfileSectionsSchema } from '@mydigisence/validations'

export async function profileRoutes(app: FastifyInstance) {
  // GET /profiles/me — get current user's profile
  app.get('/profiles/me', { preHandler: [authenticate] }, async (req, reply) => {
    const profile = await profileService.getMyProfile(req.user!.sub)
    return reply.send({ success: true, data: profile })
  })

  // GET /profiles/username/:username — public profile by username
  app.get('/profiles/username/:username', { preHandler: [optionalAuth] }, async (req, reply) => {
    const { username } = req.params as { username: string }
    const profile = await profileService.getProfileByUsername(username, req.user?.sub)
    return reply.send({ success: true, data: profile })
  })

  // GET /profiles/:id — get profile by ID (owner only)
  app.get('/profiles/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const profile = await profileService.getProfileById(id, req.user!.sub)
    return reply.send({ success: true, data: profile })
  })

  // PUT /profiles/:id — update profile metadata
  app.put('/profiles/:id', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = updateProfileSchema.parse(req.body)
    const profile = await profileService.updateProfile(req.user!.sub, id, body)
    return reply.send({ success: true, data: profile })
  })

  // GET /profiles/:id/sections — get ordered section config
  app.get('/profiles/:id/sections', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const sections = await profileService.getSections(req.user!.sub, id)
    return reply.send({ success: true, data: sections })
  })

  // PUT /profiles/:id/sections — reorder/enable/disable sections
  app.put('/profiles/:id/sections', { preHandler: [authenticate] }, async (req, reply) => {
    const { id } = req.params as { id: string }
    const body = updateProfileSectionsSchema.parse(req.body)
    const result = await profileService.updateSections(req.user!.sub, id, body)
    return reply.send({ success: true, data: result })
  })
}
