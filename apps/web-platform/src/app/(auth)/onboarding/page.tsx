'use client'

import Link from 'next/link'

const ROLES = [
  {
    type: 'business',
    title: 'Business',
    emoji: '🏢',
    desc: 'Create a business workspace with CRM, bookings, marketplace, and team management.',
    examples: 'Restaurant, Agency, SaaS, Healthcare, Retail, Hotel',
    href: '/onboarding/business',
  },
  {
    type: 'professional',
    title: 'Professional',
    emoji: '💼',
    desc: 'Build a professional portfolio with services, booking calendar, and client tools.',
    examples: 'Developer, Designer, Lawyer, Coach, Consultant, Freelancer',
    href: '/onboarding/professional',
  },
  {
    type: 'explorer',
    title: 'Explorer',
    emoji: '🔍',
    desc: 'Discover businesses, book services, follow creators, and join communities.',
    examples: 'Finding services, exploring professionals, booking appointments',
    href: '/onboarding/explorer',
  },
]

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-bold inline-block">MyDigiSence</Link>
          <h1 className="text-3xl font-bold tracking-tight mt-6">How will you use MyDigiSence?</h1>
          <p className="text-muted-foreground">
            Choose your primary role. You can add more workspaces anytime.
          </p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {ROLES.map((role) => (
            <Link
              key={role.type}
              href={role.href}
              className="flex gap-5 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group"
            >
              <div className="text-4xl shrink-0">{role.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {role.title}
                  </h2>
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">{role.desc}</p>
                <p className="text-xs text-muted-foreground/70 mt-2 italic">{role.examples}</p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          You can change or add workspace types later from your account settings.
        </p>
      </div>
    </div>
  )
}
