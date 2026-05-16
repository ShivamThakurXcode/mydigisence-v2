import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { ERROR_CODES } from '@mydigisence/constants'
import type { JwtPayload } from '@mydigisence/auth'

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload
  }
}

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
    req.user = verifyAccessToken(token)
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
      req.user = verifyAccessToken(authHeader.slice(7))
    } catch {
      // optional — don't fail
    }
  }
}
