'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, X, Bell, BellOff } from 'lucide-react'

interface Ann { _id: string; text: string; type: 'info' | 'warning' | 'success'; active: boolean; expiresAt: string | null }

const blank = { text: '', type: 'info' as const, active: true, expiresAt: '' }
const inputCls = 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none text-white placeholder-white/30'
const typeColors = { info: 'border-blue-500/30 bg-blue-500/10 text-blue-300', warning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300', success: 'border-green-500/30 bg-green-500/10 text-green-300' }

export default function AnnouncementsAdminPage() {
  const [anns, setAnns] = useState<Ann[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/announcements').then(r => r.json()).then(setAnns).finally(() => setLoading(false)) }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const body = { ...form, expiresAt: form.expiresAt ? new Date(form.expiresAt) : null }
    const res = await fetch('/api/announcements', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { const a = await res.json(); setAnns([a, ...anns]); setShowForm(false); setForm(blank) }
    setSaving(false)
  }

  const toggle = async (a: Ann) => {
    const res = await fetch('/api/announcements', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: a._id, active: !a.active }) })
    if (res.ok) setAnns(anns.map(x => x._id === a._id ? { ...x, active: !x.active } : x))
  }

  const del = async (id: string) => {
    if (!confirm('Delete this announcement?')) return
    await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' })
    setAnns(anns.filter(a => a._id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-bold text-white">Announcement Banner</h2><p className="text-xs text-muted-foreground mt-1">Show notices on the website (exam dates, holidays, events)</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="w-4 h-4" /> New Announcement</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-white">New Announcement</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Message</label><textarea required rows={2} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inputCls} resize-none`} placeholder="e.g. Academy will be closed on 26 March — Happy Holi!" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as 'info' | 'warning' | 'success' })} className={inputCls}>
                    <option value="info">ℹ️ Info</option>
                    <option value="success">✅ Success</option>
                    <option value="warning">⚠️ Warning</option>
                  </select>
                </div>
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Expires On (optional)</label><input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className={inputCls} /></div>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-white/10 rounded-xl text-sm text-muted-foreground hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? 'Saving...' : 'Publish'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="h-40 flex items-center justify-center"><div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="space-y-3">
          {anns.length === 0 && <div className="glass rounded-xl p-8 text-center text-muted-foreground border border-white/10">No announcements yet.</div>}
          {anns.map(a => (
            <div key={a._id} className={`rounded-xl p-4 border flex items-start justify-between gap-3 ${typeColors[a.type]} ${!a.active ? 'opacity-50' : ''}`}>
              <div className="flex-1">
                <p className="text-sm font-medium">{a.text}</p>
                {a.expiresAt && <p className="text-xs mt-1 opacity-70">Expires: {new Date(a.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => toggle(a)} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title={a.active ? 'Deactivate' : 'Activate'}>
                  {a.active ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                </button>
                <button onClick={() => del(a._id)} className="p-2 hover:bg-black/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
