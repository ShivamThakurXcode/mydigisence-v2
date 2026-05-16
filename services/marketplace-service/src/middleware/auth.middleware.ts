import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyAccessToken } from '@mydigisence/auth'
import { ERROR_CODES } from '@mydigisence/constants'
import type { JwtPayload } from '@mydigisence/auth'

declare module 'fastify' {
  interface FastifyRequest { user?: JwtPayload }
}

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const auth = req.headers['authorization']
  if (!auth?.startsWith('Bearer ')) return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_INVALID, message: 'Unauthorized' } })
  try { req.user = verifyAccessToken(auth.slice(7)) }
  catch { return reply.code(401).send({ success: false, error: { code: ERROR_CODES.TOKEN_EXPIRED, message: 'Token expired' } }) }
}

export async function optionalAuth(req: FastifyRequest, _reply: FastifyReply) {
  const auth = req.headers['authorization']
  if (auth?.startsWith('Bearer ')) try { req.user = verifyAccessToken(auth.slice(7)) } catch { /* optional */ }
}
