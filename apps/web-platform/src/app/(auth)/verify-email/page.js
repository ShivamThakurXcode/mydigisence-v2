'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerifyEmailPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
function VerifyEmailInner() {
    const router = (0, navigation_1.useRouter)();
    const searchParams = (0, navigation_1.useSearchParams)();
    const token = searchParams.get('token');
    const [status, setStatus] = (0, react_1.useState)('idle');
    const [message, setMessage] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (!token)
            return;
        setStatus('loading');
        fetch(`${process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000'}/auth/verify-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then((r) => r.json())
            .then((data) => {
            if (data.success) {
                setStatus('success');
                setMessage(data.data?.message ?? 'Email verified!');
            }
            else {
                setStatus('error');
                setMessage(data.error?.message ?? 'Verification failed');
            }
        })
            .catch(() => {
            setStatus('error');
            setMessage('Network error. Please try again.');
        });
    }, [token]);
    if (!token) {
        return (<div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold">Invalid verification link</h1>
        <p className="text-muted-foreground">The link is invalid or has expired.</p>
        <link_1.default href="/login" className="inline-block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors">
          Back to login
        </link_1.default>
      </div>);
    }
    return (<div className="space-y-6 text-center">
      {status === 'loading' && (<>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"/>
          <p className="text-muted-foreground">Verifying your email...</p>
        </>)}
      {status === 'success' && (<>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Email verified!</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <button onClick={() => router.push('/login')} className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Sign in to your account
          </button>
        </>)}
      {status === 'error' && (<>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Verification failed</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <link_1.default href="/login" className="block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors">
            Back to login
          </link_1.default>
        </>)}
    </div>);
}
function VerifyEmailPage() {
    return (<react_1.Suspense fallback={<div className="flex justify-center py-12">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"/>
      </div>}>
      <VerifyEmailInner />
    </react_1.Suspense>);
}
//# sourceMappingURL=page.js.map