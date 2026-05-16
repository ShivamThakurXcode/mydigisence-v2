import type { Metadata } from 'next'
import Link from 'next/link'
import { DashboardUser, DashboardTopBarUser } from './dashboard-user.js'

export const metadata: Metadata = {
  title: { template: '%s | Dashboard — MyDigiSence', default: 'Dashboard | MyDigiSence' },
}

const NAV_ITEMS = [
  { label: 'Overview', href: '', icon: 'grid' },
  { label: 'Analytics', href: '/analytics', icon: 'bar-chart' },
  { label: 'Profile Builder', href: '/profile-builder', icon: 'user' },
  { label: 'Marketplace', href: '/marketplace', icon: 'store' },
  { label: 'Bookings', href: '/bookings', icon: 'calendar' },
  { label: 'Messages', href: '/messages', icon: 'message' },
  { label: 'CRM', href: '/crm', icon: 'users' },
  { label: 'Automation', href: '/automation', icon: 'zap' },
  { label: 'AI', href: '/ai', icon: 'sparkles' },
  { label: 'SEO', href: '/seo', icon: 'search' },
  { label: 'Media', href: '/media', icon: 'image' },
  { label: 'Team', href: '/team', icon: 'team' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
  { label: 'Billing', href: '/billing', icon: 'credit-card' },
]

function SidebarIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    grid: 'M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z',
    'bar-chart': 'M3 3v18h18M7 16V9m4 7V5m4 11v-4',
    user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8z',
    store: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    message: 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z',
    users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m9-10a4 4 0 100-8 4 4 0 000 8zm6 3a3 3 0 11-6 0 3 3 0 016 0z',
    zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    sparkles: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z',
    search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    team: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197',
    settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    'credit-card': 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
  }
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={icons[name] ?? icons['grid']} />
    </svg>
  )
}

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { workspace?: string }
}) {
  const workspaceSlug = params.workspace ?? ''
  const basePath = `/dashboard/${workspaceSlug}`

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card text-card-foreground border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="text-xl font-bold text-card-foreground">
            MyDigiSence
          </Link>
        </div>

        {/* Workspace name */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-muted">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold uppercase">
              {workspaceSlug.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{workspaceSlug}</p>
              <p className="text-xs text-accent-foreground/70">Free plan</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={`${basePath}${item.href}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-card-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <SidebarIcon name={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <DashboardUser workspaceSlug={workspaceSlug} />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-md hover:bg-muted">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <DashboardTopBarUser workspaceSlug={workspaceSlug} />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
