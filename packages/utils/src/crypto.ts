export function generateToken(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function generateNumericCode(digits = 6): string {
  const max = Math.pow(10, digits)
  const code = Math.floor(Math.random() * max)
  return code.toString().padStart(digits, '0')
}

export async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= (a.charCodeAt(i) ^ (b.charCodeAt(i) ?? 0))
  }
  return result === 0
}
