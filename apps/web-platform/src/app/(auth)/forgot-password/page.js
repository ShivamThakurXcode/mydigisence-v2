'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForgotPasswordPage;
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
function ForgotPasswordPage() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.error?.message ?? 'Request failed');
                return;
            }
            setSubmitted(true);
        }
        catch {
            setError('Network error. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (submitted) {
        return (<div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-muted-foreground">If <strong>{email}</strong> exists, we&apos;ve sent a password reset link. It expires in 1 hour.</p>
        </div>
        <link_1.default href="/login" className="block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors">
          Back to login
        </link_1.default>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Reset your password</h1>
        <p className="text-muted-foreground">Enter your email and we&apos;ll send you a reset link.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email address</label>
          <input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <button type="submit" disabled={loading} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Sending...' : 'Send reset link'}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{' '}<link_1.default href="/login" className="text-foreground font-medium hover:underline">Sign in</link_1.default>
      </p>
    </div>);
}
//# sourceMappingURL=page.js.map