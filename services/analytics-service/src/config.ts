export const config = {
  port: Number(process.env['ANALYTICS_SERVICE_PORT'] ?? 4016),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4000').split(','),
} as const
