import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Team' }

const ROLE_COLORS: Record<string, string> = {
  owner: 'bg-amber-100 text-amber-700',
  admin: 'bg-violet-100 text-violet-700',
  editor: 'bg-blue-100 text-blue-700',
  member: 'bg-emerald-100 text-emerald-700',
  viewer: 'bg-gray-100 text-gray-600',
}

const PERMISSIONS: Record<string, string[]> = {
  owner: ['Full control', 'Billing', 'Delete workspace', 'Manage team'],
  admin: ['All settings', 'Manage content', 'Manage team', 'View analytics'],
  editor: ['Create content', 'Edit listings', 'Manage bookings', 'View analytics'],
  member: ['View workspace', 'Create bookings', 'Basic features'],
  viewer: ['Read-only access'],
}

export default function TeamPage({ params }: { params: { workspace: string } }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">Manage team members and their permissions.</p>
        </div>
        <button className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Members table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h2 className="font-semibold">Members (1)</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-5 py-3">Member</th>
              <th className="text-left px-5 py-3">Role</th>
              <th className="text-left px-5 py-3">Permissions</th>
              <th className="text-left px-5 py-3">Joined</th>
              <th className="text-right px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-muted/30">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">Y</div>
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-xs text-muted-foreground">your@email.com</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS['owner']}`}>owner</span>
              </td>
              <td className="px-5 py-4">
                <p className="text-xs text-muted-foreground">{PERMISSIONS['owner']?.join(' · ')}</p>
              </td>
              <td className="px-5 py-4 text-muted-foreground">Now</td>
              <td className="px-5 py-4 text-right">
                <span className="text-xs text-muted-foreground">—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Invite section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="font-semibold mb-1">Invite a team member</h2>
        <p className="text-sm text-muted-foreground mb-4">Send an invite link to add collaborators to your workspace.</p>
        <div className="flex gap-3">
          <input type="email" placeholder="colleague@company.com" className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <select className="h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
            <option value="editor">Editor</option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <button className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap">
            Send Invite
          </button>
        </div>
      </div>

      {/* Role permissions reference */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="font-semibold mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(PERMISSIONS).filter(([r]) => r !== 'owner').map(([role, perms]) => (
            <div key={role} className="p-4 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${ROLE_COLORS[role]}`}>{role}</span>
              </div>
              <ul className="space-y-1">
                {perms.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
