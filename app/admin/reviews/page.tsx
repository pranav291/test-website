'use client'

import { useState, useEffect } from 'react'
import { Star, Trash2, Plus, Eye, EyeOff, X } from 'lucide-react'

interface Review { _id: string; name: string; role: string; text: string; stars: number; visible: boolean }

const blank = { name: '', role: 'Student', text: '', stars: 5, visible: true }
const inputCls = 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none text-white placeholder-white/30'

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/admin/reviews').then(r => r.json()).then(setReviews).finally(() => setLoading(false)) }, [])

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true)
    const res = await fetch('/api/admin/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { const r = await res.json(); setReviews([r, ...reviews]); setShowForm(false); setForm(blank) }
    setSaving(false)
  }

  const toggleVisible = async (r: Review) => {
    const res = await fetch('/api/admin/reviews', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: r._id, visible: !r.visible }) })
    if (res.ok) setReviews(reviews.map(x => x._id === r._id ? { ...x, visible: !x.visible } : x))
  }

  const del = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' })
    setReviews(reviews.filter(r => r._id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-bold text-white">Reviews Manager</h2><p className="text-xs text-muted-foreground mt-1">Add and manage student reviews shown on the website</p></div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Plus className="w-4 h-4" /> Add Review</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-lg rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-white">Add New Review</h3>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Student Name</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Arjun Kumar" /></div>
                <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Role</label><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputCls} placeholder="Student / Parent" /></div>
              </div>
              <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Review Text</label><textarea required rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inputCls} resize-none`} placeholder="Write the review..." /></div>
              <div><label className="block text-xs text-muted-foreground uppercase font-semibold mb-1.5">Stars</label>
                <select value={form.stars} onChange={e => setForm({ ...form, stars: Number(e.target.value) })} className={inputCls}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border border-white/10 rounded-xl text-sm text-muted-foreground hover:bg-white/5">Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-50">{saving ? 'Saving...' : 'Add Review'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? <div className="h-40 flex items-center justify-center"><div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div> : (
        <div className="grid gap-4">
          {reviews.length === 0 && <div className="glass rounded-xl p-8 text-center text-muted-foreground border border-white/10">No reviews yet.</div>}
          {reviews.map(r => (
            <div key={r._id} className={`glass rounded-xl p-5 border border-white/10 ${!r.visible ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{r.name}</span>
                    <span className="text-xs text-muted-foreground">— {r.role}</span>
                    <span className="text-yellow-400 text-xs">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.text}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleVisible(r)} className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground transition-colors" title={r.visible ? 'Hide' : 'Show'}>
                    {r.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => del(r._id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
