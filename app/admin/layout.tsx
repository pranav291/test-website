import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-white/10 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h2 className="text-xl font-bold gradient-text">DTA Admin</h2>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <a
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-primary font-medium border border-primary/20"
          >
            Dashboard
          </a>
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground text-center">
            Darbhanga Taekwondo
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-card/50 backdrop-blur flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold md:hidden">DTA Admin</h1>
          <div className="ml-auto">
            {/* Simple user indicator */}
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
