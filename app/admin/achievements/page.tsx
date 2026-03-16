'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Eye, EyeOff, X, Trophy } from 'lucide-react'

interface Achievement {
  _id: string; studentName: string; achievement: string
  level: string; medal: string; date: string; visible: boolean
}

const blank = { studentName: '', achievement: '', level: 'district', medal: 'gold', date: new Date().toISOString().split('T')[0], visible: true }
const inp = 'w-full px-3 py-2.5 bg-[#222] border border-white/8 rounded-xl text-sm outline-none focus:border-orange-500/50 text-white placeholder-white/20 transition-colors'
const lbl = 'block text-xs font-medium text-white/40 mb-1.5'
const MEDAL: Record<string, string> = { gold: '🥇', silver: '🥈', bronze: '🥉', none: '🏅' }
const LEVEL: Record<string, string> = { district: 'District', state: 'State', national: 'National', international: 'International', belt: 'Belt Exam' }
const LEVEL_COLOR: Record<string, string> = {
  district: 'bg-blue-500/10 text-blue-400', state: 'bg-purple-500/10 text-purple-400',
  national: 'bg-orange-500/10 text-orange-400', international: 'bg-yellow-500/10 text-yellow-400',
  belt: 'bg-green-500/10 text-green-400',
}

export default function AchievementsAdminPage() {
  const [items, setItems] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/achievements').then(r => r.json()).then(setItems).finally(() => setLoading(false))
  }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const res = await fetch('/api/admin/achievements', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (res.ok) { const a = await res.json(); setItems([a, ...items]); setShowForm(false); setForm(blank) }
    setSaving(false)
  }

  const toggleVisible = async (item: Achievement) => {
    const res = await fetch('/api/admin/achievements', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item._id, visible: !item.visible }),
    })
    if (res.ok) setItems(items.map(x => x._id === item._id ? { ...x, visible: !x.visible } : x))
  }

  const del = async (id: string) => {
    if (!confirm('Delete this achievement?')) return
    await fetch(`/api/admin/achievements?id=${id}`, { method: 'DELETE' })
    setItems(items.filter(x => x._id !== id))
  }

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Achievements</h1>
          <p className="text-xs text-white/35 mt-0.5">Medals and wins shown on the website</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(MEDAL).map(([key, emoji]) => (
          <div key={key} className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
            <div className="text-xl mb-1">{emoji}</div>
            <div className="text-lg font-bold text-white">{items.filter(i => i.medal === key).length}</div>
            <div className="text-[10px] text-white/35 capitalize">{key}</div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h3 className="font-bold text-white">Add Achievement</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div>
                <label className={lbl}>Student Name</label>
                <input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className={inp} placeholder="e.g. Arjun Kumar" />
              </div>
              <div>
                <label className={lbl}>Achievement</label>
                <input required value={form.achievement} onChange={e => setForm({ ...form, achievement: e.target.value })} className={inp} placeholder="e.g. State Championship 2026 – 1st Place" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={lbl}>Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className={inp}>
                    {Object.entries(LEVEL).map(([k, v]) => <option key={k} value={k} className="bg-[#1a1a1a]">{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lbl}>Medal</label>
                  <select value={form.medal} onChange={e => setForm({ ...form, medal: e.target.value })} className={inp}>
                    <option value="gold" className="bg-[#1a1a1a]">🥇 Gold</option>
                    <option value="silver" className="bg-[#1a1a1a]">🥈 Silver</option>
                    <option value="bronze" className="bg-[#1a1a1a]">🥉 Bronze</option>
                    <option value="none" className="bg-[#1a1a1a]">🏅 Participation</option>
                  </select>
                </div>
                <div>
                  <label className={lbl}>Date</label>
                  <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inp} />
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-white/8">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 border border-white/8 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-7 h-7 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center border border-dashed border-white/10">
          <Trophy className="w-8 h-8 text-white/15 mx-auto mb-2" />
          <p className="text-sm text-white/30">No achievements yet. Add the first medal!</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map(item => (
            <div key={item._id} className={`bg-[#1a1a1a] rounded-2xl p-4 border border-white/6 transition-opacity ${!item.visible ? 'opacity-40' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl shrink-0">{MEDAL[item.medal]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{item.studentName}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${LEVEL_COLOR[item.level]}`}>
                      {LEVEL[item.level]}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{item.achievement}</p>
                  <p className="text-[10px] text-white/25 mt-1">
                    {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleVisible(item)} className="p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/8 transition-colors" title={item.visible ? 'Hide' : 'Show'}>
                    {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => del(item._id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
