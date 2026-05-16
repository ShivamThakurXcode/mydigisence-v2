import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Browse Services | MyDigiSence',
  description: 'Browse services, products, and professionals on MyDigiSence.',
}

const CATEGORIES = ['All', 'Design', 'Development', 'Marketing', 'Consulting', 'Legal', 'Finance', 'Healthcare', 'Education', 'Fitness']

const SORT_OPTIONS = ['Relevance', 'Top Rated', 'Newest', 'Price: Low to High', 'Price: High to Low']

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold shrink-0">MyDigiSence</Link>
          <div className="flex-1 max-w-xl relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search services..." className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Sign in</Link>
            <Link href="/signup" className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center">Join free</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">
            <div>
              <h3 className="font-semibold mb-3 text-sm">Category</h3>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button key={cat} className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${cat === 'All' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
              <div className="space-y-2">
                {['Any', 'Under $50', '$50 – $200', '$200 – $500', '$500+'].map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="price" className="accent-primary" defaultChecked={p === 'Any'} />
                    <span className="text-muted-foreground">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Rating</h3>
              <div className="space-y-2">
                {['Any rating', '4★ & above', '4.5★ & above', '5★ only'].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="rating" className="accent-primary" defaultChecked={r === 'Any rating'} />
                    <span className="text-muted-foreground">{r}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 space-y-5">
            {/* Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-xl font-bold">Browse Services</h1>
                <p className="text-sm text-muted-foreground">0 results</p>
              </div>
              <div className="flex items-center gap-3">
                <select className="h-9 px-3 rounded-md border border-input bg-background text-sm focus:outline-none">
                  {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="flex rounded-md border border-input overflow-hidden">
                  <button className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  </button>
                  <button className="p-2 text-muted-foreground hover:bg-muted transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button key={cat} className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${cat === 'All' ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Empty state */}
            <div className="bg-card rounded-2xl border border-border p-16 text-center">
              <p className="text-5xl mb-4">🛍️</p>
              <h2 className="text-xl font-bold mb-2">No listings yet</h2>
              <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                Be the first to list your services! Create a workspace and publish your offerings to reach thousands of potential clients.
              </p>
              <Link href="/signup" className="h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
                List your services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
