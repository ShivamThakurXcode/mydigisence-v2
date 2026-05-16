export interface CreateBusinessProfileBody {
  industry?: string
  category?: string
  subcategory?: string
  address?: Record<string, unknown>
  location?: Record<string, unknown>
  businessHours?: unknown[]
  founded?: string
  size?: string
  socialLinks?: Record<string, unknown>
}

export interface UpdateBusinessProfileBody {
  industry?: string
  category?: string
  subcategory?: string
  address?: Record<string, unknown>
  location?: Record<string, unknown>
  businessHours?: unknown[]
  founded?: string
  size?: string
  socialLinks?: Record<string, unknown>
}
