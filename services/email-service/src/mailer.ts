import nodemailer from 'nodemailer'
import { createLogger } from '@mydigisence/logger'
import { config } from './config.js'

const log = createLogger('email-service:mailer')

export const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: config.smtp.user ? { user: config.smtp.user, pass: config.smtp.pass } : undefined,
})

export async function sendMail(opts: {
  to: string
  subject: string
  html: string
  text?: string
}): Promise<void> {
  await transporter.sendMail({
    from: `"${config.fromName}" <${config.from}>`,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  })
  log.info({ to: opts.to, subject: opts.subject }, 'Email sent')
}
