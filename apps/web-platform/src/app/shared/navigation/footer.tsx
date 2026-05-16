import Link from 'next/link'

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Product</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/marketing" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="/marketing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="/ai" className="hover:text-foreground transition-colors">AI Studio</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Platform</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/profiles" className="hover:text-foreground transition-colors">Profiles</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Company</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link href="/" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <span className="text-sm font-bold text-foreground">MyDigiSence</span>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MyDigiSence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
