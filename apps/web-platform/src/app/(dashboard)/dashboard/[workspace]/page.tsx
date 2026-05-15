import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Overview' }

const STAT_CARDS = [
  { label: 'Total Views', value: '—', change: '+0%', icon: 'eye', color: 'text-blue-500' },
  { label: 'Bookings', value: '—', change: '+0%', icon: 'calendar', color: 'text-emerald-500' },
  { label: 'Messages', value: '—', change: '+0%', icon: 'message', color: 'text-violet-500' },
  { label: 'Revenue', value: '$—', change: '+0%', icon: 'dollar', color: 'text-amber-500' },
]

const QUICK_ACTIONS = [
  { label: 'Build Profile', href: 'profile-builder', desc: 'Add sections, upload media, customize layout', icon: '✏️' },
  { label: 'Add Service', href: 'marketplace', desc: 'List a new service or product', icon: '🛍️' },
  { label: 'Set Availability', href: 'bookings', desc: 'Configure your booking calendar', icon: '📅' },
  { label: 'Invite Team', href: 'team', desc: 'Add members and set permissions', icon: '👥' },
  { label: 'Connect Domain', href: 'custom-domain', desc: 'Map your custom domain', icon: '🌐' },
  { label: 'Enable AI', href: 'ai', desc: 'Let AI optimize your profile', icon: '✨' },
]

export default function DashboardOverviewPage({
  params,
}: {
  params: { workspace: string }
}) {
  const { workspace } = params

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome to {workspace}</h1>
          <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening with your workspace.</p>
        </div>
        <Link
          href={`/dashboard/${workspace}/profile-builder`}
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center hover:bg-primary/90 transition-colors"
        >
          Edit Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">vs last 30 days</p>
          </div>
        ))}
      </div>

      {/* Setup checklist */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">Complete your setup</h2>
            <p className="text-sm text-muted-foreground">Finish these steps to go live</p>
          </div>
          <span className="text-sm text-muted-foreground">0 / 6 complete</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={`/dashboard/${workspace}/${action.href}`}
              className="flex gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/40 transition-all group"
            >
              <span className="text-2xl">{action.icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-sm group-hover:text-primary transition-colors">{action.label}</p>
                <p className="text-xs text-muted-foreground truncate">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity placeholder */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-4xl mb-3">📊</p>
          <p className="font-medium">No activity yet</p>
          <p className="text-sm text-muted-foreground mt-1">Your bookings, reviews, and messages will appear here.</p>
        </div>
      </div>
    </div>
  )
}
