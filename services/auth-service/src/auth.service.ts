import { prisma } from '@mydigisence/database'
import {
  hashPassword,
  verifyPassword,
  signEmailToken,
  verifyEmailToken,
  createTokenPair,
  verifyRefreshToken,
} from '@mydigisence/auth'
import { ERROR_CODES, REDIS_KEYS, TOKEN_TTL } from '@mydigisence/constants'
import type {
  SignupInput,
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '@mydigisence/validations'
import { redis } from './redis.js'
import { sendVerificationEmail, sendPasswordResetEmail } from './email.js'
import { createLogger } from '@mydigisence/logger'

const log = createLogger('auth-service')

export class AuthError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 400,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export class AuthService {
  async signup(input: SignupInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } })
    if (existing) {
      throw new AuthError(ERROR_CODES.EMAIL_ALREADY_EXISTS, 'Email already in use', 409)
    }

    const passwordHash = await hashPassword(input.password)

    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
        roles: [],
        workspaceIds: [],
        profile: {
          create: {
            username: await this.generateUsername(input.firstName, input.lastName),
            displayName: `${input.firstName} ${input.lastName}`,
          },
        },
      },
      include: { profile: true },
    })

    const token = signEmailToken({ sub: user.id, email: user.email, purpose: 'verify' })
    await redis.setex(
      `${REDIS_KEYS.EMAIL_VERIFY}${user.id}`,
      TOKEN_TTL.EMAIL_VERIFY,
      token,
    )

    await sendVerificationEmail(user.email, token).catch((err) =>
      log.warn({ err }, 'Failed to send verification email'),
    )

    log.info({ userId: user.id }, 'User signed up')
    return { id: user.id, email: user.email, message: 'Check your email to verify your account' }
  }

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) {
      throw new AuthError(ERROR_CODES.INVALID_CREDENTIALS, 'Invalid credentials', 401)
    }

    const valid = await verifyPassword(input.password, user.passwordHash)
    if (!valid) {
      throw new AuthError(ERROR_CODES.INVALID_CREDENTIALS, 'Invalid credentials', 401)
    }

    if (!user.emailVerified) {
      throw new AuthError(ERROR_CODES.EMAIL_NOT_VERIFIED, 'Please verify your email first', 403)
    }

    if (!user.isActive) {
      throw new AuthError('ACCOUNT_SUSPENDED', 'Account has been suspended', 403)
    }

    const tokens = createTokenPair({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    })

    // Cache session in Redis
    await redis.setex(
      `${REDIS_KEYS.SESSION}${user.id}`,
      TOKEN_TTL.SESSION,
      JSON.stringify({ userId: user.id, email: user.email }),
    )

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    log.info({ userId: user.id }, 'User logged in')
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
        workspaceIds: user.workspaceIds,
      },
    }
  }

  async verifyEmail(token: string) {
    let payload
    try {
      payload = verifyEmailToken(token)
    } catch {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Invalid or expired token', 400)
    }

    if (payload.purpose !== 'verify') {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Invalid token type', 400)
    }

    const stored = await redis.get(`${REDIS_KEYS.EMAIL_VERIFY}${payload.sub}`)
    if (!stored || stored !== token) {
      throw new AuthError(ERROR_CODES.TOKEN_EXPIRED, 'Token has expired', 400)
    }

    await prisma.user.update({
      where: { id: payload.sub },
      data: { emailVerified: true },
    })

    await redis.del(`${REDIS_KEYS.EMAIL_VERIFY}${payload.sub}`)

    log.info({ userId: payload.sub }, 'Email verified')
    return { message: 'Email verified successfully' }
  }

  async forgotPassword(input: ForgotPasswordInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } })
    // Always return success to prevent email enumeration
    if (!user) return { message: 'If that email exists, a reset link has been sent' }

    const token = signEmailToken({ sub: user.id, email: user.email, purpose: 'reset' })
    await redis.setex(
      `${REDIS_KEYS.PASSWORD_RESET}${user.id}`,
      TOKEN_TTL.PASSWORD_RESET,
      token,
    )

    await sendPasswordResetEmail(user.email, token).catch((err) =>
      log.warn({ err }, 'Failed to send reset email'),
    )

    return { message: 'If that email exists, a reset link has been sent' }
  }

  async resetPassword(input: ResetPasswordInput) {
    let payload
    try {
      payload = verifyEmailToken(input.token)
    } catch {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Invalid or expired token', 400)
    }

    if (payload.purpose !== 'reset') {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Invalid token type', 400)
    }

    const stored = await redis.get(`${REDIS_KEYS.PASSWORD_RESET}${payload.sub}`)
    if (!stored || stored !== input.token) {
      throw new AuthError(ERROR_CODES.TOKEN_EXPIRED, 'Token has expired', 400)
    }

    const passwordHash = await hashPassword(input.password)
    await prisma.user.update({
      where: { id: payload.sub },
      data: { passwordHash },
    })

    await redis.del(`${REDIS_KEYS.PASSWORD_RESET}${payload.sub}`)
    // Invalidate all sessions
    await redis.del(`${REDIS_KEYS.SESSION}${payload.sub}`)

    log.info({ userId: payload.sub }, 'Password reset')
    return { message: 'Password reset successfully' }
  }

  async refreshTokens(refreshToken: string) {
    let payload
    try {
      payload = verifyRefreshToken(refreshToken)
    } catch {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Invalid refresh token', 401)
    }

    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user || !user.isActive) {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'User not found', 401)
    }

    const tokens = createTokenPair({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    })

    return tokens
  }

  async logout(userId: string) {
    await redis.del(`${REDIS_KEYS.SESSION}${userId}`)
    log.info({ userId }, 'User logged out')
    return { message: 'Logged out successfully' }
  }

  async getSession(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: true,
        workspaceIds: true,
        emailVerified: true,
        isActive: true,
        profile: { select: { username: true, displayName: true, avatar: true } },
      },
    })

    if (!user || !user.isActive) {
      throw new AuthError(ERROR_CODES.TOKEN_INVALID, 'Session not found', 401)
    }

    return user
  }

  private async generateUsername(firstName: string, lastName: string): Promise<string> {
    const base = `${firstName}${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 20)

    let username = base
    let suffix = 0

    while (true) {
      const exists = await prisma.profile.findUnique({ where: { username } })
      if (!exists) return username
      suffix++
      username = `${base}${suffix}`
    }
  }
}

export const authService = new AuthService()
