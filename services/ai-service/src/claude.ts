import Anthropic from '@anthropic-ai/sdk'
import { Redis } from 'ioredis'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'
import { sha256 } from '@mydigisence/utils'

const log = createLogger('ai-service:claude')
const client = new Anthropic({ apiKey: config.anthropicKey })
const redis = new Redis(config.redisUrl, { lazyConnect: true })
redis.connect().catch(() => log.warn('Redis not available — AI response caching disabled'))

export async function generate(prompt: string, systemPrompt?: string, useCache = true): Promise<string> {
  const cacheKey = `ai:${await sha256(`${systemPrompt ?? ''}::${prompt}`)}`

  if (useCache) {
    const cached = await redis.get(cacheKey).catch(() => null)
    if (cached) { log.debug({ cacheKey }, 'AI cache hit'); return cached }
  }

  const message = await client.messages.create({
    model: config.model,
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: prompt }],
  })

  const result = message.content[0]?.type === 'text' ? message.content[0].text : ''

  if (useCache && result) {
    await redis.setex(cacheKey, config.cacheTtlSeconds, result).catch(() => null)
  }

  return result
}

export const SYSTEM_PROMPTS = {
  bio: 'You are an expert at writing compelling, professional bio descriptions for digital profiles. Write in first person. Be concise (2-3 sentences max). Highlight key value propositions. No markdown.',
  seo: 'You are an SEO expert. Generate optimized meta descriptions and title suggestions. Keep meta descriptions under 160 characters. Be specific and include relevant keywords.',
  service: 'You are a professional copywriter specializing in service descriptions. Write engaging, benefit-focused descriptions that convert visitors to customers. Keep it under 200 words.',
  social: 'You are a social media expert. Write platform-appropriate bios and posts. Be engaging and authentic. Use relevant emojis sparingly.',
}
