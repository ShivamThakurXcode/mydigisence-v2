'use client'

const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

function setToken(token: string): void {
  localStorage.setItem('accessToken', token)
}

function clearToken(): void {
  localStorage.removeItem('accessToken')
}

interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: { code: string; message: string; details?: unknown }
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    const data = await res.json() as ApiResponse<{ accessToken: string }>
    if (data.success && data.data?.accessToken) {
      setToken(data.data.accessToken)
      return data.data.accessToken
    }
    clearToken()
    return null
  } catch {
    clearToken()
    return null
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { skipAuth?: boolean } = {},
): Promise<ApiResponse<T>> {
  const { skipAuth, ...fetchOptions } = options
  let token = skipAuth ? null : getToken()

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string> ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  let res = await fetch(`${API_URL}${path}`, { ...fetchOptions, headers, credentials: 'include' })

  // Token expired — try refresh once
  if (res.status === 401 && !skipAuth) {
    const newToken = await refreshAccessToken()
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`
      res = await fetch(`${API_URL}${path}`, { ...fetchOptions, headers, credentials: 'include' })
    } else {
      if (typeof window !== 'undefined') window.location.href = '/login'
      return { success: false, error: { code: 'UNAUTHORIZED', message: 'Session expired' } }
    }
  }

  try {
    const data = await res.json() as ApiResponse<T>
    return data
  } catch {
    return { success: false, error: { code: 'PARSE_ERROR', message: 'Failed to parse response' } }
  }
}

// Convenience methods
export const api = {
  get: <T>(path: string, opts?: RequestInit) =>
    apiRequest<T>(path, { method: 'GET', ...opts }),

  post: <T>(path: string, body: unknown, opts?: RequestInit) =>
    apiRequest<T>(path, { method: 'POST', body: JSON.stringify(body), ...opts }),

  put: <T>(path: string, body: unknown, opts?: RequestInit) =>
    apiRequest<T>(path, { method: 'PUT', body: JSON.stringify(body), ...opts }),

  patch: <T>(path: string, body: unknown, opts?: RequestInit) =>
    apiRequest<T>(path, { method: 'PATCH', body: JSON.stringify(body), ...opts }),

  delete: <T>(path: string, opts?: RequestInit) =>
    apiRequest<T>(path, { method: 'DELETE', ...opts }),
}

// Auth-specific helpers
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ accessToken: string; user: { id: string; email: string; firstName: string; lastName: string; roles: string[]; workspaceIds: string[] } }>('/auth/login', { email, password }, { skipAuth: true } as RequestInit & { skipAuth: boolean }),

  signup: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    api.post('/auth/signup', data, { skipAuth: true } as RequestInit & { skipAuth: boolean }),

  logout: () => api.post('/auth/logout', {}),

  getSession: () => api.get<{ id: string; email: string; firstName: string; lastName: string; roles: string[]; workspaceIds: string[]; profile: { username: string; displayName: string; avatar?: string } }>('/auth/session'),

  verifyEmail: (token: string) => api.post('/auth/verify-email', { token }, { skipAuth: true } as RequestInit & { skipAuth: boolean }),

  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }, { skipAuth: true } as RequestInit & { skipAuth: boolean }),

  resetPassword: (token: string, password: string, confirmPassword: string) =>
    api.post('/auth/reset-password', { token, password, confirmPassword }, { skipAuth: true } as RequestInit & { skipAuth: boolean }),
}

export { setToken, clearToken, getToken }
