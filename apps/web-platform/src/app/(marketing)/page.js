"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = HomePage;
const link_1 = __importDefault(require("next/link"));
exports.metadata = {
    title: 'MyDigiSence — Your Digital Presence Platform',
    description: 'The unified platform for businesses, professionals, and creators. Build your digital identity, manage clients, take bookings, and grow — powered by AI.',
};
const FEATURES = [
    { icon: '🏢', title: 'Business Workspaces', desc: 'Full workspace with CRM, bookings, analytics, and team management.' },
    { icon: '💼', title: 'Professional Profiles', desc: 'Portfolio, services, availability, and client messaging in one place.' },
    { icon: '🛍️', title: 'Marketplace', desc: 'List services, products, and digital goods. Accept payments instantly.' },
    { icon: '📅', title: 'Booking System', desc: 'Availability calendar, confirmations, reminders, and auto-payments.' },
    { icon: '🔍', title: 'Discovery Engine', desc: 'Get found by geo, category, skill, and AI-powered recommendations.' },
    { icon: '✨', title: 'AI Intelligence', desc: 'Profile optimization, bio generation, SEO content, and smart suggestions.' },
    { icon: '📊', title: 'Analytics', desc: 'Real-time insights on traffic, bookings, revenue, and growth metrics.' },
    { icon: '⚡', title: 'Automation', desc: 'Workflows, campaigns, CRM triggers, and automated follow-ups built-in.' },
];
const PERSONAS = [
    {
        title: 'For Businesses',
        emoji: '🏢',
        items: ['Restaurants & Hotels', 'Agencies & Consultancies', 'Healthcare & Education', 'E-commerce & SaaS'],
        cta: '/signup',
    },
    {
        title: 'For Professionals',
        emoji: '💼',
        items: ['Developers & Designers', 'Lawyers & Accountants', 'Coaches & Trainers', 'Freelancers & Creatives'],
        cta: '/signup',
    },
    {
        title: 'For Explorers',
        emoji: '🔍',
        items: ['Discover top services', 'Book appointments instantly', 'Follow creators & brands', 'Join communities'],
        cta: '/explore',
    },
];
const STATS = [
    { value: '9 Engines', label: 'Platform engines' },
    { value: '20+ Services', label: 'Backend microservices' },
    { value: '100+ Features', label: 'Built-in capabilities' },
    { value: '∞ Scale', label: 'Cloud-native architecture' },
];
function HomePage() {
    return (<div className="min-h-screen bg-background">
      {/* ─── Nav ──────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <link_1.default href="/" className="text-xl font-bold tracking-tight">
            MyDigiSence
          </link_1.default>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <link_1.default href="/features" className="hover:text-foreground transition-colors">Features</link_1.default>
            <link_1.default href="/pricing" className="hover:text-foreground transition-colors">Pricing</link_1.default>
            <link_1.default href="/explore" className="hover:text-foreground transition-colors">Explore</link_1.default>
            <link_1.default href="/about" className="hover:text-foreground transition-colors">About</link_1.default>
          </div>
          <div className="flex items-center gap-3">
            <link_1.default href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Sign in
            </link_1.default>
            <link_1.default href="/signup" className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">
              Get started free
            </link_1.default>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
          Platform in active development
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Your complete{' '}
          <span className="text-primary">digital presence</span>
          {' '}in one platform
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Businesses. Professionals. Creators. One platform to build your identity, manage clients,
          take bookings, and grow — powered by AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <link_1.default href="/signup" className="h-12 px-8 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-colors flex items-center">
            Start free — no credit card
          </link_1.default>
          <link_1.default href="/explore" className="h-12 px-8 rounded-lg border border-border text-base font-medium hover:bg-muted transition-colors flex items-center gap-2">
            Explore the platform
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </link_1.default>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          LinkedIn + Shopify + Upwork + HubSpot + Calendly — unified into one platform.
        </p>
      </section>

      {/* ─── Stats ────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (<div key={s.label} className="text-center">
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* ─── Persona Cards ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">Built for everyone</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether you&apos;re a business, a solo professional, or just looking to discover great services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PERSONAS.map((persona) => (<div key={persona.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
              <div className="text-4xl mb-4">{persona.emoji}</div>
              <h3 className="text-xl font-bold mb-4">{persona.title}</h3>
              <ul className="space-y-2 mb-6">
                {persona.items.map((item) => (<li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    {item}
                  </li>))}
              </ul>
              <link_1.default href={persona.cta} className="block text-center h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium leading-10 hover:bg-primary/90 transition-colors">
                Get started
              </link_1.default>
            </div>))}
        </div>
      </section>

      {/* ─── Features Grid ────────────────────────────────────── */}
      <section className="bg-muted/30 border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need, built in</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              No fragmented integrations. No third-party tools. Every feature in one unified platform.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (<div key={f.title} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-semibold mt-3 mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* ─── Platform Architecture Callout ───────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-sidebar text-sidebar-foreground rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Identity + Discovery + Profiles + Dashboards + Marketplace + AI + Automation
          </h2>
          <p className="text-sidebar-foreground/70 max-w-2xl mx-auto mb-8">
            Built on a modular engine architecture — dynamically rendering experiences for every
            business type, professional role, and workspace configuration.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Dynamic Onboarding', 'Registry-Based Profiles', 'Widget Dashboards', 'AI Engine', 'Automation Engine', 'Search Engine'].map((t) => (<span key={t} className="px-4 py-1.5 rounded-full bg-sidebar-accent text-sidebar-accent-foreground text-sm font-medium">
                {t}
              </span>))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to build your digital presence?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Join businesses, professionals, and creators. Free to start. Powerful to scale.
        </p>
        <link_1.default href="/signup" className="inline-flex items-center h-12 px-10 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-colors">
          Create your account — it&apos;s free
        </link_1.default>
      </section>

      {/* ─── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MyDigiSence. All rights reserved.</p>
          <div className="flex gap-6">
            <link_1.default href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy</link_1.default>
            <link_1.default href="/legal/terms" className="hover:text-foreground transition-colors">Terms</link_1.default>
            <link_1.default href="/contact" className="hover:text-foreground transition-colors">Contact</link_1.default>
            <link_1.default href="/blog" className="hover:text-foreground transition-colors">Blog</link_1.default>
          </div>
        </div>
      </footer>
    </div>);
}
//# sourceMappingURL=page.js.map