export interface WorkspacePublic {
  id: string
  ownerId: string
  name: string
  slug: string
  type: string
  description?: string | null
  logo?: string | null
  banner?: string | null
  website?: string | null
  phone?: string | null
  email?: string | null
  members: unknown[]
  modules: unknown
  branding: unknown
  subscription: string
  isActive: boolean
  isVerified: boolean
  createdAt: Date
}

export interface CreateWorkspaceBody {
  name: string
  slug: string
  type: string
  description?: string
}

export interface UpdateWorkspaceBody {
  name?: string
  description?: string
  website?: string
  phone?: string
  email?: string
  logo?: string
  banner?: string
}

export interface UpdateModulesBody {
  modules: Record<string, boolean>
}
