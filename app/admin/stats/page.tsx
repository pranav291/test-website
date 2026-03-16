'use client'

import { useState, useEffect } from 'react'
import { Eye, TrendingUp, BarChart2, Calendar } from 'lucide-react'

interface Stat { date: string; count: number }

export default function StatsAdminPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then((data: Stat[]) => setStats([...data].sort((a, b) => b.date.localeCompare(a.date))))
      .finally(() => setLoading(false))
  }, [])

  const total = stats.reduce((sum, s) => sum + s.count, 0)
  const today = stats.find(s => s.date === new Date().toISOString().split('T')[0])?.count ?? 0
  const max = Math.max(...stats.map(s => s.count), 1)
  const peak = Math.max(...stats.map(s => s.count), 0)
  const avg = stats.length ? Math.round(total / stats.length) : 0

  // Last 7 days for bar chart
  const last7 = stats.slice(0, 7).reverse()

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <div>
        <h1 className="text-xl font-bold text-white">Visitor Stats</h1>
        <p className="text-xs text-white/35 mt-0.5">Last 30 days of website visits</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Eye, label: 'Today', value: today, color: 'text-orange-400 bg-orange-500/10' },
          { icon: TrendingUp, label: 'This Month', value: total, color: 'text-blue-400 bg-blue-500/10' },
          { icon: BarChart2, label: 'Peak Day', value: peak, color: 'text-purple-400 bg-purple-500/10' },
          { icon: Calendar, label: 'Daily Avg', value: avg, color: 'text-green-400 bg-green-500/10' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
            <div className={`inline-flex p-2 rounded-xl mb-3 ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-white/35 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Bar chart - last 7 days */}
          {last7.length > 0 && (
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
              <p className="text-sm font-semibold text-white mb-1">Last 7 Days</p>
              <p className="text-xs text-white/35 mb-5">Daily visitor count</p>
              <div className="flex items-end gap-2 h-32">
                {last7.map(s => {
                  const pct = (s.count / Math.max(...last7.map(x => x.count), 1)) * 100
                  const isToday = s.date === new Date().toISOString().split('T')[0]
                  return (
                    <div key={s.date} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] text-white/40 font-medium">{s.count}</span>
                      <div className="w-full rounded-lg overflow-hidden" style={{ height: 96 }}>
                        <div
                          className={`w-full rounded-lg transition-all ${isToday ? 'bg-orange-500' : 'bg-orange-500/40'}`}
                          style={{ height: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-white/30">
                        {new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Full table */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
            <p className="text-sm font-semibold text-white mb-4">All Records</p>
            {stats.length === 0 ? (
              <p className="text-sm text-white/30 text-center py-8">No visitor data yet. Data is recorded automatically when users visit the website.</p>
            ) : (
              <div className="space-y-2">
                {stats.map(s => {
                  const isToday = s.date === new Date().toISOString().split('T')[0]
                  return (
                    <div key={s.date} className="flex items-center gap-3">
                      <span className={`text-xs w-20 shrink-0 ${isToday ? 'text-orange-400 font-semibold' : 'text-white/40'}`}>
                        {new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        {isToday && ' (Today)'}
                      </span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isToday ? 'bg-orange-500' : 'bg-orange-500/45'}`}
                          style={{ width: `${(s.count / max) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white/60 w-8 text-right">{s.count}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
