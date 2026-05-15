import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { ERROR_CODES } from '@mydigisence/constants'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers['authorization']
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.code(401).send({
      success: false,
      error: { code: ERROR_CODES.TOKEN_INVALID, message: 'No authorization token' },
    })
  }

  const token = authHeader.slice(7)
  try {
    const payload = verifyAccessToken(token)
    // Attach user info to request for downstream use
    ;(req as FastifyRequest & { user: typeof payload }).user = payload
  } catch {
    return reply.code(401).send({
      success: false,
      error: { code: ERROR_CODES.TOKEN_EXPIRED, message: 'Token invalid or expired' },
    })
  }
}

export async function optionalAuth(req: FastifyRequest, _reply: FastifyReply) {
  const authHeader = req.headers['authorization']
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7)
      const payload = verifyAccessToken(token)
      ;(req as FastifyRequest & { user: typeof payload }).user = payload
    } catch {
      // Optional — don't fail
    }
  }
}
