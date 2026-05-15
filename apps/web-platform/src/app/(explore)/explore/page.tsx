import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Explore | MyDigiSence',
  description: 'Discover businesses, professionals, and services near you.',
}

const CATEGORIES = [
  { label: 'Design', emoji: '🎨', count: 0 },
  { label: 'Development', emoji: '💻', count: 0 },
  { label: 'Marketing', emoji: '📈', count: 0 },
  { label: 'Legal', emoji: '⚖️', count: 0 },
  { label: 'Healthcare', emoji: '🏥', count: 0 },
  { label: 'Education', emoji: '📚', count: 0 },
  { label: 'Finance', emoji: '💰', count: 0 },
  { label: 'Food & Dining', emoji: '🍽️', count: 0 },
  { label: 'Beauty', emoji: '💅', count: 0 },
  { label: 'Fitness', emoji: '💪', count: 0 },
  { label: 'Real Estate', emoji: '🏠', count: 0 },
  { label: 'Events', emoji: '🎉', count: 0 },
]

const DISCOVERY_TABS = ['All', 'Businesses', 'Professionals', 'Services', 'Trending', 'Nearby']

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold shrink-0">MyDigiSence</Link>
          {/* Search bar */}
          <div className="flex-1 max-w-xl relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search businesses, professionals, services..."
              className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign in</Link>
            <Link href="/signup" className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">
              Join free
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Hero */}
        <div className="text-center space-y-3 py-8">
          <h1 className="text-4xl font-bold">Discover the best professionals & businesses</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find verified services, book appointments, and connect with top-rated professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {['Near me', 'Top rated', 'Trending', 'Available today'].map((tag) => (
              <button key={tag} className="px-4 py-1.5 rounded-full border border-border text-sm hover:border-primary hover:text-primary transition-colors">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Categories grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Browse by Category</h2>
            <Link href="/categories" className="text-sm text-primary hover:underline">See all</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={`/categories/${cat.label.toLowerCase().replace(/ /g, '-')}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all group"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.label}</span>
                <span className="text-xs text-muted-foreground">{cat.count > 0 ? `${cat.count} listings` : 'Coming soon'}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Discovery tabs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {DISCOVERY_TABS.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  tab === 'All' ? 'bg-primary text-primary-foreground' : 'border border-border hover:bg-muted text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Empty state */}
          <div className="bg-card rounded-2xl border border-border p-16 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h3 className="text-xl font-bold mb-2">Platform launching soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Be among the first to discover amazing businesses and professionals when we launch.
              Create your own profile while you wait!
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/signup" className="h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
                Create your profile
              </Link>
              <Link href="/" className="h-10 px-6 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors inline-flex items-center">
                Learn more
              </Link>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Top Rated', href: '/top-rated', emoji: '⭐' },
            { label: 'Trending Now', href: '/trending', emoji: '🔥' },
            { label: 'Near Me', href: '/nearby', emoji: '📍' },
            { label: 'Featured', href: '/featured', emoji: '✨' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all group"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-medium text-sm group-hover:text-primary transition-colors">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
