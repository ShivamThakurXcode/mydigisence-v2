import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="px-6 py-12 max-w-5xl mx-auto">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Mydigisence — Digital Presence Profile</h1>
        <p className="text-lg text-muted-foreground mb-6">Build and share professional profiles, workspaces, and AI-powered presence.</p>

        <div className="flex gap-4 justify-center">
          <Link href="/marketing" className="inline-block px-4 py-2 rounded bg-primary text-white">Explore Marketing</Link>
          <Link href="/dashboard" className="inline-block px-4 py-2 rounded border">Open Dashboard</Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">Profiles</h3>
          <p className="text-sm text-muted-foreground">Create public profiles and share your digital presence.</p>
        </div>
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">Workspaces</h3>
          <p className="text-sm text-muted-foreground">Collaborate and showcase projects in dedicated workspaces.</p>
        </div>
        <div className="p-6 border rounded">
          <h3 className="font-semibold mb-2">AI Studio</h3>
          <p className="text-sm text-muted-foreground">Explore AI tools for content and profile optimization.</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Quick links</h2>
        <ul className="space-y-2">
          <li><Link href="/ai" className="text-primary hover:underline">AI Studio</Link></li>
          <li><Link href="/marketing" className="text-primary hover:underline">Marketing site</Link></li>
          <li><Link href="/profiles" className="text-primary hover:underline">Profiles</Link></li>
          <li><Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link></li>
        </ul>
      </section>
    </main>
  )
}
