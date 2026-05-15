'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function VerifyEmailInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) return
    setStatus('loading')
    fetch(`${process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000'}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data: { success: boolean; data?: { message: string }; error?: { message: string } }) => {
        if (data.success) {
          setStatus('success')
          setMessage(data.data?.message ?? 'Email verified!')
        } else {
          setStatus('error')
          setMessage(data.error?.message ?? 'Verification failed')
        }
      })
      .catch(() => {
        setStatus('error')
        setMessage('Network error. Please try again.')
      })
  }, [token])

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-bold">Invalid verification link</h1>
        <p className="text-muted-foreground">The link is invalid or has expired.</p>
        <Link
          href="/login"
          className="inline-block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors"
        >
          Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 text-center">
      {status === 'loading' && (
        <>
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Verifying your email...</p>
        </>
      )}
      {status === 'success' && (
        <>
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Email verified!</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <button
            onClick={() => router.push('/login')}
            className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Sign in to your account
          </button>
        </>
      )}
      {status === 'error' && (
        <>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Verification failed</h2>
            <p className="text-muted-foreground">{message}</p>
          </div>
          <Link
            href="/login"
            className="block w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium leading-10 text-center hover:bg-primary/90 transition-colors"
          >
            Back to login
          </Link>
        </>
      )}
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center py-12">
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <VerifyEmailInner />
    </Suspense>
  )
}
