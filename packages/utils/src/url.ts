export function buildUrl(base: string, path: string, params?: Record<string, string | number | boolean | undefined>): string {
  const url = new URL(path, base)
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (val !== undefined) {
        url.searchParams.set(key, String(val))
      }
    }
  }
  return url.toString()
}

export function parseQueryString(search: string): Record<string, string> {
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}
  params.forEach((val, key) => {
    result[key] = val
  })
  return result
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const search = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined) {
      search.set(key, String(val))
    }
  }
  const str = search.toString()
  return str ? `?${str}` : ''
}

export function getOrigin(url: string): string {
  try {
    return new URL(url).origin
  } catch {
    return ''
  }
}

export function joinPaths(...parts: string[]): string {
  return parts
    .map((p, i) => (i === 0 ? p.replace(/\/+$/, '') : p.replace(/^\/+|\/+$/g, '')))
    .filter(Boolean)
    .join('/')
}

export function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}
