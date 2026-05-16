import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: string[]
  workspaceIds: string[]
  emailVerified: boolean
  profile?: {
    username: string
    displayName: string
    avatar?: string | null
  } | null
}

interface UserState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  setUser: (user: AuthUser) => void
  setAccessToken: (token: string) => void
  clearUser: () => void
  updateProfile: (profile: Partial<NonNullable<AuthUser['profile']>>) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearUser: () => set({ user: null, accessToken: null, isAuthenticated: false }),
      updateProfile: (profile) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, profile: { ...state.user.profile, ...profile } as AuthUser['profile'] }
            : null,
        })),
    }),
    {
      name: 'mds-user',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
