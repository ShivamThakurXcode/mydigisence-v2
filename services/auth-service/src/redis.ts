import { Redis } from 'ioredis'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'

const log = createLogger('auth-service:redis')

export const redis = new Redis(config.redis.url, {
  password: config.redis.password,
  lazyConnect: true,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

redis.on('connect', () => log.info('Redis connected'))
redis.on('error', (err) => log.error({ err }, 'Redis error'))
