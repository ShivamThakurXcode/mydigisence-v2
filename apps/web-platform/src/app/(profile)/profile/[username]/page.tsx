import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProfileRenderer } from '../../../shared/profile/renderer.js'

interface ProfileData {
  id: string
  userId: string
  username: string
  displayName: string
  bio?: string | null
  avatar?: string | null
  banner?: string | null
  location?: string | null
  website?: string | null
  sections: Array<{ type: string; enabled: boolean; order: number; config?: Record<string, unknown> }>
  isPublic: boolean
  viewCount: number
}

async function getProfile(username: string): Promise<ProfileData | null> {
  const apiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/profiles/username/${username}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json() as { success: boolean; data?: ProfileData }
    return data.success ? (data.data ?? null) : null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { username: string }
}): Promise<Metadata> {
  const profile = await getProfile(params.username)
  if (!profile) return { title: 'Profile not found | MyDigiSence' }
  return {
    title: `${profile.displayName} (@${profile.username}) | MyDigiSence`,
    description: profile.bio ?? `${profile.displayName}'s profile on MyDigiSence`,
    openGraph: {
      title: profile.displayName,
      description: profile.bio ?? undefined,
      images: profile.avatar ? [profile.avatar] : undefined,
    },
  }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)
  if (!profile) notFound()

  return (
    <main className="min-h-screen bg-background">
      {/* Banner */}
      {profile.banner && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img src={profile.banner} alt="banner" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <ProfileRenderer
          sections={profile.sections}
          profile={{
            displayName: profile.displayName,
            bio: profile.bio,
            avatar: profile.avatar,
            location: profile.location,
            website: profile.website,
          }}
        />
      </div>
    </main>
  )
}
