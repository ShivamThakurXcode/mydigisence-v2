import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { config } from './config.js'

export const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${config.r2.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: config.r2.accessKeyId,
    secretAccessKey: config.r2.secretAccessKey,
  },
})

export async function uploadToR2(key: string, body: Buffer, contentType: string): Promise<string> {
  await s3.send(new PutObjectCommand({
    Bucket: config.r2.bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000',
  }))
  return `${config.r2.publicUrl}/${key}`
}

export async function deleteFromR2(key: string): Promise<void> {
  await s3.send(new DeleteObjectCommand({ Bucket: config.r2.bucketName, Key: key }))
}

export async function getSignedDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: config.r2.bucketName, Key: key }), { expiresIn: expiresInSeconds })
}
