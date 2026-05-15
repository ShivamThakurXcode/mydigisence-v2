import jwt from 'jsonwebtoken'
import { TOKEN_TTL } from '@mydigisence/constants'
import type { JwtPayload, RefreshTokenPayload, EmailTokenPayload, TokenPair } from './types.js'

function getSecret(): string {
  const secret = process.env['JWT_SECRET']
  if (!secret) throw new Error('JWT_SECRET environment variable is required')
  return secret
}

export function signAccessToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, getSecret(), {
    expiresIn: TOKEN_TTL.ACCESS,
    algorithm: 'HS256',
  })
}

export function signRefreshToken(payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, getSecret(), {
    expiresIn: TOKEN_TTL.REFRESH,
    algorithm: 'HS256',
  })
}

export function signEmailToken(payload: Omit<EmailTokenPayload, 'iat' | 'exp'>): string {
  const ttl =
    payload.purpose === 'verify' ? TOKEN_TTL.EMAIL_VERIFY : TOKEN_TTL.PASSWORD_RESET
  return jwt.sign(payload, getSecret(), {
    expiresIn: ttl,
    algorithm: 'HS256',
  })
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, getSecret()) as JwtPayload
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, getSecret()) as RefreshTokenPayload
}

export function verifyEmailToken(token: string): EmailTokenPayload {
  return jwt.verify(token, getSecret()) as EmailTokenPayload
}

export function createTokenPair(
  payload: Omit<JwtPayload, 'iat' | 'exp'>,
): TokenPair {
  const tokenId = crypto.randomUUID()
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken({ sub: payload.sub, tokenId })
  return {
    accessToken,
    refreshToken,
    expiresIn: TOKEN_TTL.ACCESS,
  }
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as JwtPayload
  } catch {
    return null
  }
}
