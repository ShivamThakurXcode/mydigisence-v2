'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function SearchInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') ?? ''
  const type = (searchParams.get('type') ?? 'all') as 'all' | 'profiles' | 'services' | 'workspaces'

  const [q, setQ] = useState(query)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ hits: Array<{ id: string; index: string; displayName?: string; title?: string; name?: string; bio?: string; description?: string; category?: string; price?: number }>; total: number } | null>(null)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    const apiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000'
    const params = new URLSearchParams({ q: query, type })
    fetch(`${apiUrl}/search?${params}`)
      .then((r) => r.json())
      .then((d: { success: boolean; data: typeof results }) => { if (d.success) setResults(d.data) })
      .catch(() => setResults({ hits: [], total: 0 }))
      .finally(() => setLoading(false))
  }, [query, type])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q)}&type=${type}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/" className="text-xl font-bold shrink-0">MyDigiSence</Link>
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} type="text" placeholder="Search MyDigiSence..." className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </form>
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors shrink-0">Sign in</Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {['all', 'profiles', 'services', 'workspaces'].map((t) => (
            <button
              key={t}
              onClick={() => router.push(`/search?q=${encodeURIComponent(query)}&type=${t}`)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors capitalize ${type === t ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'}`}
            >
              {t === 'all' ? 'All Results' : t}
            </button>
          ))}
        </div>

        {query && (
          <p className="text-sm text-muted-foreground">
            {loading ? 'Searching...' : `${results?.total ?? 0} results for "${query}"`}
          </p>
        )}

        {/* Results */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-xl border border-border p-5 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-48" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : results && results.hits.length > 0 ? (
          <div className="space-y-3">
            {results.hits.map((hit) => (
              <div key={hit.id} className="bg-card rounded-xl border border-border p-5 hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg shrink-0">
                    {hit.index === 'profiles' ? '👤' : hit.index === 'services' ? '⚙️' : '🏢'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold">{hit.displayName ?? hit.title ?? hit.name ?? 'Untitled'}</p>
                        {hit.category && <span className="text-xs text-muted-foreground">{hit.category}</span>}
                      </div>
                      {hit.price !== undefined && (
                        <p className="text-sm font-semibold text-primary shrink-0">${hit.price}</p>
                      )}
                    </div>
                    {(hit.bio ?? hit.description) && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{hit.bio ?? hit.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="bg-card rounded-2xl border border-border p-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-lg">No results for &ldquo;{query}&rdquo;</p>
            <p className="text-muted-foreground text-sm mt-2">Try different keywords or browse by category.</p>
            <Link href="/explore" className="mt-4 inline-flex h-9 px-4 items-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Browse Explore
            </Link>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border p-16 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold text-lg">Start searching</p>
            <p className="text-muted-foreground text-sm mt-2">Search for businesses, professionals, or services above.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" /></div>}>
      <SearchInner />
    </Suspense>
  )
}
