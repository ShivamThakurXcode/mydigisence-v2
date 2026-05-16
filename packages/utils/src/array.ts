export function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

export function uniqueBy<T>(arr: T[], key: (item: T) => unknown): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

export function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const group = key(item)
    if (!acc[group]) acc[group] = []
    acc[group]!.push(item)
    return acc
  }, {})
}

export function sortBy<T>(arr: T[], key: (item: T) => number | string, dir: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const ka = key(a)
    const kb = key(b)
    const cmp = ka < kb ? -1 : ka > kb ? 1 : 0
    return dir === 'asc' ? cmp : -cmp
  })
}

export function flatten<T>(arr: T[][]): T[] {
  return arr.flat()
}

export function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

export function sum(arr: number[]): number {
  return arr.reduce((acc, n) => acc + n, 0)
}

export function average(arr: number[]): number {
  if (arr.length === 0) return 0
  return sum(arr) / arr.length
}

export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((x) => !setB.has(x))
}

export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b)
  return a.filter((x) => setB.has(x))
}
