'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OnboardingBusinessPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const BUSINESS_TYPES = [
    { value: 'restaurant', label: 'Restaurant & Food', emoji: '🍽️' },
    { value: 'agency', label: 'Agency', emoji: '🏛️' },
    { value: 'saas', label: 'SaaS / Tech', emoji: '💻' },
    { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
    { value: 'education', label: 'Education', emoji: '🎓' },
    { value: 'hotel', label: 'Hotel & Hospitality', emoji: '🏨' },
    { value: 'ecommerce', label: 'E-commerce', emoji: '🛍️' },
    { value: 'consulting', label: 'Consulting', emoji: '📋' },
    { value: 'fitness', label: 'Fitness & Wellness', emoji: '💪' },
    { value: 'beauty', label: 'Beauty & Salon', emoji: '💅' },
    { value: 'retail', label: 'Retail / Local', emoji: '🏪' },
    { value: 'other', label: 'Other', emoji: '📌' },
];
const STEPS = ['Business Type', 'Basic Info', 'Modules', 'Done'];
function OnboardingBusinessPage() {
    const router = (0, navigation_1.useRouter)();
    const [step, setStep] = (0, react_1.useState)(0);
    const [businessType, setBusinessType] = (0, react_1.useState)('');
    const [form, setForm] = (0, react_1.useState)({ name: '', slug: '', description: '' });
    const [modules, setModules] = (0, react_1.useState)({
        booking: false, crm: false, marketplace: false,
        analytics: true, ai: true, seo: true, reviews: true,
    });
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSlugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const handleCreate = async () => {
        setLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/users/me/workspaces`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: form.name, slug: form.slug, type: 'business',
                    description: form.description, businessType, modules,
                }),
            });
            const data = await res.json();
            if (data.success && data.data) {
                router.push(`/dashboard/${data.data.slug}`);
            }
            else {
                setStep(3);
            }
        }
        catch {
            setStep(3);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            {STEPS.map((s, i) => (<div key={s} className={`flex items-center gap-2 ${i === step ? 'text-foreground font-medium' : i < step ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 ${i === step ? 'border-primary bg-primary text-primary-foreground' : i < step ? 'border-primary bg-primary/10 text-primary' : 'border-muted-foreground/30'}`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{s}</span>
              </div>))}
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}/>
          </div>
        </div>

        {/* Step 0 — Business Type */}
        {step === 0 && (<div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">What type of business?</h1>
              <p className="text-muted-foreground text-sm">This shapes your workspace, onboarding, and available modules.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BUSINESS_TYPES.map((bt) => (<button key={bt.value} onClick={() => setBusinessType(bt.value)} className={`p-4 rounded-xl border text-left transition-all hover:border-primary/50 ${businessType === bt.value ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                  <div className="text-2xl mb-2">{bt.emoji}</div>
                  <div className="text-sm font-medium">{bt.label}</div>
                </button>))}
            </div>
            <button onClick={() => setStep(1)} disabled={!businessType} className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              Continue
            </button>
          </div>)}

        {/* Step 1 — Basic Info */}
        {step === 1 && (<div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Name your workspace</h1>
              <p className="text-muted-foreground text-sm">This is your business&apos;s public identity on MyDigiSence.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Business name</label>
                <input type="text" placeholder="Acme Agency" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: handleSlugify(e.target.value) })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Workspace URL</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 flex items-center rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">mydigisence.com/</span>
                  <input type="text" placeholder="acme-agency" value={form.slug} onChange={(e) => setForm({ ...form, slug: handleSlugify(e.target.value) })} className="flex-1 h-10 px-3 rounded-r-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brief description <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea placeholder="What does your business do?" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"/>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">Back</button>
              <button onClick={() => setStep(2)} disabled={!form.name || !form.slug} className="flex-1 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Continue</button>
            </div>
          </div>)}

        {/* Step 2 — Modules */}
        {step === 2 && (<div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Enable features</h1>
              <p className="text-muted-foreground text-sm">Choose which modules to activate. You can change these any time.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries({
                booking: { label: 'Booking System', emoji: '📅', desc: 'Accept appointments and reservations' },
                crm: { label: 'CRM', emoji: '👥', desc: 'Manage contacts, leads, and pipelines' },
                marketplace: { label: 'Marketplace', emoji: '🛍️', desc: 'List services and products for sale' },
                analytics: { label: 'Analytics', emoji: '📊', desc: 'Traffic, bookings, and revenue insights' },
                ai: { label: 'AI Tools', emoji: '✨', desc: 'Profile optimization and smart suggestions' },
                seo: { label: 'SEO Tools', emoji: '🔍', desc: 'Meta tags, keywords, and search ranking' },
                reviews: { label: 'Reviews', emoji: '⭐', desc: 'Collect and display customer reviews' },
            }).map(([key, mod]) => (<button key={key} onClick={() => setModules({ ...modules, [key]: !modules[key] })} className={`flex gap-3 p-4 rounded-xl border text-left transition-all ${modules[key] ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'}`}>
                  <span className="text-xl">{mod.emoji}</span>
                  <div>
                    <div className="text-sm font-medium flex items-center gap-2">
                      {mod.label}
                      {modules[key] && <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">✓</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">{mod.desc}</div>
                  </div>
                </button>))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">Back</button>
              <button onClick={handleCreate} disabled={loading} className="flex-1 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">{loading ? 'Creating workspace...' : 'Create workspace'}</button>
            </div>
          </div>)}

        {/* Step 3 — Done (fallback) */}
        {step === 3 && (<div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Workspace created!</h2>
              <p className="text-muted-foreground">Your business workspace is ready. Start building your profile.</p>
            </div>
            <button onClick={() => router.push(`/dashboard/${form.slug}`)} className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Go to Dashboard</button>
          </div>)}
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map