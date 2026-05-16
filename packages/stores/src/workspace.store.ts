import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WorkspaceData {
  id: string
  name: string
  slug: string
  type: string
  logo?: string | null
  subscription: string
  modules: Record<string, boolean>
  isActive: boolean
  isVerified: boolean
  members: Array<{ userId: string; role: string }>
}

interface WorkspaceState {
  workspace: WorkspaceData | null
  workspaces: WorkspaceData[]
  currentRole: string | null
  setWorkspace: (workspace: WorkspaceData, userId: string) => void
  setWorkspaces: (workspaces: WorkspaceData[]) => void
  clearWorkspace: () => void
  isModuleEnabled: (module: string) => boolean
  switchWorkspace: (workspace: WorkspaceData, userId: string) => void
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspace: null,
      workspaces: [],
      currentRole: null,

      setWorkspace: (workspace, userId) => {
        const member = workspace.members.find((m) => m.userId === userId)
        set({ workspace, currentRole: member?.role ?? null })
      },

      setWorkspaces: (workspaces) => set({ workspaces }),

      clearWorkspace: () => set({ workspace: null, currentRole: null }),

      isModuleEnabled: (module) => {
        const ws = get().workspace
        return ws?.modules[module] === true
      },

      switchWorkspace: (workspace, userId) => {
        const member = workspace.members.find((m) => m.userId === userId)
        set({ workspace, currentRole: member?.role ?? null })
      },
    }),
    {
      name: 'mds-workspace',
      partialize: (state) => ({
        workspace: state.workspace,
        currentRole: state.currentRole,
      }),
    },
  ),
)
