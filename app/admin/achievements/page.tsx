'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, Eye, EyeOff, X, Trophy } from 'lucide-react'

interface Achievement { _id: string; studentName: string; achievement: string; level: string; medal: string; date: string; visible: boolean }

const blank = { studentName: '', achievement: '', level: 'district', medal: 'gold', date: new Date().toISOString().split('T')[0], visible: true }
const inputCls = 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none text-white placeholder-white/30'
const MEDAL: Record<string, string> = { gold: '🥇', silver: '🥈', bronze: '🥉', none: '🏅' }
const LEVEL: Record<string, string> = { district: 'District', state: 'State', national: 'National', international: 'International', belt: 'Belt Exam' }

export default function AchievementsAdminPage() {
  const [items, setItems] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/admin/achievements').then(r => r.json()).then(setItems).finally(() => setLoading(false)) }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const res = await fetch('/api/admin/achievements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { const a = await res.json(); setItems([a, ...items]); setShowForm(false); setForm(blank) }
    setSaving(false)
  }

  const toggleVisible = async (item: Achievement) => {
    const res = await fetch('/api/admin/achievements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item._id, visible: !item.visible }) })
    if (res.ok) setItems(items.map(x => x._id === item._id ? { ...x, visible: !x.visible } : x))
  }

  const del = async (id: string) => {
    if (!confirm('Delete this achievement?')) return
    await fetch(`/api/admin/achievements?id=${id}`, { method: 'DELETE' })
    setItems(items.filter(x => x._id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-bold text-white">Achievement Tracker</h2><p className="text-xs text-muted-foreground mt-1">Record medals and wins — they appear in the Achievements section</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="w-4 h-4" /> Add Achievement</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-white">Add Achievement</h3><button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button></div>
            <form onSubmit={save} className="space-y-4">
              <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Student Name</label><input required value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className={inputCls} placeholder="e.g. Arjun Kumar" /></div>
              <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Achievement</label><input required value={form.achievement} onChange={e => setForm({ ...form, achievement: e.target.value })} className={inputCls} placeholder="e.g. State Championship 2026 – 1st Place" /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Level</label>
                  <select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} className={inputCls}>
                    {Object.entries(LEVEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Medal</label>
                  <select value={form.medal} onChange={e => setForm({ ...form, medal: e.target.value })} className={inputCls}>
                    <option value="gold">🥇 Gold</option><option value="silver">🥈 Silver</option><option value="bronze">🥉 Bronze</option><option value="none">🏅 Participation</option>
                  </select>
                </div>
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} /></div>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-white/10 rounded-xl text-sm text-muted-foreground hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="h-40 flex items-center justify-center"><div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="glass rounded-xl overflow-hidden border border-white/10">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs">
              <tr><th className="px-5 py-4">Medal</th><th className="px-5 py-4">Student</th><th className="px-5 py-4">Achievement</th><th className="px-5 py-4">Level</th><th className="px-5 py-4">Date</th><th className="px-5 py-4 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.length === 0 && <tr><td colSpan={6} className="px-5 py-8 text-center">No achievements yet.</td></tr>}
              {items.map(item => (
                <tr key={item._id} className={`hover:bg-white/5 transition-colors ${!item.visible ? 'opacity-40' : ''}`}>
                  <td className="px-5 py-4 text-2xl">{MEDAL[item.medal]}</td>
                  <td className="px-5 py-4 font-medium text-white">{item.studentName}</td>
                  <td className="px-5 py-4">{item.achievement}</td>
                  <td className="px-5 py-4"><span className="px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-xs">{LEVEL[item.level]}</span></td>
                  <td className="px-5 py-4 text-xs whitespace-nowrap">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => toggleVisible(item)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground">{item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                      <button onClick={() => del(item._id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
