'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OnboardingProfessionalPage;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const PROFESSIONAL_TYPES = [
    { value: 'developer', label: 'Developer / Engineer', emoji: '💻' },
    { value: 'designer', label: 'Designer / Creative', emoji: '🎨' },
    { value: 'writer', label: 'Writer / Editor', emoji: '✍️' },
    { value: 'marketer', label: 'Marketer / Growth', emoji: '📈' },
    { value: 'lawyer', label: 'Lawyer / Legal', emoji: '⚖️' },
    { value: 'accountant', label: 'Accountant / Finance', emoji: '🧮' },
    { value: 'coach', label: 'Coach / Trainer', emoji: '🏆' },
    { value: 'consultant', label: 'Consultant / Advisor', emoji: '📋' },
    { value: 'architect', label: 'Architect / Engineer', emoji: '🏗️' },
    { value: 'teacher', label: 'Teacher / Educator', emoji: '📚' },
    { value: 'photographer', label: 'Photographer / Video', emoji: '📷' },
    { value: 'other', label: 'Other', emoji: '📌' },
];
const STEPS = ['Your Role', 'Profile Info', 'Services', 'Done'];
function OnboardingProfessionalPage() {
    const router = (0, navigation_1.useRouter)();
    const [step, setStep] = (0, react_1.useState)(0);
    const [profType, setProfType] = (0, react_1.useState)('');
    const [form, setForm] = (0, react_1.useState)({ displayName: '', title: '', slug: '', bio: '', hourlyRate: '' });
    const [skills, setSkills] = (0, react_1.useState)([]);
    const [skillInput, setSkillInput] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSlugify = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const addSkill = () => {
        const s = skillInput.trim();
        if (s && !skills.includes(s) && skills.length < 15) {
            setSkills([...skills, s]);
            setSkillInput('');
        }
    };
    const handleCreate = async () => {
        setLoading(true);
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/users/me/workspaces`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    name: form.displayName, slug: form.slug, type: 'professional',
                    professionalType: profType, title: form.title, bio: form.bio,
                    skills, hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : undefined,
                    modules: { booking: true, analytics: true, ai: true, seo: true, reviews: true, marketplace: true },
                }),
            });
            const data = await res.json();
            if (data.success && data.data)
                router.push(`/dashboard/${data.data.slug}`);
            else
                setStep(3);
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
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}/>
          </div>
        </div>

        {/* Step 0 — Role */}
        {step === 0 && (<div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">What&apos;s your profession?</h1>
              <p className="text-muted-foreground text-sm mt-1">This shapes your profile sections and available features.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PROFESSIONAL_TYPES.map((pt) => (<button key={pt.value} onClick={() => setProfType(pt.value)} className={`p-4 rounded-xl border text-left transition-all hover:border-primary/50 ${profType === pt.value ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                  <div className="text-2xl mb-2">{pt.emoji}</div>
                  <div className="text-sm font-medium">{pt.label}</div>
                </button>))}
            </div>
            <button onClick={() => setStep(1)} disabled={!profType} className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Continue</button>
          </div>)}

        {/* Step 1 — Profile Info */}
        {step === 1 && (<div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Set up your profile</h1>
              <p className="text-muted-foreground text-sm mt-1">This is how clients will find and remember you.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display name</label>
                <input type="text" placeholder="Jane Smith" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value, slug: handleSlugify(e.target.value) })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional title</label>
                <input type="text" placeholder="Senior Full-Stack Developer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile URL</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 flex items-center rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">mydigisence.com/</span>
                  <input type="text" placeholder="jane-smith" value={form.slug} onChange={(e) => setForm({ ...form, slug: handleSlugify(e.target.value) })} className="flex-1 h-10 px-3 rounded-r-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea placeholder="Tell clients about yourself..." rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hourly rate (USD) <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="number" placeholder="75" value={form.hourlyRate} onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })} className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="flex-1 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">Back</button>
              <button onClick={() => setStep(2)} disabled={!form.displayName || !form.slug} className="flex-1 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Continue</button>
            </div>
          </div>)}

        {/* Step 2 — Skills */}
        {step === 2 && (<div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Add your skills</h1>
              <p className="text-muted-foreground text-sm mt-1">Skills help clients find you. Add up to 15.</p>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. React, Figma, Python..." value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        } }} className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"/>
                <button onClick={addSkill} className="h-10 px-4 rounded-md bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/90 transition-colors">
                  Add
                </button>
              </div>
              {skills.length > 0 && (<div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (<span key={skill} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      {skill}
                      <button onClick={() => setSkills(skills.filter((s) => s !== skill))} className="hover:text-destructive transition-colors">×</button>
                    </span>))}
                </div>)}
              <p className="text-xs text-muted-foreground">{skills.length}/15 skills added</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">Back</button>
              <button onClick={handleCreate} disabled={loading} className="flex-1 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-colors">{loading ? 'Creating profile...' : 'Create profile'}</button>
            </div>
          </div>)}

        {/* Step 3 — Done */}
        {step === 3 && (<div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Profile created!</h2>
              <p className="text-muted-foreground">Your professional workspace is ready.</p>
            </div>
            <button onClick={() => router.push(`/dashboard/${form.slug}`)} className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Go to Dashboard
            </button>
          </div>)}
      </div>
    </div>);
}
//# sourceMappingURL=page.js.map