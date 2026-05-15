import type { FastifyInstance } from 'fastify'
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  refreshTokenSchema,
} from '@mydigisence/validations'
import { verifyAccessToken } from '@mydigisence/auth'
import { authService, AuthError } from './auth.service.js'

export async function authRoutes(app: FastifyInstance) {
  // POST /auth/signup
  app.post('/auth/signup', async (req, reply) => {
    const input = signupSchema.parse(req.body)
    const result = await authService.signup(input)
    return reply.code(201).send({ success: true, data: result })
  })

  // POST /auth/login
  app.post('/auth/login', async (req, reply) => {
    const input = loginSchema.parse(req.body)
    const result = await authService.login(input)
    reply.setCookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60,
    })
    return reply.send({
      success: true,
      data: { accessToken: result.accessToken, expiresIn: result.expiresIn, user: result.user },
    })
  })

  // POST /auth/verify-email
  app.post('/auth/verify-email', async (req, reply) => {
    const { token } = verifyEmailSchema.parse(req.body)
    const result = await authService.verifyEmail(token)
    return reply.send({ success: true, data: result })
  })

  // POST /auth/forgot-password
  app.post('/auth/forgot-password', async (req, reply) => {
    const input = forgotPasswordSchema.parse(req.body)
    const result = await authService.forgotPassword(input)
    return reply.send({ success: true, data: result })
  })

  // POST /auth/reset-password
  app.post('/auth/reset-password', async (req, reply) => {
    const input = resetPasswordSchema.parse(req.body)
    const result = await authService.resetPassword(input)
    return reply.send({ success: true, data: result })
  })

  // POST /auth/refresh
  app.post('/auth/refresh', async (req, reply) => {
    const cookieToken = (req.cookies as Record<string, string>)['refreshToken']
    const bodyInput = refreshTokenSchema.safeParse(req.body)
    const token = cookieToken ?? bodyInput.data?.refreshToken
    if (!token) return reply.code(400).send({ success: false, error: 'No refresh token' })

    const result = await authService.refreshTokens(token)
    return reply.send({ success: true, data: result })
  })

  // POST /auth/logout — requires access token
  app.post('/auth/logout', async (req, reply) => {
    const authHeader = (req.headers as Record<string, string>)['authorization']
    const token = authHeader?.replace('Bearer ', '')
    if (token) {
      try {
        const payload = verifyAccessToken(token)
        await authService.logout(payload.sub)
      } catch {
        // Token invalid or expired — still clear the cookie
      }
    }
    reply.clearCookie('refreshToken', { path: '/auth/refresh' })
    return reply.send({ success: true, data: { message: 'Logged out' } })
  })

  // GET /auth/session — requires access token
  app.get('/auth/session', async (req, reply) => {
    const authHeader = (req.headers as Record<string, string>)['authorization']
    const token = authHeader?.replace('Bearer ', '')
    if (!token) return reply.code(401).send({ success: false, error: 'No token' })

    const payload = verifyAccessToken(token)
    const user = await authService.getSession(payload.sub)
    return reply.send({ success: true, data: user })
  })
}

export function authErrorHandler(
  error: unknown,
  req: Parameters<Parameters<FastifyInstance['setErrorHandler']>[0]>[0],
  reply: Parameters<Parameters<FastifyInstance['setErrorHandler']>[0]>[1],
) {
  if (error instanceof AuthError) {
    return reply.code(error.statusCode).send({
      success: false,
      error: { code: error.code, message: error.message },
    })
  }

  if (error instanceof Error && error.name === 'ZodError') {
    return reply.code(422).send({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Invalid input', details: error },
    })
  }

  return reply.code(500).send({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
  })
}
