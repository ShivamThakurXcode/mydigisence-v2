export const SUBSCRIPTION_PLANS = {
  free: { name: 'Free', amount: 0, currency: 'USD', features: ['1 workspace', 'Basic profile', '5 services', 'Community support'] },
  starter: { name: 'Starter', amount: 9, currency: 'USD', features: ['3 workspaces', 'Custom domain', '50 services', 'Booking system', 'Email support'] },
  pro: { name: 'Pro', amount: 29, currency: 'USD', features: ['10 workspaces', 'AI tools', 'Unlimited services', 'CRM', 'Analytics', 'Priority support'] },
  business: { name: 'Business', amount: 79, currency: 'USD', features: ['Unlimited workspaces', 'Team management', 'Advanced analytics', 'API access', 'Dedicated support'] },
  enterprise: { name: 'Enterprise', amount: 199, currency: 'USD', features: ['Everything in Business', 'SLA guarantee', 'Custom integrations', 'White-label', '24/7 support'] },
} as const

export type PlanId = keyof typeof SUBSCRIPTION_PLANS

export function getPlan(planId: string) {
  return SUBSCRIPTION_PLANS[planId as PlanId] ?? SUBSCRIPTION_PLANS.free
}

export function formatPrice(amount: number, currency = 'USD'): string {
  if (amount === 0) return 'Free'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
}

export function isPaidPlan(planId: string): boolean {
  return planId !== 'free'
}
