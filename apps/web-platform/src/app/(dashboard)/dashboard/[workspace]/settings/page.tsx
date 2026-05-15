import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Settings' }

const SETTING_SECTIONS = [
  {
    title: 'General',
    desc: 'Basic workspace details and preferences',
    fields: [
      { label: 'Workspace Name', type: 'text', placeholder: 'Acme Agency' },
      { label: 'Workspace URL', type: 'text', placeholder: 'acme-agency', prefix: 'mydigisence.com/' },
      { label: 'Description', type: 'textarea', placeholder: 'What does your workspace do?' },
      { label: 'Website', type: 'url', placeholder: 'https://yourwebsite.com' },
      { label: 'Phone', type: 'tel', placeholder: '+1 234 567 8900' },
    ],
  },
  {
    title: 'Appearance',
    desc: 'Brand colors, logo, and profile banner',
    fields: [
      { label: 'Logo', type: 'file', placeholder: 'Upload logo (PNG, SVG)' },
      { label: 'Banner Image', type: 'file', placeholder: 'Upload banner (1200×400px)' },
    ],
  },
  {
    title: 'Notifications',
    desc: 'Control when and how you receive notifications',
    fields: [],
  },
  {
    title: 'Privacy',
    desc: 'Control who can see your profile and data',
    fields: [],
  },
  {
    title: 'Danger Zone',
    desc: 'Irreversible actions for this workspace',
    fields: [],
    danger: true,
  },
]

const TOGGLES = [
  { label: 'Email on new booking', key: 'emailBooking', on: true },
  { label: 'Email on new message', key: 'emailMessage', on: true },
  { label: 'Email on new review', key: 'emailReview', on: true },
  { label: 'Push notifications', key: 'push', on: false },
  { label: 'Weekly summary email', key: 'weekly', on: true },
]

const PRIVACY_TOGGLES = [
  { label: 'Show profile in search results', key: 'searchVisible', on: true },
  { label: 'Show profile on Explore page', key: 'exploreVisible', on: true },
  { label: 'Allow direct messages', key: 'dmEnabled', on: true },
  { label: 'Show review count publicly', key: 'showReviews', on: true },
]

export default function SettingsPage({ params }: { params: { workspace: string } }) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your workspace configuration and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {SETTING_SECTIONS.map((s, i) => (
          <button
            key={s.title}
            className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              i === 0
                ? 'border-primary text-foreground'
                : `border-transparent text-muted-foreground hover:text-foreground ${s.danger ? 'text-destructive hover:text-destructive' : ''}`
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* General section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <h2 className="font-semibold">General</h2>
          <p className="text-sm text-muted-foreground">Basic workspace details and preferences</p>
        </div>
        {SETTING_SECTIONS[0]?.fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <label className="text-sm font-medium">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            ) : field.prefix ? (
              <div className="flex items-center">
                <span className="h-10 px-3 flex items-center rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  {field.prefix}
                </span>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="flex-1 h-10 px-3 rounded-r-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <button className="h-9 px-6 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <h2 className="font-semibold">Notifications</h2>
          <p className="text-sm text-muted-foreground">Control when and how you receive notifications</p>
        </div>
        <div className="space-y-4">
          {TOGGLES.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <span className="text-sm">{t.label}</span>
              <button className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${t.on ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${t.on ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-5">
        <div className="space-y-1">
          <h2 className="font-semibold">Privacy</h2>
          <p className="text-sm text-muted-foreground">Control who can see your profile and data</p>
        </div>
        <div className="space-y-4">
          {PRIVACY_TOGGLES.map((t) => (
            <div key={t.key} className="flex items-center justify-between">
              <span className="text-sm">{t.label}</span>
              <button className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${t.on ? 'bg-primary' : 'bg-muted-foreground/30'}`}>
                <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${t.on ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card rounded-xl border border-destructive/50 p-6 shadow-sm space-y-4">
        <div className="space-y-1">
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">These actions are irreversible. Proceed with caution.</p>
        </div>
        <div className="flex items-center justify-between p-4 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium">Delete workspace</p>
            <p className="text-xs text-muted-foreground">Permanently delete this workspace and all its data.</p>
          </div>
          <button className="h-9 px-4 rounded-md bg-destructive/10 text-destructive border border-destructive/30 text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
