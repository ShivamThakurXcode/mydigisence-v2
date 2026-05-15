import nodemailer from 'nodemailer'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'

const log = createLogger('auth-service:email')

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: config.email.user
    ? { user: config.email.user, pass: config.email.pass }
    : undefined,
})

export async function sendVerificationEmail(
  to: string,
  token: string,
): Promise<void> {
  const url = `${config.appUrl}/verify-email?token=${token}`
  await transporter.sendMail({
    from: `"${config.email.fromName}" <${config.email.from}>`,
    to,
    subject: 'Verify your MyDigiSence account',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2>Verify your email address</h2>
        <p>Click the link below to verify your account. This link expires in 24 hours.</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1e2a3b;color:#fff;border-radius:6px;text-decoration:none">
          Verify Email
        </a>
        <p style="color:#888;font-size:14px;margin-top:24px">
          If you didn't create an account, ignore this email.
        </p>
      </div>
    `,
  })
  log.info({ to }, 'Verification email sent')
}

export async function sendPasswordResetEmail(
  to: string,
  token: string,
): Promise<void> {
  const url = `${config.appUrl}/reset-password?token=${token}`
  await transporter.sendMail({
    from: `"${config.email.fromName}" <${config.email.from}>`,
    to,
    subject: 'Reset your MyDigiSence password',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2>Reset your password</h2>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <a href="${url}" style="display:inline-block;padding:12px 24px;background:#1e2a3b;color:#fff;border-radius:6px;text-decoration:none">
          Reset Password
        </a>
        <p style="color:#888;font-size:14px;margin-top:24px">
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  })
  log.info({ to }, 'Password reset email sent')
}
