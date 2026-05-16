'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authApi } from '../lib/api'

interface SessionUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  workspaceIds: string[]
  profile: { username: string; displayName: string; avatar?: string }
}

export function DashboardUser({ workspaceSlug }: { workspaceSlug: string }) {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    authApi.getSession().then((res) => {
      if (res.success && res.data) {
        setUser(res.data)
      } else {
        router.replace('/login')
      }
    }).catch(() => router.replace('/login'))
  }, [router])

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : '…'

  const handleSignOut = async () => {
    await authApi.logout().catch(() => null)
    if (typeof window !== 'undefined') localStorage.removeItem('accessToken')
    router.push('/login')
  }

  return (
    <div className="p-3 border-t border-border space-y-2">
      {user && (
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted text-sm">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
            {user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                alt={user.profile.displayName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user.profile.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      )}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-card-foreground/70 hover:bg-accent transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Sign out
      </button>
    </div>
  )
}

export function DashboardTopBarUser({ workspaceSlug }: { workspaceSlug: string }) {
  const router = useRouter()
  const [user, setUser] = useState<SessionUser | null>(null)

  useEffect(() => {
    authApi.getSession().then((res) => {
      if (res.success && res.data) setUser(res.data)
      else router.replace('/login')
    }).catch(() => router.replace('/login'))
  }, [router])

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : '…'

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/dashboard/${workspaceSlug}/notifications`}
        className="p-2 rounded-md hover:bg-muted relative"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </Link>
      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
        {user?.profile.avatar ? (
          <img
            src={user.profile.avatar}
            alt={initials}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>
    </div>
  )
}
