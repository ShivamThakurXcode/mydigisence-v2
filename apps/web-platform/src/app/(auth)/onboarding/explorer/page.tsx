'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const INTEREST_CATEGORIES = [
  { value: 'design', label: 'Design & Creative', emoji: '🎨' },
  { value: 'tech', label: 'Tech & Engineering', emoji: '💻' },
  { value: 'legal', label: 'Legal & Finance', emoji: '⚖️' },
  { value: 'health', label: 'Health & Wellness', emoji: '🏥' },
  { value: 'beauty', label: 'Beauty & Lifestyle', emoji: '💅' },
  { value: 'food', label: 'Food & Hospitality', emoji: '🍽️' },
  { value: 'consulting', label: 'Consulting & Strategy', emoji: '📋' },
  { value: 'education', label: 'Education & Coaching', emoji: '📚' },
  { value: 'marketing', label: 'Marketing & Growth', emoji: '📈' },
  { value: 'events', label: 'Events & Entertainment', emoji: '🎉' },
  { value: 'real-estate', label: 'Real Estate', emoji: '🏠' },
  { value: 'fitness', label: 'Fitness & Sports', emoji: '💪' },
]

const STEPS = ['Interests', 'Location', 'Done']

export default function OnboardingExplorerPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [interests, setInterests] = useState<string[]>([])
  const [location, setLocation] = useState({ city: '', country: '' })

  const toggleInterest = (value: string) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value],
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-lg space-y-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step
                    ? 'bg-primary text-primary-foreground'
                    : i === step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm ${i === step ? 'font-medium' : 'text-muted-foreground'}`}>
                {label}
              </span>
              {i < STEPS.length - 1 && <div className="h-px w-8 bg-border" />}
            </div>
          ))}
        </div>

        {/* Step 0 — Interests */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">What are you looking for?</h1>
              <p className="text-muted-foreground text-sm">
                Select the categories you&apos;re most interested in. Pick as many as you like.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEREST_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => toggleInterest(cat.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                    interests.includes(cat.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs font-medium leading-tight">{cat.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={interests.length === 0}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1 — Location */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Where are you based?</h1>
              <p className="text-muted-foreground text-sm">
                This helps us show you relevant local businesses and professionals. Optional.
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  placeholder="e.g. New York"
                  value={location.city}
                  onChange={(e) => setLocation({ ...location, city: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <input
                  type="text"
                  placeholder="e.g. United States"
                  value={location.country}
                  onChange={(e) => setLocation({ ...location, country: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 h-11 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {location.city || location.country ? 'Continue' : 'Skip'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Done */}
        {step === 2 && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🔍</div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">You&apos;re all set!</h2>
              <p className="text-muted-foreground">
                Discover businesses, book services, and connect with professionals tailored to your
                interests.
              </p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-left space-y-2">
              <p className="text-sm font-medium">Your interests:</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((val) => {
                  const cat = INTEREST_CATEGORIES.find((c) => c.value === val)
                  return (
                    <span
                      key={val}
                      className="text-xs px-2 py-1 rounded-full bg-background border border-border"
                    >
                      {cat?.emoji} {cat?.label}
                    </span>
                  )
                })}
              </div>
            </div>
            <button
              onClick={() => router.push('/explore')}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
