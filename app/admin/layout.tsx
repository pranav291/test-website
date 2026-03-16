'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogoutButton } from '@/components/admin/logout-button'
import {
  LayoutDashboard, Users, CalendarCheck, IndianRupee, MessageSquare,
  Image as ImageIcon, Star, Megaphone, Trophy, BarChart2, Menu, X
} from 'lucide-react'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/stats', label: 'Visitor Stats', icon: BarChart2 },
  { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-card/95 backdrop-blur-md border-r border-white/10 flex flex-col shrink-0 z-50 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
          <h2 className="text-xl font-bold gradient-text">DTA Admin</h2>
          <button onClick={closeSidebar} className="md:hidden p-2 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">Navigation</div>
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link 
                key={href} 
                href={href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active 
                    ? 'bg-primary/15 text-primary border border-primary/20 shadow-[0_0_15px_rgba(234,88,12,0.1)]' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? 'text-primary' : 'group-hover:text-white'}`} />
                {label}
              </Link>
            )
          })}
          
          <div className="mt-auto pt-6 px-2">
            <LogoutButton />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        <header className="h-16 border-b border-white/10 bg-card/70 backdrop-blur-md flex items-center px-4 md:px-8 shrink-0 sticky top-0 z-30">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-2 mr-3 text-white/70 hover:text-white rounded-md hover:bg-white/10 transition-colors -ml-2"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <h1 className="text-lg font-semibold md:hidden gradient-text">DTA Admin</h1>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:block"><LogoutButton /></div>
            <div className="w-9 h-9 border flex rounded-full bg-gradient-to-tr from-primary/30 to-primary/10 border-primary/30 items-center justify-center text-primary font-bold text-sm shadow-[0_0_10px_rgba(234,88,12,0.2)]">
              A
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-24 lg:pb-8 custom-scrollbar relative bg-black/20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none -mt-32"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
