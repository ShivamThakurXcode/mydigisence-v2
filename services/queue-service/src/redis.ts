import { Redis } from 'ioredis'

export const redisConnection = new Redis(process.env['REDIS_URL'] ?? 'redis://localhost:6379', {
  password: process.env['REDIS_PASSWORD'] || undefined,
  maxRetriesPerRequest: null,
  lazyConnect: false,
})
