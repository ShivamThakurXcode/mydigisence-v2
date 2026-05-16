import { baseTemplate } from './base.js'

export function verifyEmailTemplate(opts: { name: string; url: string }): string {
  return baseTemplate(`
    <h1>Verify your email address</h1>
    <p>Hi ${opts.name},</p>
    <p>Welcome to MyDigiSence! Click the button below to verify your email address and activate your account.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.url}" class="btn">Verify My Email</a>
    </div>
    <div class="highlight-box">
      <p>⏱️ This link expires in <strong>24 hours</strong>.</p>
    </div>
    <hr class="divider" />
    <p class="small">If the button doesn't work, copy and paste this link into your browser:</p>
    <p class="url-fallback">${opts.url}</p>
    <p class="small" style="margin-top:16px">If you didn't create a MyDigiSence account, you can safely ignore this email.</p>
  `, 'Verify your MyDigiSence account')
}

export function resetPasswordTemplate(opts: { name: string; url: string }): string {
  return baseTemplate(`
    <h1>Reset your password</h1>
    <p>Hi ${opts.name},</p>
    <p>We received a request to reset the password for your MyDigiSence account. Click the button below to choose a new password.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.url}" class="btn btn-accent">Reset My Password</a>
    </div>
    <div class="highlight-box">
      <p>⏱️ This link expires in <strong>1 hour</strong> for security reasons.</p>
    </div>
    <hr class="divider" />
    <p class="small">If the button doesn't work, copy and paste this link:</p>
    <p class="url-fallback">${opts.url}</p>
    <p class="small" style="margin-top:16px">If you didn't request a password reset, ignore this email — your password will not change.</p>
  `, 'Reset your MyDigiSence password')
}

export function welcomeTemplate(opts: { name: string; loginUrl: string }): string {
  return baseTemplate(`
    <h1>Welcome to MyDigiSence! 🎉</h1>
    <p>Hi ${opts.name},</p>
    <p>Your account is verified and ready. You're now part of a platform that combines the power of LinkedIn, Shopify, HubSpot, Calendly, and more — all in one place.</p>
    <div style="margin:24px 0">
      <p><strong>What you can do:</strong></p>
      <p>🏢 &nbsp; Create a business or professional workspace</p>
      <p>💼 &nbsp; Build a dynamic profile with custom sections</p>
      <p>🛍️ &nbsp; List services and products on the marketplace</p>
      <p>📅 &nbsp; Accept bookings with an integrated calendar</p>
      <p>✨ &nbsp; Use AI to optimize your profile and SEO</p>
    </div>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.loginUrl}" class="btn">Get Started</a>
    </div>
  `, 'Your MyDigiSence account is ready')
}

export function bookingConfirmationTemplate(opts: {
  customerName: string
  serviceName: string
  providerName: string
  dateTime: string
  duration: number
  bookingId: string
  dashboardUrl: string
}): string {
  return baseTemplate(`
    <h1>Booking Confirmed ✅</h1>
    <p>Hi ${opts.customerName},</p>
    <p>Your booking has been confirmed. Here are the details:</p>
    <div class="highlight-box" style="border-left-color:#22c55e">
      <p><strong>Service:</strong> ${opts.serviceName}</p>
      <p><strong>Provider:</strong> ${opts.providerName}</p>
      <p><strong>Date & Time:</strong> ${opts.dateTime}</p>
      <p><strong>Duration:</strong> ${opts.duration} minutes</p>
      <p><strong>Booking ID:</strong> ${opts.bookingId}</p>
    </div>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.dashboardUrl}" class="btn">View Booking</a>
    </div>
    <p class="small">Need to cancel or reschedule? Visit your dashboard to manage your booking.</p>
  `, 'Your booking is confirmed')
}

export function bookingReminderTemplate(opts: {
  customerName: string
  serviceName: string
  providerName: string
  dateTime: string
  dashboardUrl: string
}): string {
  return baseTemplate(`
    <h1>Reminder: Booking Tomorrow ⏰</h1>
    <p>Hi ${opts.customerName},</p>
    <p>Just a friendly reminder that you have a booking tomorrow:</p>
    <div class="highlight-box">
      <p><strong>Service:</strong> ${opts.serviceName}</p>
      <p><strong>Provider:</strong> ${opts.providerName}</p>
      <p><strong>Date & Time:</strong> ${opts.dateTime}</p>
    </div>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.dashboardUrl}" class="btn">View Details</a>
    </div>
  `, 'Reminder: You have a booking tomorrow')
}

export function workspaceInviteTemplate(opts: {
  inviteeName: string
  inviterName: string
  workspaceName: string
  role: string
  acceptUrl: string
}): string {
  return baseTemplate(`
    <h1>You've been invited! 🙌</h1>
    <p>Hi ${opts.inviteeName},</p>
    <p><strong>${opts.inviterName}</strong> has invited you to join <strong>${opts.workspaceName}</strong> on MyDigiSence as a <strong>${opts.role}</strong>.</p>
    <div style="text-align:center;margin:32px 0">
      <a href="${opts.acceptUrl}" class="btn">Accept Invitation</a>
    </div>
    <p class="small">This invitation expires in 7 days. If you don't have a MyDigiSence account, you'll be prompted to create one.</p>
  `, `You've been invited to ${opts.workspaceName}`)
}
