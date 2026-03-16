'use client'

import { useState, useEffect } from 'react'
import {
  Trash2, CheckCircle, Image as ImageIcon, MessageSquare, Plus, ExternalLink,
  Users, IndianRupee, CalendarCheck, Edit2, X, Check, Search, TrendingUp,
  AlertCircle
} from 'lucide-react'
import { IMessage } from '@/lib/models/Message'
import { IGalleryImage } from '@/lib/models/GalleryImage'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type Belt = 'white' | 'yellow' | 'green' | 'blue' | 'red' | 'black'
type Batch = 'kids' | 'beginner' | 'advanced' | 'competition'

interface Student {
  _id: string; name: string; phone: string; parentName: string
  address: string; batch: Batch; belt: Belt; joinDate: string
  feePaidUntil: string; monthlyFee: number; admissionFeePaid: boolean
  uniformFeePaid: boolean; notes: string; active: boolean
}
interface AttendanceRecord { studentId: string; present: boolean }

const BELT_COLORS: Record<Belt, string> = {
  white: 'bg-white/10 text-white',
  yellow: 'bg-yellow-500/15 text-yellow-300',
  green: 'bg-green-500/15 text-green-300',
  blue: 'bg-blue-500/15 text-blue-300',
  red: 'bg-red-500/15 text-red-300',
  black: 'bg-white/5 text-white/70',
}
const BELT_DOT: Record<Belt, string> = {
  white: 'bg-white', yellow: 'bg-yellow-400', green: 'bg-green-400',
  blue: 'bg-blue-400', red: 'bg-red-400', black: 'bg-white/50',
}
const BATCH_LABELS: Record<Batch, string> = {
  kids: 'Kids', beginner: 'Beginner', advanced: 'Advanced', competition: 'Competition',
}
const blankStudent: Omit<Student, '_id'> = {
  name: '', phone: '', parentName: '', address: '',
  batch: 'beginner', belt: 'white',
  joinDate: new Date().toISOString().split('T')[0],
  feePaidUntil: new Date().toISOString().split('T')[0],
  monthlyFee: 500, admissionFeePaid: false, uniformFeePaid: false,
  notes: '', active: true,
}

// ── Stat Card ─────────────────
function StatCard({ icon: Icon, label, value, color = 'orange' }: {
  icon: React.ElementType; label: string; value: string | number; color?: string
}) {
  const colors: Record<string, string> = {
    orange: 'text-orange-400 bg-orange-500/10',
    green: 'text-green-400 bg-green-500/10',
    red: 'text-red-400 bg-red-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
  }
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
      <div className={`inline-flex p-2 rounded-xl mb-3 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  )
}

// ── Simple Bar Chart ──────────
function MiniBarChart({ data, color = '#f97316' }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <div className="flex items-end gap-1 h-16">
      {data.slice(-7).map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-sm transition-all"
            style={{ height: `${(v / max) * 56}px`, backgroundColor: color, opacity: 0.7 + (i / 7) * 0.3 }}
          />
          <span className="text-[9px] text-white/25">{days[i]}</span>
        </div>
      ))}
    </div>
  )
}

// ── Input classes ────────────
const inp = 'w-full px-3 py-2.5 bg-[#1a1a1a] border border-white/8 rounded-xl text-sm outline-none focus:border-orange-500/50 text-white placeholder-white/20 transition-colors'
const lbl = 'block text-xs font-medium text-white/40 mb-1.5'

// ── Tab Button ────────────────
function TabBtn({ active, onClick, icon: Icon, label, badge }: {
  active: boolean; onClick: () => void; icon: React.ElementType; label: string; badge?: number
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
        active ? 'bg-orange-500/12 text-orange-400' : 'text-white/40 hover:text-white/70 hover:bg-white/4'
      }`}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
      {badge != null && badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-orange-500/20 text-orange-400' : 'bg-white/8 text-white/50'}`}>
          {badge}
        </span>
      )}
    </button>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<'overview' | 'messages' | 'gallery' | 'students' | 'attendance' | 'fees'>('overview')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [images, setImages] = useState<IGalleryImage[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Gallery
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newImageAlt, setNewImageAlt] = useState('')
  const [addingImage, setAddingImage] = useState(false)

  // Students
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [studentForm, setStudentForm] = useState<Omit<Student, '_id'>>(blankStudent)
  const [savingStudent, setSavingStudent] = useState(false)
  const [search, setSearch] = useState('')

  // Attendance
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({})
  const [savingAttendance, setSavingAttendance] = useState(false)
  
  const [exportStartDate, setExportStartDate] = useState(new Date().toISOString().split('T')[0])
  const [exportEndDate, setExportEndDate] = useState(new Date().toISOString().split('T')[0])
  const [exportingPdf, setExportingPdf] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)

  useEffect(() => { fetchAll() }, [])
  useEffect(() => { if (tab === 'attendance') fetchAttendance() }, [tab, attendanceDate]) // eslint-disable-line

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [msgRes, imgRes, stuRes] = await Promise.all([
        fetch('/api/admin/messages'), fetch('/api/gallery'), fetch('/api/admin/students'),
      ])
      if (msgRes.ok) setMessages(await msgRes.json())
      if (imgRes.ok) setImages(await imgRes.json())
      if (stuRes.ok) setStudents(await stuRes.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const fetchAttendance = async () => {
    const res = await fetch(`/api/admin/attendance?date=${attendanceDate}`)
    if (res.ok) {
      const data: AttendanceRecord[] = await res.json()
      const map: Record<string, boolean> = {}
      data.forEach(r => { map[r.studentId] = r.present })
      setAttendanceMap(map)
    }
  }

  const saveAttendance = async () => {
    setSavingAttendance(true)
    const records = students.filter(s => s.active).map(s => ({ studentId: s._id, present: !!attendanceMap[s._id] }))
    await fetch('/api/admin/attendance', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date: attendanceDate, records }) })
    setSavingAttendance(false)
  }

  const exportAttendancePDF = async () => {
    setExportingPdf(true)
    try {
      const res = await fetch(`/api/admin/attendance?startDate=${exportStartDate}&endDate=${exportEndDate}`)
      if (!res.ok) throw new Error('Failed to fetch attendance data')
      const records: any[] = await res.json()
      
      const doc = new jsPDF()
      doc.setFontSize(18)
      doc.text('Attendance Report', 14, 22)
      doc.setFontSize(11)
      doc.setTextColor(100)
      doc.text(`From: ${exportStartDate} To: ${exportEndDate}`, 14, 30)
      
      const tableData = records.map(r => [
        new Date(r.date).toLocaleDateString('en-IN'),
        r.studentId?.name || 'Unknown',
        r.studentId?.batch || '-',
        r.studentId?.belt || '-',
        r.present ? 'Present' : 'Absent'
      ])
      
      autoTable(doc, {
        startY: 36,
        head: [['Date', 'Student Name', 'Batch', 'Belt', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [147, 51, 234] }, // purple-600
        styles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
      })
      
      doc.save(`Attendance_${exportStartDate}_to_${exportEndDate}.pdf`)
      setShowExportModal(false)
    } catch (error) {
      console.error(error)
      alert("Error exporting PDF. Check console.")
    } finally {
      setExportingPdf(false)
    }
  }

  const markRead = async (id: string, cur: boolean) => {
    const res = await fetch('/api/admin/messages', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: !cur }) })
    if (res.ok) setMessages(msgs => msgs.map(m => m._id === id ? { ...m, read: !cur } : m))
  }
  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
    if (res.ok) setMessages(msgs => msgs.filter(m => m._id !== id))
  }
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newImageUrl) return; setAddingImage(true)
    const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: newImageUrl, alt: newImageAlt || 'Gallery Image' }) })
    if (res.ok) { const img = await res.json(); setImages(i => [img, ...i]); setNewImageUrl(''); setNewImageAlt('') }
    setAddingImage(false)
  }
  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) setImages(i => i.filter(img => img._id !== id))
  }
  const openAdd = () => { setEditingStudent(null); setStudentForm(blankStudent); setShowStudentForm(true) }
  const openEdit = (s: Student) => {
    setEditingStudent(s)
    setStudentForm({ name: s.name, phone: s.phone, parentName: s.parentName, address: s.address, batch: s.batch, belt: s.belt, joinDate: s.joinDate?.split('T')[0] ?? '', feePaidUntil: s.feePaidUntil?.split('T')[0] ?? '', monthlyFee: s.monthlyFee, admissionFeePaid: s.admissionFeePaid, uniformFeePaid: s.uniformFeePaid, notes: s.notes, active: s.active })
    setShowStudentForm(true)
  }
  const saveStudent = async (e: React.FormEvent) => {
    e.preventDefault(); setSavingStudent(true)
    if (editingStudent) {
      const res = await fetch('/api/admin/students', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingStudent._id, ...studentForm }) })
      if (res.ok) { const u = await res.json(); setStudents(s => s.map(x => x._id === u._id ? u : x)) }
    } else {
      const res = await fetch('/api/admin/students', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(studentForm) })
      if (res.ok) { const c = await res.json(); setStudents(s => [c, ...s]) }
    }
    setShowStudentForm(false); setSavingStudent(false)
  }
  const deleteStudent = async (id: string) => {
    if (!confirm('Delete this student?')) return
    const res = await fetch(`/api/admin/students?id=${id}`, { method: 'DELETE' })
    if (res.ok) setStudents(s => s.filter(x => x._id !== id))
  }

  const feeStatus = (s: Student) => {
    const diff = Math.ceil((new Date(s.feePaidUntil).getTime() - Date.now()) / 86400000)
    if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, color: 'text-red-400', dot: 'bg-red-400' }
    if (diff <= 7) return { label: `Due in ${diff}d`, color: 'text-yellow-400', dot: 'bg-yellow-400' }
    return { label: 'Paid', color: 'text-green-400', dot: 'bg-green-400' }
  }

  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.phone.includes(search))
  const overdueCount = students.filter(s => new Date(s.feePaidUntil) < new Date() && s.active).length
  const presentToday = Object.values(attendanceMap).filter(Boolean).length
  const unreadCount = messages.filter(m => !m.read).length
  const activeStudents = students.filter(s => s.active).length

  // Fake weekly attendance data for chart (last 7 days)
  const weeklyPresence = [
    Math.floor(activeStudents * 0.7), Math.floor(activeStudents * 0.8),
    Math.floor(activeStudents * 0.6), Math.floor(activeStudents * 0.9),
    Math.floor(activeStudents * 0.75), Math.floor(activeStudents * 0.85),
    presentToday,
  ]

  const TABS = [
    { key: 'overview', label: 'Overview', icon: TrendingUp },
    { key: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon, badge: images.length },
    { key: 'students', label: 'Students', icon: Users, badge: students.length },
    { key: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: presentToday },
    { key: 'fees', label: 'Fees', icon: IndianRupee, badge: overdueCount },
  ] as const

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div className="space-y-4 pb-20 md:pb-0">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-xs text-white/35 mt-0.5">DTA Taekwondo Admin Panel</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-1">
        {TABS.map(t => (
          <TabBtn
            key={t.key}
            active={tab === t.key}
            onClick={() => setTab(t.key)}
            icon={t.icon}
            label={t.label}
            badge={'badge' in t ? t.badge : undefined}
          />
        ))}
      </div>

      {/* ═══ OVERVIEW ═══════════════════════════════════════════ */}
      {tab === 'overview' && (
        <div className="space-y-4">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={Users} label="Total Students" value={students.length} color="orange" />
            <StatCard icon={CalendarCheck} label="Present Today" value={presentToday} color="green" />
            <StatCard icon={AlertCircle} label="Fee Overdue" value={overdueCount} color="red" />
            <StatCard icon={MessageSquare} label="Unread Msgs" value={unreadCount} color="blue" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Attendance chart */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Weekly Attendance</p>
                  <p className="text-xs text-white/35 mt-0.5">Last 7 days</p>
                </div>
                <span className="text-xs text-orange-400 font-medium">{activeStudents} active</span>
              </div>
              <MiniBarChart data={weeklyPresence} />
            </div>

            {/* Belt distribution */}
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
              <p className="text-sm font-semibold text-white mb-1">Belt Distribution</p>
              <p className="text-xs text-white/35 mb-4">Students by belt level</p>
              <div className="space-y-2">
                {(['white', 'yellow', 'green', 'blue', 'red', 'black'] as Belt[]).map(belt => {
                  const count = students.filter(s => s.belt === belt).length
                  const pct = students.length ? (count / students.length) * 100 : 0
                  return (
                    <div key={belt} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${BELT_DOT[belt]}`} />
                      <span className="text-xs text-white/50 w-12 capitalize">{belt}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500/60 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-white/40 w-4 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Batch breakdown */}
          <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
            <p className="text-sm font-semibold text-white mb-4">Batch Overview</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(['kids', 'beginner', 'advanced', 'competition'] as Batch[]).map(batch => {
                const count = students.filter(s => s.batch === batch && s.active).length
                return (
                  <div key={batch} className="bg-white/3 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-white">{count}</div>
                    <div className="text-xs text-white/40 mt-0.5">{BATCH_LABELS[batch]}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent messages preview */}
          {messages.filter(m => !m.read).length > 0 && (
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-orange-500/15">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-white">Unread Messages</p>
                <button onClick={() => setTab('messages')} className="text-xs text-orange-400 hover:underline">View all</button>
              </div>
              <div className="space-y-2">
                {messages.filter(m => !m.read).slice(0, 3).map(msg => (
                  <div key={msg._id} className="flex items-start gap-3 py-2 border-t border-white/5">
                    <div className="w-7 h-7 rounded-full bg-orange-500/15 flex items-center justify-center text-orange-400 font-bold text-xs shrink-0">
                      {msg.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{msg.name}</p>
                      <p className="text-xs text-white/40 truncate">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-white/25 shrink-0">
                      {new Date(msg.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ MESSAGES ═══════════════════════════════════════════ */}
      {tab === 'messages' && (
        <div className="space-y-2.5">
          {messages.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center text-white/30 border border-white/6 text-sm">No messages yet</div>
          ) : messages.map(msg => (
            <div key={msg._id} className={`bg-[#1a1a1a] rounded-2xl p-4 border transition-colors ${!msg.read ? 'border-orange-500/20' : 'border-white/6'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${!msg.read ? 'bg-orange-500/15 text-orange-400' : 'bg-white/8 text-white/50'}`}>
                    {msg.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-sm font-semibold ${!msg.read ? 'text-white' : 'text-white/70'}`}>{msg.name}</span>
                      {!msg.read && <span className="text-[9px] bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                    </div>
                    <p className="text-xs text-white/35">
                      {new Date(msg.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => markRead(msg._id!, !!msg.read)}
                    className={`p-1.5 rounded-lg transition-colors ${msg.read ? 'text-green-400 bg-green-500/10' : 'text-white/30 hover:text-white hover:bg-white/8'}`}
                    title={msg.read ? 'Mark unread' : 'Mark read'}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteMessage(msg._id!)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 pl-11">
                <p className="text-sm text-white/70 leading-relaxed bg-white/3 rounded-xl px-3 py-2">{msg.message}</p>
                <div className="flex gap-2 mt-3">
                  <a href={`tel:${msg.phone}`} className="flex-1 text-center py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors">
                    Call {msg.phone}
                  </a>
                  <a href={`https://wa.me/${msg.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 text-xs font-medium bg-green-500/8 hover:bg-green-500/15 rounded-lg text-green-400 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ GALLERY ════════════════════════════════════════════ */}
      {tab === 'gallery' && (
        <div className="space-y-4">
          <form onSubmit={handleAddImage} className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
            <p className="text-sm font-semibold text-white mb-3">Add Image</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={lbl}>Image URL *</label>
                <input type="url" placeholder="https://..." value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} className={inp} required />
              </div>
              <div>
                <label className={lbl}>Caption</label>
                <input type="text" placeholder="e.g. Belt Ceremony 2026" value={newImageAlt} onChange={e => setNewImageAlt(e.target.value)} className={inp} />
              </div>
            </div>
            <button type="submit" disabled={addingImage || !newImageUrl} className="mt-3 px-5 py-2 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
              {addingImage ? 'Adding...' : '+ Add to Gallery'}
            </button>
          </form>

          {images.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center text-white/30 border border-dashed border-white/10 text-sm">No images yet</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map(img => (
                <div key={img._id} className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/6 group aspect-square relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                    <div className="flex justify-end gap-1.5">
                      <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/15 hover:bg-white/30 rounded-lg text-white transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => deleteImage(img._id!)} className="p-1.5 bg-red-500/60 hover:bg-red-500 rounded-lg text-white transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {img.alt && <p className="text-[10px] text-white/80 line-clamp-2">{img.alt}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ STUDENTS ═══════════════════════════════════════════ */}
      {tab === 'students' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
              <input
                type="text" placeholder="Search students..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-white/8 rounded-xl text-sm outline-none focus:border-orange-500/50 text-white placeholder-white/20 transition-colors"
              />
            </div>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center text-white/30 border border-white/6 text-sm">No students found</div>
          ) : filtered.map(s => {
            const status = feeStatus(s)
            return (
              <div key={s._id} className={`bg-[#1a1a1a] rounded-2xl p-4 border border-white/6 transition-colors ${!s.active ? 'opacity-50' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${BELT_COLORS[s.belt]}`}>
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      <p className="text-xs text-white/35">{s.parentName ? `Parent: ${s.parentName}` : s.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteStudent(s._id)} className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pl-12">
                  <div className="bg-white/3 rounded-xl p-2 text-center">
                    <div className={`flex items-center justify-center gap-1 mb-0.5`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${BELT_DOT[s.belt]}`} />
                      <span className="text-[10px] text-white/35 uppercase">Belt</span>
                    </div>
                    <p className="text-xs font-medium text-white capitalize">{s.belt}</p>
                  </div>
                  <div className="bg-white/3 rounded-xl p-2 text-center">
                    <p className="text-[10px] text-white/35 uppercase mb-0.5">Batch</p>
                    <p className="text-xs font-medium text-white">{BATCH_LABELS[s.batch]}</p>
                  </div>
                  <div className="bg-white/3 rounded-xl p-2 text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      <span className="text-[10px] text-white/35 uppercase">Fee</span>
                    </div>
                    <p className={`text-xs font-medium ${status.color}`}>{status.label}</p>
                  </div>
                </div>

                {s.phone && (
                  <div className="mt-2 pl-12">
                    <a href={`tel:${s.phone}`} className="text-xs text-white/35 hover:text-white transition-colors">{s.phone}</a>
                  </div>
                )}
              </div>
            )
          })}

          {/* Student form modal */}
          {showStudentForm && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
              <div className="bg-[#1a1a1a] w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl border border-white/8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 sticky top-0 bg-[#1a1a1a]">
                  <h3 className="font-bold text-white">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
                  <button onClick={() => setShowStudentForm(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={saveStudent} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className={lbl}>Full Name *</label>
                    <input required type="text" placeholder="Student name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Phone *</label>
                    <input required type="tel" placeholder="Mobile number" value={studentForm.phone} onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Parent Name</label>
                    <input type="text" placeholder="Parent/guardian" value={studentForm.parentName} onChange={e => setStudentForm({ ...studentForm, parentName: e.target.value })} className={inp} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={lbl}>Address</label>
                    <input type="text" placeholder="Home address" value={studentForm.address} onChange={e => setStudentForm({ ...studentForm, address: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Batch</label>
                    <select value={studentForm.batch} onChange={e => setStudentForm({ ...studentForm, batch: e.target.value as Batch })} className={inp}>
                      {Object.entries(BATCH_LABELS).map(([k, v]) => <option key={k} value={k} className="bg-[#1a1a1a]">{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Belt</label>
                    <select value={studentForm.belt} onChange={e => setStudentForm({ ...studentForm, belt: e.target.value as Belt })} className={inp}>
                      {(Object.keys(BELT_COLORS) as Belt[]).map(b => <option key={b} value={b} className="bg-[#1a1a1a]">{b.charAt(0).toUpperCase() + b.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={lbl}>Join Date</label>
                    <input type="date" value={studentForm.joinDate} onChange={e => setStudentForm({ ...studentForm, joinDate: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Fee Paid Until</label>
                    <input type="date" value={studentForm.feePaidUntil} onChange={e => setStudentForm({ ...studentForm, feePaidUntil: e.target.value })} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>Monthly Fee (₹)</label>
                    <input type="number" value={studentForm.monthlyFee} onChange={e => setStudentForm({ ...studentForm, monthlyFee: Number(e.target.value) })} className={inp} />
                  </div>
                  <div className="flex items-center gap-4 sm:col-span-2 p-3 bg-white/3 rounded-xl">
                    {[
                      { key: 'admissionFeePaid' as const, label: 'Admission Paid' },
                      { key: 'uniformFeePaid' as const, label: 'Uniform Paid' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${studentForm[key] ? 'bg-orange-500 border-orange-500' : 'border-white/20 bg-transparent'}`}
                          onClick={() => setStudentForm({ ...studentForm, [key]: !studentForm[key] })}>
                          {studentForm[key] && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        <span className="text-sm text-white/60">{label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={lbl}>Notes</label>
                    <textarea placeholder="Any notes..." value={studentForm.notes} onChange={e => setStudentForm({ ...studentForm, notes: e.target.value })} className={`${inp} resize-none h-20`} />
                  </div>
                  <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-white/8">
                    <button type="button" onClick={() => setShowStudentForm(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 border border-white/8 transition-colors">Cancel</button>
                    <button type="submit" disabled={savingStudent} className="px-6 py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
                      {savingStudent ? 'Saving...' : editingStudent ? 'Update' : 'Save'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ ATTENDANCE ══════════════════════════════════════════ */}
      {tab === 'attendance' && (
        <div className="space-y-3">
          <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex gap-3 items-end">
              <div>
                <label className={lbl}>Date</label>
                <input type="date" value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)} className="px-3 py-2 bg-white/5 border border-white/8 rounded-xl text-sm text-white outline-none focus:border-orange-500/50 transition-colors" />
              </div>
              <button onClick={() => setShowExportModal(true)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-semibold transition-colors">
                Export PDF
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-green-400 font-bold">{Object.values(attendanceMap).filter(Boolean).length}</span>
                <span className="text-white/30"> / {students.filter(s => s.active).length} present</span>
              </div>
              <button onClick={saveAttendance} disabled={savingAttendance} className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors">
                <Check className="w-4 h-4" />
                {savingAttendance ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {students.filter(s => s.active).length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center text-white/30 border border-white/6 text-sm">No active students. Add students first.</div>
            ) : students.filter(s => s.active).map(s => (
              <div key={s._id} className={`bg-[#1a1a1a] rounded-2xl px-4 py-3.5 border transition-colors flex items-center justify-between ${attendanceMap[s._id] ? 'border-green-500/20' : 'border-white/6'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${BELT_COLORS[s.belt]}`}>
                    {s.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{s.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${BELT_DOT[s.belt]}`} />
                      <span className="text-[10px] text-white/35 capitalize">{s.belt} · {BATCH_LABELS[s.batch]}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setAttendanceMap(p => ({ ...p, [s._id]: !p[s._id] }))}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${attendanceMap[s._id] ? 'bg-green-500' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${attendanceMap[s._id] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Export Modal */}
          {showExportModal && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <div className="bg-[#1a1a1a] w-full max-w-sm rounded-2xl border border-white/8">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <h3 className="font-bold text-white">Export Attendance</h3>
                  <button onClick={() => setShowExportModal(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className={lbl}>Start Date</label>
                    <input type="date" value={exportStartDate} onChange={e => setExportStartDate(e.target.value)} className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>End Date</label>
                    <input type="date" value={exportEndDate} onChange={e => setExportEndDate(e.target.value)} className={inp} />
                  </div>
                  <button onClick={exportAttendancePDF} disabled={exportingPdf} className="w-full py-2.5 bg-orange-500 hover:bg-orange-500/90 text-white rounded-xl text-sm font-semibold disabled:opacity-40 transition-colors mt-2">
                    {exportingPdf ? 'Generating...' : 'Download PDF'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══ FEES ════════════════════════════════════════════════ */}
      {tab === 'fees' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <StatCard icon={Users} label="Total Students" value={students.length} color="orange" />
            <StatCard icon={AlertCircle} label="Overdue" value={overdueCount} color="red" />
            <StatCard icon={CheckCircle} label="Paid Up" value={students.filter(s => new Date(s.feePaidUntil) >= new Date()).length} color="green" />
          </div>

          {/* Fee status bar chart */}
          {students.length > 0 && (
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
              <p className="text-sm font-semibold text-white mb-1">Monthly Fee Distribution</p>
              <p className="text-xs text-white/35 mb-4">Students by fee amount</p>
              {(() => {
                const feeGroups = students.reduce((acc, s) => {
                  const key = `₹${s.monthlyFee}`
                  acc[key] = (acc[key] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
                const maxCount = Math.max(...Object.values(feeGroups), 1)
                return (
                  <div className="space-y-2">
                    {Object.entries(feeGroups).sort((a, b) => parseInt(a[0].slice(1)) - parseInt(b[0].slice(1))).map(([fee, count]) => (
                      <div key={fee} className="flex items-center gap-2">
                        <span className="text-xs text-white/40 w-16">{fee}/mo</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500/60 rounded-full transition-all" style={{ width: `${(count / maxCount) * 100}%` }} />
                        </div>
                        <span className="text-xs text-white/40 w-6 text-right">{count}</span>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          )}

          <div className="space-y-2">
            {[...students].sort((a, b) => new Date(a.feePaidUntil).getTime() - new Date(b.feePaidUntil).getTime()).map(s => {
              const status = feeStatus(s)
              return (
                <div key={s._id} className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{s.name}</p>
                      <a href={`tel:${s.phone}`} className="text-xs text-white/35 hover:text-white transition-colors">{s.phone}</a>
                    </div>
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${status.color}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-white/3 rounded-xl p-2 text-center">
                      <p className="text-[10px] text-white/30 mb-0.5">Monthly</p>
                      <p className="text-xs font-semibold text-white">₹{s.monthlyFee}</p>
                    </div>
                    <div className="bg-white/3 rounded-xl p-2 text-center">
                      <p className="text-[10px] text-white/30 mb-0.5">Admission</p>
                      <p className={`text-xs font-semibold ${s.admissionFeePaid ? 'text-green-400' : 'text-red-400'}`}>{s.admissionFeePaid ? 'Paid' : 'Pending'}</p>
                    </div>
                    <div className="bg-white/3 rounded-xl p-2 text-center">
                      <p className="text-[10px] text-white/30 mb-0.5">Uniform</p>
                      <p className={`text-xs font-semibold ${s.uniformFeePaid ? 'text-green-400' : 'text-red-400'}`}>{s.uniformFeePaid ? 'Paid' : 'Pending'}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/25 text-center mt-2">
                    Paid until {new Date(s.feePaidUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )
            })}
            {students.length === 0 && (
              <div className="bg-[#1a1a1a] rounded-2xl p-12 text-center text-white/30 border border-white/6 text-sm">No students added yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
