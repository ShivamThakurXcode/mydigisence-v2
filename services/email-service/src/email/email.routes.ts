import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { sendMail } from '../mailer.js'
import { config } from '../config.js'
import {
  verifyEmailTemplate,
  resetPasswordTemplate,
  welcomeTemplate,
  bookingConfirmationTemplate,
  bookingReminderTemplate,
  workspaceInviteTemplate,
} from '../templates/index.js'

const sendSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('verify-email'), to: z.string().email(), name: z.string(), token: z.string() }),
  z.object({ type: z.literal('reset-password'), to: z.string().email(), name: z.string(), token: z.string() }),
  z.object({ type: z.literal('welcome'), to: z.string().email(), name: z.string() }),
  z.object({ type: z.literal('booking-confirmation'), to: z.string().email(), customerName: z.string(), serviceName: z.string(), providerName: z.string(), dateTime: z.string(), duration: z.number(), bookingId: z.string() }),
  z.object({ type: z.literal('booking-reminder'), to: z.string().email(), customerName: z.string(), serviceName: z.string(), providerName: z.string(), dateTime: z.string() }),
  z.object({ type: z.literal('workspace-invite'), to: z.string().email(), inviteeName: z.string(), inviterName: z.string(), workspaceName: z.string(), role: z.string(), acceptUrl: z.string() }),
])

export async function emailRoutes(app: FastifyInstance) {
  app.post('/email/send', async (req, reply) => {
    const body = sendSchema.parse(req.body)
    const appUrl = config.appUrl

    switch (body.type) {
      case 'verify-email': {
        const url = `${appUrl}/verify-email?token=${body.token}`
        await sendMail({ to: body.to, subject: 'Verify your MyDigiSence account', html: verifyEmailTemplate({ name: body.name, url }) })
        break
      }
      case 'reset-password': {
        const url = `${appUrl}/reset-password?token=${body.token}`
        await sendMail({ to: body.to, subject: 'Reset your MyDigiSence password', html: resetPasswordTemplate({ name: body.name, url }) })
        break
      }
      case 'welcome':
        await sendMail({ to: body.to, subject: 'Welcome to MyDigiSence!', html: welcomeTemplate({ name: body.name, loginUrl: `${appUrl}/login` }) })
        break
      case 'booking-confirmation':
        await sendMail({
          to: body.to,
          subject: `Booking Confirmed: ${body.serviceName}`,
          html: bookingConfirmationTemplate({ ...body, dashboardUrl: `${appUrl}/dashboard` }),
        })
        break
      case 'booking-reminder':
        await sendMail({
          to: body.to,
          subject: `Reminder: ${body.serviceName} tomorrow`,
          html: bookingReminderTemplate({ ...body, dashboardUrl: `${appUrl}/dashboard` }),
        })
        break
      case 'workspace-invite':
        await sendMail({
          to: body.to,
          subject: `You've been invited to ${body.workspaceName}`,
          html: workspaceInviteTemplate(body),
        })
        break
    }

    return reply.code(200).send({ success: true })
  })
}
