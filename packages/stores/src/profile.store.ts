import { create } from 'zustand'

export interface SectionConfig {
  type: string
  enabled: boolean
  order: number
  config?: Record<string, unknown>
}

export interface ProfileData {
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
  isPublic: boolean
  viewCount: number
}

interface ProfileState {
  profile: ProfileData | null
  isEditing: boolean
  pendingChanges: Partial<ProfileData> | null
  setProfile: (profile: ProfileData) => void
  updateProfile: (data: Partial<ProfileData>) => void
  updateSection: (type: string, config: Partial<SectionConfig>) => void
  reorderSections: (sections: SectionConfig[]) => void
  setEditing: (editing: boolean) => void
  discardChanges: () => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isEditing: false,
  pendingChanges: null,

  setProfile: (profile) => set({ profile, pendingChanges: null }),

  updateProfile: (data) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
      pendingChanges: { ...(state.pendingChanges ?? {}), ...data },
    })),

  updateSection: (type, config) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            sections: state.profile.sections.map((s) =>
              s.type === type ? { ...s, ...config } : s,
            ),
          }
        : null,
    })),

  reorderSections: (sections) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, sections } : null,
    })),

  setEditing: (isEditing) => set({ isEditing }),

  discardChanges: () =>
    set((state) => ({
      pendingChanges: null,
      isEditing: false,
      profile: state.pendingChanges ? state.profile : state.profile,
    })),

  clearProfile: () => set({ profile: null, isEditing: false, pendingChanges: null }),
}))
