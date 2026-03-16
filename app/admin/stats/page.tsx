'use client'

import { useState, useEffect } from 'react'
import { BarChart2, TrendingUp, Users, Eye } from 'lucide-react'

interface Stat { date: string; count: number }

export default function StatsAdminPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then((data: Stat[]) => {
      setStats([...data].sort((a, b) => b.date.localeCompare(a.date)))
    }).finally(() => setLoading(false))
  }, [])

  const total = stats.reduce((sum, s) => sum + s.count, 0)
  const today = stats.find(s => s.date === new Date().toISOString().split('T')[0])?.count ?? 0
  const max = Math.max(...stats.map(s => s.count), 1)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white">Visitor Stats</h2>
        <p className="text-xs text-muted-foreground mt-1">Last 30 days of website visits</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-2"><Eye className="w-4 h-4 text-primary" /><p className="text-xs text-muted-foreground uppercase font-semibold">Today</p></div>
          <p className="text-3xl font-black text-white">{today}</p>
        </div>
        <div className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-primary" /><p className="text-xs text-muted-foreground uppercase font-semibold">This Month</p></div>
          <p className="text-3xl font-black text-white">{total}</p>
        </div>
        <div className="glass rounded-xl p-5 border border-white/10">
          <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-primary" /><p className="text-xs text-muted-foreground uppercase font-semibold">Peak Day</p></div>
          <p className="text-3xl font-black text-white">{max}</p>
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center"><div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="glass rounded-xl p-6 border border-white/10">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-5 flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Daily Visitors</h3>
          <div className="space-y-2.5">
            {stats.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No visitor data yet. Data is recorded automatically when users visit the website.</p>}
            {stats.map(s => (
              <div key={s.date} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 shrink-0">{new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                <div className="flex-1 bg-white/5 rounded-full h-5 overflow-hidden">
                  <div className="h-full bg-primary/60 rounded-full transition-all duration-500" style={{ width: `${(s.count / max) * 100}%` }} />
                </div>
                <span className="text-xs font-semibold text-white w-8 text-right">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
