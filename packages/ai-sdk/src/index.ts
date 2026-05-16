const AI_SERVICE_URL = typeof window === 'undefined'
  ? (process.env['AI_SERVICE_URL'] ?? 'http://localhost:4013')
  : (process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000')

const API_PREFIX = typeof window !== 'undefined' ? '/ai' : ''

export type GenerateType = 'bio' | 'seo' | 'service' | 'social' | 'custom'

export interface GenerateOptions {
  type: GenerateType
  context: string
  customSystemPrompt?: string
  noCache?: boolean
  accessToken?: string
}

export async function generateContent(opts: GenerateOptions): Promise<string> {
  const baseUrl = typeof window !== 'undefined' ? AI_SERVICE_URL : `${AI_SERVICE_URL}/ai`
  const res = await fetch(`${baseUrl.replace('/ai', '')}/ai/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(opts.accessToken ? { Authorization: `Bearer ${opts.accessToken}` } : {}),
    },
    body: JSON.stringify({ type: opts.type, context: opts.context, customSystemPrompt: opts.customSystemPrompt, noCache: opts.noCache }),
  })
  const data = await res.json() as { success: boolean; data?: { result: string } }
  return data.data?.result ?? ''
}

export async function generateBio(opts: { name: string; role?: string; skills?: string[]; experience?: string }): Promise<string> {
  const res = await fetch(`${AI_SERVICE_URL}/ai/generate/bio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  })
  const data = await res.json() as { success: boolean; data?: { result: string } }
  return data.data?.result ?? ''
}

export async function generateSEO(opts: { title: string; description?: string; keywords?: string[] }): Promise<string> {
  const res = await fetch(`${AI_SERVICE_URL}/ai/generate/seo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(opts),
  })
  const data = await res.json() as { success: boolean; data?: { result: string } }
  return data.data?.result ?? ''
}

export async function getProfileSuggestions(profileData: object): Promise<string> {
  const res = await fetch(`${AI_SERVICE_URL}/ai/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileData }),
  })
  const data = await res.json() as { success: boolean; data?: { suggestions: string } }
  return data.data?.suggestions ?? ''
}
