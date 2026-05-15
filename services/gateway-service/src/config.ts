export const config = {
  port: Number(process.env['GATEWAY_SERVICE_PORT'] ?? 4000),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000').split(','),
  services: {
    auth: process.env['AUTH_SERVICE_URL'] ?? 'http://localhost:4001',
    user: process.env['USER_SERVICE_URL'] ?? 'http://localhost:4002',
    profile: process.env['PROFILE_SERVICE_URL'] ?? 'http://localhost:4003',
    marketplace: process.env['MARKETPLACE_SERVICE_URL'] ?? 'http://localhost:4004',
    booking: process.env['BOOKING_SERVICE_URL'] ?? 'http://localhost:4005',
    search: process.env['SEARCH_SERVICE_URL'] ?? 'http://localhost:4006',
    ai: process.env['AI_SERVICE_URL'] ?? 'http://localhost:4007',
    notification: process.env['NOTIFICATION_SERVICE_URL'] ?? 'http://localhost:4008',
    websocket: process.env['WEBSOCKET_SERVICE_URL'] ?? 'http://localhost:4010',
  },
  redis: {
    url: process.env['REDIS_URL'] ?? 'redis://localhost:6379',
    password: process.env['REDIS_PASSWORD'],
  },
} as const
