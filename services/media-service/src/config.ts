export const config = {
  port: Number(process.env['MEDIA_SERVICE_PORT'] ?? 4011),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  r2: {
    accountId: process.env['R2_ACCOUNT_ID'] ?? '',
    accessKeyId: process.env['R2_ACCESS_KEY_ID'] ?? '',
    secretAccessKey: process.env['R2_SECRET_ACCESS_KEY'] ?? '',
    bucketName: process.env['R2_BUCKET_NAME'] ?? 'mydigisence-media',
    publicUrl: process.env['R2_PUBLIC_URL'] ?? 'http://localhost:9000',
  },
  maxFileSizeMb: 10,
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'],
} as const
