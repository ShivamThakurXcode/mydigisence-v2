export interface SectionConfig {
  type: string
  enabled: boolean
  order: number
  config?: Record<string, unknown>
}

export interface ProfileFull {
  id: string
  userId: string
  username: string
  displayName: string
  bio?: string | null
  avatar?: string | null
  banner?: string | null
  location?: string | null
  website?: string | null
  sections: SectionConfig[]
  settings: Record<string, unknown>
  isPublic: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface UpdateProfileBody {
  displayName?: string
  bio?: string
  avatar?: string
  banner?: string
  location?: string
  website?: string
  username?: string
}

export interface UpdateSectionsBody {
  sections: SectionConfig[]
}
