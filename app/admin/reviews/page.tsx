'use client'

import { useState, useEffect } from 'react'
import { Star, Trash2, Plus, Eye, EyeOff, X, MessageSquare } from 'lucide-react'

interface Review { _id: string; name: string; role: string; text: string; stars: number; visible: boolean }

const blank = { name: '', role: 'Student', text: '', stars: 5, visible: true }
const inp = 'w-full px-3 py-2.5 bg-[#222] border border-white/8 rounded-xl text-sm outline-none focus:border-orange-500/50 text-white placeholder-white/20 transition-colors'
const lbl = 'block text-xs font-medium text-white/40 mb-1.5'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`w-3.5 h-3.5 ${i <= count ? 'text-yellow-400 fill-yellow-400' : 'text-white/15'}`} />
      ))}
    </div>
  )
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/reviews').then(r => r.json()).then(setReviews).finally(() => setLoading(false))
  }, [])

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

  const avgStars = reviews.length ? (reviews.reduce((s, r) => s + r.stars, 0) / reviews.length).toFixed(1) : '—'

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">Reviews</h1>
          <p className="text-xs text-white/35 mt-0.5">Shown on the website homepage</p>
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
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-white">{reviews.length}</div>
          <div className="text-[10px] text-white/35">Total</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-yellow-400">{avgStars}</div>
          <div className="text-[10px] text-white/35">Avg Stars</div>
        </div>
        <div className="bg-[#1a1a1a] rounded-2xl p-3 border border-white/6 text-center">
          <div className="text-xl font-bold text-green-400">{reviews.filter(r => r.visible).length}</div>
          <div className="text-[10px] text-white/35">Visible</div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#1a1a1a] w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h3 className="font-bold text-white">Add Review</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={save} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lbl}>Name</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inp} placeholder="Arjun Kumar" />
                </div>
                <div>
                  <label className={lbl}>Role</label>
                  <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inp} placeholder="Student / Parent" />
                </div>
              </div>
              <div>
                <label className={lbl}>Review Text</label>
                <textarea required rows={3} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} className={`${inp} resize-none`} placeholder="Write the review..." />
              </div>
              <div>
                <label className={lbl}>Stars</label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map(n => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, stars: n })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${form.stars === n ? 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400' : 'border-white/8 text-white/35 hover:text-white/60'}`}>
                      {n}★
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 justify-end pt-2 border-t border-white/8">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 border border-white/8 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
                  {saving ? 'Saving...' : 'Add Review'}
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
      ) : reviews.length === 0 ? (
        <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center border border-dashed border-white/10">
          <MessageSquare className="w-8 h-8 text-white/15 mx-auto mb-2" />
          <p className="text-sm text-white/30">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {reviews.map(r => (
            <div key={r._id} className={`bg-[#1a1a1a] rounded-2xl p-4 border border-white/6 transition-opacity ${!r.visible ? 'opacity-40' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
                    {r.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">{r.name}</span>
                      <span className="text-xs text-white/35">{r.role}</span>
                    </div>
                    <Stars count={r.stars} />
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => toggleVisible(r)} className="p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/8 transition-colors" title={r.visible ? 'Hide' : 'Show'}>
                    {r.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => del(r._id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white/55 mt-3 pl-12 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
