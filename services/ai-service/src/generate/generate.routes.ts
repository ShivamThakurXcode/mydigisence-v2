import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { generate, SYSTEM_PROMPTS } from '../claude.js'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('ai-service:routes')

const generateSchema = z.object({
  type: z.enum(['bio', 'seo', 'service', 'social', 'custom']),
  context: z.string().min(10).max(2000),
  customSystemPrompt: z.string().optional(),
  noCache: z.boolean().default(false),
})

export async function generateRoutes(app: FastifyInstance) {
  // POST /ai/generate — generate AI content
  app.post('/ai/generate', async (req, reply) => {
    const { type, context, customSystemPrompt, noCache } = generateSchema.parse(req.body)

    const systemPrompt = type === 'custom' ? customSystemPrompt : SYSTEM_PROMPTS[type]
    if (!systemPrompt) return reply.code(400).send({ success: false, error: { message: 'No system prompt for custom type without customSystemPrompt' } })

    try {
      const result = await generate(context, systemPrompt, !noCache)
      return reply.send({ success: true, data: { result, type } })
    } catch (err) {
      log.error({ err }, 'Claude API error')
      return reply.code(503).send({ success: false, error: { message: 'AI service temporarily unavailable' } })
    }
  })

  // POST /ai/generate/bio — shortcut for bio generation
  app.post('/ai/generate/bio', async (req, reply) => {
    const { name, role, skills, experience } = req.body as { name: string; role?: string; skills?: string[]; experience?: string }
    const context = `Name: ${name}\nRole: ${role ?? 'Professional'}\nSkills: ${skills?.join(', ') ?? 'various'}\nExperience: ${experience ?? 'Not specified'}\n\nGenerate a professional bio.`
    const result = await generate(context, SYSTEM_PROMPTS.bio).catch(() => '')
    return reply.send({ success: true, data: { result } })
  })

  // POST /ai/generate/seo — SEO meta generation
  app.post('/ai/generate/seo', async (req, reply) => {
    const { title, description, keywords } = req.body as { title: string; description?: string; keywords?: string[] }
    const context = `Page title: ${title}\nDescription: ${description ?? ''}\nKeywords: ${keywords?.join(', ') ?? ''}\n\nGenerate SEO meta title and description.`
    const result = await generate(context, SYSTEM_PROMPTS.seo).catch(() => '')
    return reply.send({ success: true, data: { result } })
  })

  // POST /ai/generate/service — service description generation
  app.post('/ai/generate/service', async (req, reply) => {
    const { title, category, features } = req.body as { title: string; category?: string; features?: string[] }
    const context = `Service: ${title}\nCategory: ${category ?? ''}\nKey features: ${features?.join(', ') ?? ''}\n\nWrite a compelling service description.`
    const result = await generate(context, SYSTEM_PROMPTS.service).catch(() => '')
    return reply.send({ success: true, data: { result } })
  })

  // POST /ai/suggestions — profile improvement suggestions
  app.post('/ai/suggestions', async (req, reply) => {
    const { profileData } = req.body as { profileData: object }
    const context = `Profile data: ${JSON.stringify(profileData)}\n\nProvide 3-5 specific, actionable suggestions to improve this profile for better discoverability and conversion. Format as a numbered list.`
    const result = await generate(context, 'You are a digital presence expert who helps businesses and professionals optimize their online profiles.').catch(() => '')
    return reply.send({ success: true, data: { suggestions: result } })
  })
}
