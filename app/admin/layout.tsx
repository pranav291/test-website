'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/admin/logout-button'
import {
  LayoutDashboard, Users, CalendarCheck, IndianRupee, MessageSquare,
  Image as ImageIcon, Star, Megaphone, Trophy, BarChart2
} from 'lucide-react'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
  { href: '/admin/fees', label: 'Fees', icon: IndianRupee },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { href: '/admin/stats', label: 'Visitor Stats', icon: BarChart2 },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-white/10 hidden md:flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <h2 className="text-xl font-bold gradient-text">DTA Admin</h2>
        </div>
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
          <div className="mt-auto pt-4">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 border-b border-white/10 bg-card/50 backdrop-blur flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold md:hidden">DTA Admin</h1>
          <div className="ml-auto flex items-center gap-4">
            <div className="md:hidden"><LogoutButton /></div>
            <div className="hidden md:flex w-8 h-8 rounded-full bg-primary/20 items-center justify-center text-primary font-bold text-sm">A</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </div>
      </main>
    </div>
  )
}
