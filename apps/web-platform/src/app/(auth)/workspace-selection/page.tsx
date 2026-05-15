'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Workspace {
  id: string
  name: string
  slug: string
  type: string
  logo?: string
}

const TYPE_EMOJI: Record<string, string> = {
  business: '🏢',
  professional: '💼',
  creator: '🎨',
  agency: '🏛️',
  enterprise: '🏗️',
}

export default function WorkspaceSelectionPage() {
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) { router.push('/login'); return }
    fetch(`${process.env['NEXT_PUBLIC_API_URL']}/users/me/workspaces`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d: { success: boolean; data?: Workspace[] }) => {
        if (d.success && d.data) setWorkspaces(d.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="text-2xl font-bold inline-block">MyDigiSence</Link>
          <h1 className="text-2xl font-bold mt-4">Choose a workspace</h1>
          <p className="text-muted-foreground">Select which workspace to open.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        ) : workspaces.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-muted-foreground">You don&apos;t have any workspaces yet.</p>
            <Link href="/onboarding" className="inline-flex h-10 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium items-center hover:bg-primary/90 transition-colors">
              Create your first workspace
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => router.push(`/dashboard/${ws.slug}`)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-sidebar flex items-center justify-center text-2xl shrink-0">
                  {ws.logo ? (
                    <img src={ws.logo} alt={ws.name} className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    TYPE_EMOJI[ws.type] ?? '🏢'
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold group-hover:text-primary transition-colors">{ws.name}</p>
                  <p className="text-sm text-muted-foreground">mydigisence.com/{ws.slug}</p>
                </div>
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
            <Link
              href="/onboarding"
              className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm group-hover:text-primary transition-colors">Create new workspace</p>
                <p className="text-xs text-muted-foreground">Add a business, professional, or creator workspace</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
