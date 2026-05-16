'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupPage;
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function SignupPage() {
    const router = (0, navigation_1.useRouter)();
    const [form, setForm] = (0, react_1.useState)({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = (0, react_1.useState)('');
    const [success, setSuccess] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (!data.success) {
                setError(data.error?.message ?? 'Signup failed');
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
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Check your inbox</h2>
          <p className="text-muted-foreground">We sent a verification link to <strong>{form.email}</strong>.</p>
        </div>
        <button type="button" onClick={() => router.push('/login')} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          Back to login
        </button>
      </div>);
    }
    return (<div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground">Join businesses, professionals, and creators on MyDigiSence</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}
        <div className="grid grid-cols-2 gap-3">
          {[['firstName', 'First name', 'John'], ['lastName', 'Last name', 'Doe']].map(([field, label, ph]) => (<div key={field} className="space-y-2">
              <label htmlFor={field} className="text-sm font-medium">{label}</label>
              <input id={field} type="text" required placeholder={ph} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
            </div>))}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email address</label>
          <input id="email" type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input id="password" type="password" autoComplete="new-password" required placeholder="Min. 8 chars, uppercase &amp; number" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm password</label>
          <input id="confirmPassword" type="password" autoComplete="new-password" required placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
        </div>
        <p className="text-xs text-muted-foreground">
          By creating an account you agree to our <link_1.default href="/legal/terms" className="underline hover:text-foreground">Terms</link_1.default> and <link_1.default href="/legal/privacy" className="underline hover:text-foreground">Privacy Policy</link_1.default>.
        </p>
        <button type="submit" disabled={loading} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}<link_1.default href="/login" className="text-foreground font-medium hover:underline">Sign in</link_1.default>
      </p>
    </div>);
}
//# sourceMappingURL=page.js.map