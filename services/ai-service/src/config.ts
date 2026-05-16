export const config = {
  port: Number(process.env['AI_SERVICE_PORT'] ?? 4013),
  anthropicKey: process.env['ANTHROPIC_API_KEY'] ?? '',
  openaiKey: process.env['OPENAI_API_KEY'] ?? '',
  redisUrl: process.env['REDIS_URL'] ?? 'redis://localhost:6379',
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4000').split(','),
  model: 'claude-sonnet-4-6',
  cacheTtlSeconds: 3600,
} as const
