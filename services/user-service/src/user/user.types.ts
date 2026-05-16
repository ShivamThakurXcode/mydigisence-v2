export interface UserPublic {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string | null
  roles: string[]
  workspaceIds: string[]
  emailVerified: boolean
  isActive: boolean
  lastLoginAt?: Date | null
  createdAt: Date
  profile?: ProfilePublic | null
}

export interface ProfilePublic {
  id: string
  username: string
  displayName: string
  bio?: string | null
  avatar?: string | null
  banner?: string | null
  location?: string | null
  website?: string | null
  isPublic: boolean
  viewCount: number
}

export interface UpdateUserBody {
  firstName?: string
  lastName?: string
  phone?: string
}
