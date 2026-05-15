import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: {
    template: '%s | MyDigiSence',
    default: 'Auth | MyDigiSence',
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          MyDigiSence
        </Link>
        <div className="space-y-6">
          <blockquote className="text-2xl font-serif leading-snug">
            &ldquo;The unified operating system for your digital presence, business identity, and
            professional growth.&rdquo;
          </blockquote>
          <div className="flex gap-3 flex-wrap">
            {['Businesses', 'Professionals', 'Creators', 'Agencies'].map((type) => (
              <span
                key={type}
                className="px-3 py-1 rounded-full text-sm bg-sidebar-accent text-sidebar-accent-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-60">
          &copy; {new Date().getFullYear()} MyDigiSence. All rights reserved.
        </p>
      </div>

      {/* Right — Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </div>
  )
}
