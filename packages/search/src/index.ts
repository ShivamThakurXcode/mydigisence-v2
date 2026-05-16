const SEARCH_SERVICE_URL = process.env['SEARCH_SERVICE_URL'] ?? process.env['NEXT_PUBLIC_API_URL']?.replace('4000', '4006') ?? 'http://localhost:4006'

export interface SearchResult {
  id: string
  index: string
  score: number
  [key: string]: unknown
}

export interface SearchResponse {
  hits: SearchResult[]
  total: number
  page: number
  limit: number
}

export async function search(query: string, opts: {
  type?: 'all' | 'profiles' | 'services' | 'workspaces'
  category?: string
  page?: number
  limit?: number
} = {}): Promise<SearchResponse> {
  const params = new URLSearchParams({
    q: query,
    type: opts.type ?? 'all',
    page: String(opts.page ?? 1),
    limit: String(opts.limit ?? 20),
    ...(opts.category ? { category: opts.category } : {}),
  })
  const res = await fetch(`${SEARCH_SERVICE_URL}/search?${params}`)
  const data = await res.json() as { success: boolean; data: SearchResponse }
  return data.data
}

export async function autocomplete(query: string, type = 'profiles'): Promise<SearchResult[]> {
  const res = await fetch(`${SEARCH_SERVICE_URL}/search/autocomplete?q=${encodeURIComponent(query)}&type=${type}`)
  const data = await res.json() as { success: boolean; data: SearchResult[] }
  return data.data
}

export async function indexDocument(index: string, id: string, document: object): Promise<void> {
  await fetch(`${SEARCH_SERVICE_URL}/search/index`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ index, id, document }),
  })
}

export async function removeDocument(index: string, id: string): Promise<void> {
  await fetch(`${SEARCH_SERVICE_URL}/search/index/${index}/${id}`, { method: 'DELETE' })
}
