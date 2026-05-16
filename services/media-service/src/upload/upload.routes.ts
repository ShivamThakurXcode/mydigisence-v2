import type { FastifyInstance } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { uploadToR2, deleteFromR2, getSignedDownloadUrl } from '../r2.js'
import { config } from '../config.js'
import { generateId } from '@mydigisence/utils'

async function authenticate(req: Parameters<Parameters<FastifyInstance['addHook']>[1]>[0], reply: Parameters<Parameters<FastifyInstance['addHook']>[1]>[1]) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return reply.code(401).send({ success: false, error: 'Unauthorized' })
  try { ;(req as typeof req & { userId: string }).userId = verifyAccessToken(auth.slice(7)).sub }
  catch { return reply.code(401).send({ success: false, error: 'Token expired' }) }
}

export async function uploadRoutes(app: FastifyInstance) {
  // POST /upload — multipart upload
  app.post('/upload', { preHandler: [authenticate] }, async (req, reply) => {
    const userId = (req as typeof req & { userId: string }).userId
    const parts = req.parts()
    let fileBuffer: Buffer | null = null
    let contentType = 'application/octet-stream'
    let originalName = 'file'
    let folder = 'uploads'

    for await (const part of parts) {
      if (part.type === 'file') {
        contentType = part.mimetype
        originalName = part.filename
        const chunks: Buffer[] = []
        for await (const chunk of part.file) {
          chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
        }
        fileBuffer = Buffer.concat(chunks)

        if (fileBuffer.length > config.maxFileSizeMb * 1024 * 1024) {
          return reply.code(413).send({ success: false, error: { message: `File too large. Max ${config.maxFileSizeMb}MB` } })
        }
        if (!config.allowedMimeTypes.includes(contentType as typeof config.allowedMimeTypes[number])) {
          return reply.code(415).send({ success: false, error: { message: 'Unsupported file type' } })
        }
      } else {
        if (part.fieldname === 'folder') folder = part.value as string
      }
    }

    if (!fileBuffer) return reply.code(400).send({ success: false, error: { message: 'No file provided' } })

    const ext = originalName.split('.').pop() ?? 'bin'
    const key = `${folder}/${userId}/${generateId()}.${ext}`
    const url = await uploadToR2(key, fileBuffer, contentType)

    return reply.code(201).send({ success: true, data: { key, url, contentType, size: fileBuffer.length } })
  })

  // DELETE /upload/:key — delete file
  app.delete('/upload', { preHandler: [authenticate] }, async (req, reply) => {
    const { key } = req.body as { key: string }
    if (!key) return reply.code(400).send({ success: false, error: { message: 'key required' } })
    await deleteFromR2(key)
    return reply.send({ success: true })
  })

  // GET /upload/signed-url — get signed download URL for private files
  app.get('/upload/signed-url', { preHandler: [authenticate] }, async (req, reply) => {
    const { key, expires } = req.query as { key: string; expires?: string }
    const url = await getSignedDownloadUrl(key, Number(expires ?? 3600))
    return reply.send({ success: true, data: { url } })
  })
}
