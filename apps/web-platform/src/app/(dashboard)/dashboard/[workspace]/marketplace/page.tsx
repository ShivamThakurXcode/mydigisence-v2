'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

const LISTING_STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  draft: 'bg-gray-100 text-gray-600',
  archived: 'bg-red-100 text-red-600',
}

interface MockService {
  id: string
  title: string
  price: number
  currency: string
  category: string
  status: 'active' | 'draft' | 'archived'
  bookingCount: number
  rating: number
}

const MOCK_SERVICES: MockService[] = []

export default function DashboardMarketplacePage({ params }: { params: { workspace: string } }) {
  const [tab, setTab] = useState<'services' | 'products'>('services')
  const [showNewForm, setShowNewForm] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', price: '', currency: 'USD', category: '' })

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground mt-1">Manage your services and products listings.</p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Listing
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
        {(['services', 'products'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${tab === t ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* New Listing Form */}
      {showNewForm && (
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-semibold mb-4">New {tab === 'services' ? 'Service' : 'Product'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Brand Strategy Consultation" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Describe what's included..." className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Price (USD)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="99.00" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Consulting, Design, Development" className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => setShowNewForm(false)} className="flex-1 h-9 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button className="flex-1 h-9 rounded-md bg-muted text-sm font-medium hover:bg-muted/80 transition-colors">Save as Draft</button>
            <button className="flex-1 h-9 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Publish</button>
          </div>
        </div>
      )}

      {/* Listings Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold capitalize">{tab} ({MOCK_SERVICES.length})</h2>
          <div className="flex gap-2">
            {['All', 'Active', 'Draft', 'Archived'].map((f) => (
              <button key={f} className="px-3 py-1 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">{f}</button>
            ))}
          </div>
        </div>

        {MOCK_SERVICES.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-6">
            <p className="text-4xl mb-3">🛍️</p>
            <p className="font-medium">No {tab} yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Create your first listing to start earning. Set a price, add images, and publish to the marketplace.
            </p>
            <button onClick={() => setShowNewForm(true)} className="mt-4 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Create your first listing
            </button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3">Category</th>
                <th className="text-right px-5 py-3">Price</th>
                <th className="text-center px-5 py-3">Bookings</th>
                <th className="text-center px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_SERVICES.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 font-medium">{s.title}</td>
                  <td className="px-5 py-4 text-muted-foreground">{s.category}</td>
                  <td className="px-5 py-4 text-right">{s.currency} {s.price}</td>
                  <td className="px-5 py-4 text-center">{s.bookingCount}</td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${LISTING_STATUS_COLORS[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
