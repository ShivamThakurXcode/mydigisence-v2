export const config = {
  port: Number(process.env['SEARCH_SERVICE_PORT'] ?? 4006),
  elasticsearchUrl: process.env['ELASTICSEARCH_URL'] ?? 'http://localhost:9200',
  corsOrigins: (process.env['CORS_ORIGINS'] ?? 'http://localhost:3000,http://localhost:4000').split(','),
} as const
