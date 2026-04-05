'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/admin/logout-button'
import {
  LayoutDashboard, BarChart2, Trophy, Megaphone, Star, Menu, X,
  Users, CalendarCheck, IndianRupee, MessageSquare, Image as ImageIcon, FileText
} from 'lucide-react'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/stats', label: 'Stats', icon: BarChart2 },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/achievements', label: 'Awards', icon: Trophy },
  { href: '/admin/announcements', label: 'Notice', icon: Megaphone },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row">

      {/* ── MOBILE TOP BAR ─────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0f0f0f] border-b border-white/8">
        <span className="font-bold text-base tracking-tight text-white">DTA Admin</span>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────── */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-64 bg-[#161616] border-l border-white/8 flex flex-col md:hidden">
            <div className="flex items-center justify-between px-5 h-14 border-b border-white/8">
              <span className="font-bold text-sm text-white">Menu</span>
              <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/8">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-orange-500/15 text-orange-400'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t border-white/8">
              <LogoutButton />
            </div>
          </div>
        </>
      )}

      {/* ── DESKTOP SIDEBAR ────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 sticky top-0 h-screen bg-[#161616] border-r border-white/8">
        <div className="h-16 flex items-center px-5 border-b border-white/8">
          <span className="font-bold text-base text-white tracking-tight">DTA Admin</span>
        </div>

        <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
          <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-2 px-2">Menu</p>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-orange-500/12 text-orange-400'
                    : 'text-white/45 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-orange-400' : ''}`} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/8 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs shrink-0">
              A
            </div>
            <span className="text-sm font-medium text-white/70">Admin</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── MAIN ───────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Desktop top bar */}
        <div className="hidden md:flex h-16 items-center px-6 border-b border-white/8 bg-[#0f0f0f] sticky top-0 z-30">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 font-bold text-xs">
              A
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 pb-6">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* ── MOBILE BOTTOM TAB BAR ──────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161616] border-t border-white/8 flex">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors ${
                active ? 'text-orange-400' : 'text-white/35 hover:text-white/70'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
