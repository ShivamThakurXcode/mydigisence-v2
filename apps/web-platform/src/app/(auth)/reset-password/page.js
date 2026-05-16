'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResetPasswordPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const API = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000';
function ResetPasswordInner() {
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const token = searchParams.get('token');
    const [form, setForm] = (0, react_1.useState)({ password: '', confirmPassword: '' });
    const [error, setError] = (0, react_1.useState)('');
    const [success, setSuccess] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    if (!token) {
        return (<div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold">Invalid reset link</h1>
        <p className="text-muted-foreground">This link is invalid or has expired.</p>
        <link_1.default href="/forgot-password" className="block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors">
          Request new link
        </link_1.default>
      </div>);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password: form.password, confirmPassword: form.confirmPassword }),
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.error?.message ?? 'Reset failed');
                return;
            }
            setSuccess(true);
        }
        catch {
            setError('Network error. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    if (success) {
        return (<div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Password updated!</h2>
          <p className="text-muted-foreground">Sign in with your new password.</p>
        </div>
        <button onClick={() => router.push('/login')} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Sign in
        </button>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Set new password</h1>
        <p className="text-muted-foreground">Choose a strong password for your account.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">New password</label>
          <input id="password" type="password" autoComplete="new-password" required placeholder="Min. 8 chars with uppercase &amp; number" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
          <input id="confirmPassword" type="password" autoComplete="new-password" required placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <button type="submit" disabled={loading} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">
          {loading ? 'Saving...' : 'Reset password'}
        </button>
      </form>
      <p className="text-center text-sm">
        <link_1.default href="/login" className="text-muted-foreground hover:text-foreground">Back to sign in</link_1.default>
      </p>
    </div>);
}
function ResetPasswordPage() {
    return (<react_1.Suspense fallback={<div className="flex justify-center py-12"><div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"/></div>}>
      <ResetPasswordInner />
    </react_1.Suspense>);
}
//# sourceMappingURL=page.js.map