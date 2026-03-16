'use client'

import { useState, useEffect } from 'react'
import { Trash2, Plus, X, Bell, BellOff, Megaphone } from 'lucide-react'

interface Ann { _id: string; text: string; type: 'info' | 'warning' | 'success'; active: boolean; expiresAt: string | null }

const blank = { text: '', type: 'info' as const, active: true, expiresAt: '' }
const inp = 'w-full px-3 py-2.5 bg-[#222] border border-white/8 rounded-xl text-sm outline-none focus:border-orange-500/50 text-white placeholder-white/20 transition-colors'
const lbl = 'block text-xs font-medium text-white/40 mb-1.5'

const TYPE_CONFIG: Record<string, { label: string; dot: string; bg: string; border: string; text: string }> = {
  info:    { label: 'Info',    dot: 'bg-blue-400',   bg: 'bg-blue-500/8',   border: 'border-blue-500/15',   text: 'text-blue-300' },
  warning: { label: 'Warning', dot: 'bg-yellow-400', bg: 'bg-yellow-500/8', border: 'border-yellow-500/15', text: 'text-yellow-300' },
  success: { label: 'Success', dot: 'bg-green-400',  bg: 'bg-green-500/8',  border: 'border-green-500/15',  text: 'text-green-300' },
}

export default function AnnouncementsAdminPage() {
  const [anns, setAnns] = useState<Ann[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/announcements').then(r => r.json()).then(setAnns).finally(() => setLoading(false))
  }, [])

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
    <div className="space-y-4 pb-20 md:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Announcements</h1>
          <p className="text-xs text-white/35 mt-0.5">Notices shown on the website (exams, holidays, events)</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> New
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-white">{anns.length}</div>
          <div className="text-[10px] text-white/35">Total</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-green-400">{anns.filter(a => a.active).length}</div>
          <div className="text-[10px] text-white/35">Active</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-white/40">{anns.filter(a => !a.active).length}</div>
          <div className="text-[10px] text-white/35">Inactive</div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h3 className="font-bold text-white">New Announcement</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div>
                <label className={lbl}>Message</label>
                <textarea required rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inp} resize-none`} placeholder="e.g. Academy will be closed on 26 March — Happy Holi!" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Type</label>
                  <div className="flex flex-col gap-1.5">
                    {(['info', 'success', 'warning'] as const).map(t => {
                      const c = TYPE_CONFIG[t]
                      return (
                        <button key={t} type="button" onClick={() => setForm({ ...form, type: t })}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors border ${form.type === t ? `${c.bg} ${c.border} ${c.text}` : 'border-white/8 text-white/40 hover:bg-white/5'}`}>
                          <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                          {c.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label className={lbl}>Expires On</label>
                  <input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className={inp} />
                  <p className="text-[10px] text-white/25 mt-1">Leave blank for no expiry</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-white/8">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 border border-white/8 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
                  {saving ? 'Saving...' : 'Publish'}
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
      ) : anns.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center border border-dashed border-white/10">
          <Megaphone className="w-8 h-8 text-white/15 mx-auto mb-2" />
          <p className="text-sm text-white/30">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {anns.map(a => {
            const c = TYPE_CONFIG[a.type]
            return (
              <div key={a._id} className={`rounded-2xl p-4 border transition-opacity ${c.bg} ${c.border} ${!a.active ? 'opacity-40' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${c.dot}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${c.text}`}>{c.label}</span>
                        {!a.active && <span className="text-[10px] text-white/25 font-medium">• Inactive</span>}
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{a.text}</p>
                      {a.expiresAt && (
                        <p className="text-[10px] text-white/30 mt-1.5">
                          Expires: {new Date(a.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => toggle(a)} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors" title={a.active ? 'Deactivate' : 'Activate'}>
                      {a.active ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => del(a._id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
