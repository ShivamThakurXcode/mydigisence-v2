"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = sendVerificationEmail;
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("@mydigisence/logger");
const config_js_1 = require("./config.js");
const log = (0, logger_1.createLogger)('auth-service:email');
const transporter = nodemailer_1.default.createTransport({
    host: config_js_1.config.email.host,
    port: config_js_1.config.email.port,
    auth: config_js_1.config.email.user
        ? { user: config_js_1.config.email.user, pass: config_js_1.config.email.pass }
        : undefined,
});
async function sendVerificationEmail(to, token) {
    const url = `${config_js_1.config.appUrl}/verify-email?token=${token}`;
    await transporter.sendMail({
        from: `"${config_js_1.config.email.fromName}" <${config_js_1.config.email.from}>`,
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
    });
    log.info({ to }, 'Verification email sent');
}
async function sendPasswordResetEmail(to, token) {
    const url = `${config_js_1.config.appUrl}/reset-password?token=${token}`;
    await transporter.sendMail({
        from: `"${config_js_1.config.email.fromName}" <${config_js_1.config.email.from}>`,
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
    });
    log.info({ to }, 'Password reset email sent');
}
//# sourceMappingURL=email.js.map