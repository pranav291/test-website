'use client'

import { useState, useEffect } from 'react'
import {
  Trash2, CheckCircle, Image as ImageIcon, MessageSquare, Plus, ExternalLink,
  Users, IndianRupee, CalendarCheck, ChevronDown, ChevronUp, Edit2, X, Check
} from 'lucide-react'
import { IMessage } from '@/lib/models/Message'
import { IGalleryImage } from '@/lib/models/GalleryImage'

type Belt = 'white' | 'yellow' | 'green' | 'blue' | 'red' | 'black'
type Batch = 'kids' | 'beginner' | 'advanced' | 'competition'

interface Student {
  _id: string
  name: string
  phone: string
  parentName: string
  address: string
  batch: Batch
  belt: Belt
  joinDate: string
  feePaidUntil: string
  monthlyFee: number
  admissionFeePaid: boolean
  uniformFeePaid: boolean
  notes: string
  active: boolean
}

interface AttendanceRecord {
  studentId: string
  present: boolean
}

const BELT_COLORS: Record<Belt, string> = {
  white: 'bg-white/20 text-white border-white/40',
  yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  green: 'bg-green-500/20 text-green-300 border-green-500/40',
  blue: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  red: 'bg-red-500/20 text-red-300 border-red-500/40',
  black: 'bg-white/5 text-white/80 border-white/20',
}

const BATCH_LABELS: Record<Batch, string> = {
  kids: 'Kids',
  beginner: 'Beginner',
  advanced: 'Advanced',
  competition: 'Competition',
}

const blankStudent: Omit<Student, '_id'> = {
  name: '', phone: '', parentName: '', address: '',
  batch: 'beginner', belt: 'white',
  joinDate: new Date().toISOString().split('T')[0],
  feePaidUntil: new Date().toISOString().split('T')[0],
  monthlyFee: 500,
  admissionFeePaid: false, uniformFeePaid: false,
  notes: '', active: true,
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'messages' | 'gallery' | 'students' | 'attendance' | 'fees'>('messages')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [images, setImages] = useState<IGalleryImage[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Gallery
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newImageAlt, setNewImageAlt] = useState('')
  const [addingImage, setAddingImage] = useState(false)

  // Students
  const [showAddStudent, setShowAddStudent] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [studentForm, setStudentForm] = useState<Omit<Student, '_id'>>(blankStudent)
  const [savingStudent, setSavingStudent] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Attendance
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0])
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({})
  const [savingAttendance, setSavingAttendance] = useState(false)

  useEffect(() => { fetchData() }, [])

  useEffect(() => {
    if (activeTab === 'attendance') fetchAttendance()
  }, [activeTab, attendanceDate]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoading(true)
    try {
      const [msgRes, imgRes, stuRes] = await Promise.all([
        fetch('/api/admin/messages'),
        fetch('/api/gallery'),
        fetch('/api/admin/students'),
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
    const records = students.filter(s => s.active).map(s => ({
      studentId: s._id,
      present: !!attendanceMap[s._id],
    }))
    await fetch('/api/admin/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: attendanceDate, records }),
    })
    setSavingAttendance(false)
  }

  const markAsRead = async (id: string, currentStatus: boolean) => {
    const res = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read: !currentStatus }),
    })
    if (res.ok) setMessages(messages.map(m => m._id === id ? { ...m, read: !currentStatus } : m))
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Delete this message?')) return
    const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
    if (res.ok) setMessages(messages.filter(m => m._id !== id))
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImageUrl) return
    setAddingImage(true)
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: newImageUrl, alt: newImageAlt || 'Gallery Image' }),
    })
    if (res.ok) {
      const newImg = await res.json()
      setImages([newImg, ...images])
      setNewImageUrl(''); setNewImageAlt('')
    }
    setAddingImage(false)
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
    if (res.ok) setImages(images.filter(img => img._id !== id))
  }

  const openAddStudent = () => {
    setEditingStudent(null)
    setStudentForm(blankStudent)
    setShowAddStudent(true)
  }

  const openEditStudent = (s: Student) => {
    setEditingStudent(s)
    setStudentForm({
      name: s.name, phone: s.phone, parentName: s.parentName,
      address: s.address, batch: s.batch, belt: s.belt,
      joinDate: s.joinDate?.split('T')[0] ?? '',
      feePaidUntil: s.feePaidUntil?.split('T')[0] ?? '',
      monthlyFee: s.monthlyFee, admissionFeePaid: s.admissionFeePaid,
      uniformFeePaid: s.uniformFeePaid, notes: s.notes, active: s.active,
    })
    setShowAddStudent(true)
  }

  const saveStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingStudent(true)
    if (editingStudent) {
      const res = await fetch('/api/admin/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingStudent._id, ...studentForm }),
      })
      if (res.ok) {
        const updated = await res.json()
        setStudents(students.map(s => s._id === updated._id ? updated : s))
      }
    } else {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentForm),
      })
      if (res.ok) {
        const created = await res.json()
        setStudents([created, ...students])
      }
    }
    setShowAddStudent(false)
    setSavingStudent(false)
  }

  const deleteStudent = async (id: string) => {
    if (!confirm('Delete this student permanently?')) return
    const res = await fetch(`/api/admin/students?id=${id}`, { method: 'DELETE' })
    if (res.ok) setStudents(students.filter(s => s._id !== id))
  }

  const feeStatus = (s: Student) => {
    const paid = new Date(s.feePaidUntil)
    const today = new Date()
    const diff = Math.ceil((paid.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, cls: 'text-red-400' }
    if (diff <= 7) return { label: `Due in ${diff}d`, cls: 'text-yellow-400' }
    return { label: `Paid till ${paid.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`, cls: 'text-green-400' }
  }

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.phone.includes(searchQuery)
  )

  const overdueCount = students.filter(s => {
    const paid = new Date(s.feePaidUntil)
    return paid < new Date() && s.active
  }).length

  const presentToday = Object.values(attendanceMap).filter(Boolean).length

  const tabs = [
    { key: 'messages', label: 'Messages', icon: MessageSquare, count: messages.filter(m => !m.read).length },
    { key: 'gallery', label: 'Gallery', icon: ImageIcon, count: images.length },
    { key: 'students', label: 'Students', icon: Users, count: students.length },
    { key: 'attendance', label: 'Attendance', icon: CalendarCheck, count: presentToday },
    { key: 'fees', label: 'Fees', icon: IndianRupee, count: overdueCount },
  ] as const

  const inputCls = 'w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none text-white placeholder-white/30'
  const labelCls = 'block text-xs font-semibold text-muted-foreground uppercase mb-1.5'

  return (
    <div className="space-y-6 md:space-y-8 max-w-[100vw] overflow-x-hidden p-1 md:p-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage students, attendance, fees and enquiries</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0 pb-2">
        <div className="flex gap-2 p-1.5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 w-max min-w-full md:min-w-0">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden group whitespace-nowrap ${
                activeTab === t.key 
                  ? 'text-primary shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {activeTab === t.key && (
                <div className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"></div>
              )}
              <t.icon className={`w-4 h-4 relative z-10 ${activeTab === t.key ? 'text-primary' : 'group-hover:text-white transition-colors'}`} />
              <span className="relative z-10">{t.label}</span>
              {t.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold relative z-10 transition-colors ${
                  activeTab === t.key ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white group-hover:bg-white/20'
                }`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : activeTab === 'messages' ? (
        /* ─── MESSAGES ─── */
        <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          {/* Mobile View: Stacked Cards */}
          <div className="block md:hidden divide-y divide-white/5">
            {messages.length === 0 ? (
              <div className="px-6 py-12 text-center text-muted-foreground">No messages yet.</div>
            ) : messages.map((msg) => (
              <div key={msg._id} className={`p-5 transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => markAsRead(msg._id!, !!msg.read)}
                      className={`p-2 rounded-full transition-colors shrink-0 ${msg.read ? 'text-green-500 bg-green-500/10' : 'text-primary bg-primary/10'}`}>
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <div>
                      <h4 className={`font-semibold text-sm ${!msg.read ? 'text-white' : 'text-white/80'}`}>{msg.name}</h4>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(msg.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteMessage(msg._id!)} className="p-2 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="bg-black/20 rounded-xl p-3 mb-3 border border-white/5">
                  <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
                
                <div className="flex gap-2">
                  <a href={`tel:${msg.phone}`} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                    Call {msg.phone}
                  </a>
                  <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-lg text-xs font-medium text-green-400 transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 w-1/2">Message</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {messages.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No messages yet.</td></tr>
                ) : messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-white/5 transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}>
                    <td className="px-6 py-4 w-16">
                      <button onClick={() => markAsRead(msg._id!, !!msg.read)}
                        className={`p-2 rounded-full transition-colors ${msg.read ? 'text-green-500 bg-green-500/10 hover:bg-green-500/20' : 'text-primary bg-primary/10 hover:bg-primary/20'}`}>
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </td>
                    <td className={`px-6 py-4 font-medium ${!msg.read ? 'text-white' : ''}`}>{msg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`tel:${msg.phone}`} className="text-white/80 hover:text-primary transition-colors hover:underline block">{msg.phone}</a>
                      <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 hover:underline mt-1 inline-block">WhatsApp</a>
                    </td>
                    <td className="px-6 py-4 max-w-xs xl:max-w-md">
                      <p className="truncate" title={msg.message}>{msg.message}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-white/60">
                      {new Date(msg.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      <br/>
                      {new Date(msg.createdAt!).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteMessage(msg._id!)} className="p-2 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : activeTab === 'gallery' ? (
        /* ─── GALLERY ─── */
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 border border-white/10 rounded-xl p-6 glass">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary"><Plus className="w-5 h-5" /> Add Image</h3>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className={labelCls}>Image URL</label>
                <input type="url" placeholder="https://..." value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className={labelCls}>Caption</label>
                <input type="text" placeholder="e.g. Belt Ceremony 2026" value={newImageAlt} onChange={e => setNewImageAlt(e.target.value)} className={inputCls} />
              </div>
              <button type="submit" disabled={addingImage || !newImageUrl} className="w-full py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50">
                {addingImage ? 'Adding...' : 'Add to Gallery'}
              </button>
            </form>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map(img => (
              <div key={img._id} className="glass rounded-xl overflow-hidden group relative border border-white/10 aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-2">
                    <a href={img.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/20 hover:bg-white/40 rounded-md text-white transition-colors"><ExternalLink className="w-4 h-4" /></a>
                    <button onClick={() => deleteImage(img._id!)} className="p-1.5 bg-destructive/60 hover:bg-destructive rounded-md text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <p className="text-xs text-white break-words line-clamp-2">{img.alt}</p>
                </div>
              </div>
            ))}
            {images.length === 0 && <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground border border-dashed border-white/20 rounded-xl">No images yet</div>}
          </div>
        </div>
      ) : activeTab === 'students' ? (
        /* ─── STUDENTS ─── */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm outline-none focus:border-primary text-white placeholder-white/30"
            />
            <button onClick={openAddStudent} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" /> Add Student
            </button>
          </div>

          {/* Add / Edit Form Modal */}
          {showAddStudent && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-2 sm:p-4 perspective-1000">
              <div className="glass w-full max-w-2xl rounded-2xl p-4 sm:p-8 border border-white/10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-transparent backdrop-blur-xl z-10 py-2 -mt-2 -mx-2 px-2 rounded-t-xl">
                  <h3 className="text-xl font-bold text-white tracking-tight">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                  <button onClick={() => setShowAddStudent(false)} className="p-2 hover:bg-white/10 bg-white/5 rounded-xl text-muted-foreground hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={saveStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Student Name *</label>
                    <input required type="text" placeholder="Full name" value={studentForm.name} onChange={e => setStudentForm({ ...studentForm, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone *</label>
                    <input required type="tel" placeholder="Mobile number" value={studentForm.phone} onChange={e => setStudentForm({ ...studentForm, phone: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Parent / Guardian</label>
                    <input type="text" placeholder="Parent name" value={studentForm.parentName} onChange={e => setStudentForm({ ...studentForm, parentName: e.target.value })} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Address</label>
                    <input type="text" placeholder="Home address" value={studentForm.address} onChange={e => setStudentForm({ ...studentForm, address: e.target.value })} className={inputCls} />
                  </div>
                  
                  <div className="h-px bg-white/10 sm:col-span-2 my-2" />
                  
                  <div>
                    <label className={labelCls}>Batch</label>
                    <select value={studentForm.batch} onChange={e => setStudentForm({ ...studentForm, batch: e.target.value as Batch })} className={inputCls}>
                      {Object.entries(BATCH_LABELS).map(([k, v]) => <option key={k} value={k} className="bg-zinc-900">{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Belt</label>
                    <select value={studentForm.belt} onChange={e => setStudentForm({ ...studentForm, belt: e.target.value as Belt })} className={inputCls}>
                      {Object.keys(BELT_COLORS).map(b => <option key={b} value={b} className="bg-zinc-900">{b.charAt(0).toUpperCase() + b.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Join Date</label>
                    <input type="date" value={studentForm.joinDate} onChange={e => setStudentForm({ ...studentForm, joinDate: e.target.value })} className={inputCls} />
                  </div>
                  
                  <div className="h-px bg-white/10 sm:col-span-2 my-2" />
                  
                  <div>
                    <label className={labelCls}>Fee Paid Until</label>
                    <input type="date" value={studentForm.feePaidUntil} onChange={e => setStudentForm({ ...studentForm, feePaidUntil: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Monthly Fee (₹)</label>
                    <input type="number" value={studentForm.monthlyFee} onChange={e => setStudentForm({ ...studentForm, monthlyFee: Number(e.target.value) })} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <label className="flex items-center gap-3 text-sm text-white font-medium cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" checked={studentForm.admissionFeePaid} onChange={e => setStudentForm({ ...studentForm, admissionFeePaid: e.target.checked })} className="peer sr-only w-5 h-5" />
                        <div className="w-5 h-5 border-2 border-white/30 rounded md flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-colors">
                           <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                        </div>
                      </div>
                      Admission Paid
                    </label>
                    <label className="flex items-center gap-3 text-sm text-white font-medium cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" checked={studentForm.uniformFeePaid} onChange={e => setStudentForm({ ...studentForm, uniformFeePaid: e.target.checked })} className="peer sr-only w-5 h-5" />
                        <div className="w-5 h-5 border-2 border-white/30 rounded md flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-colors">
                           <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
                        </div>
                      </div>
                      Uniform Paid
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Notes</label>
                    <textarea placeholder="Any administrative remarks..." value={studentForm.notes} onChange={e => setStudentForm({ ...studentForm, notes: e.target.value })} className={`${inputCls} resize-none h-24`} />
                  </div>
                  <div className="sm:col-span-2 flex flex-col-reverse sm:flex-row gap-3 justify-end pt-4 mt-2 border-t border-white/10">
                    <button type="button" onClick={() => setShowAddStudent(false)} className="w-full sm:w-auto px-6 py-3 border border-white/10 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white transition-colors">Cancel</button>
                    <button type="submit" disabled={savingStudent} className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-lg shadow-primary/20">
                      {savingStudent ? 'Saving...' : editingStudent ? 'Update Student' : 'Save Student'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Student Table / Cards */}
          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            {/* Mobile View: Stacked Cards */}
            <div className="block md:hidden divide-y divide-white/5">
              {filteredStudents.length === 0 ? (
                <div className="px-5 py-12 text-center text-muted-foreground">No students found.</div>
              ) : filteredStudents.map(s => {
                const status = feeStatus(s)
                return (
                  <div key={s._id} className={`p-5 space-y-4 transition-colors ${!s.active ? 'opacity-50' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white/90 text-lg">{s.name}</h4>
                        {s.parentName && <p className="text-sm text-muted-foreground mt-0.5">P: {s.parentName}</p>}
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openEditStudent(s)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white bg-white/5">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteStudent(s._id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive bg-destructive/5">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Contact</p>
                        <a href={`tel:${s.phone}`} className="text-sm text-white hover:text-primary transition-colors">{s.phone}</a>
                      </div>
                      <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Fee Status</p>
                        <span className={`text-sm font-medium ${status.cls}`}>{status.label}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                       <span className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-medium border border-white/10">Batch: {BATCH_LABELS[s.batch]}</span>
                       <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize ${BELT_COLORS[s.belt]}`}>{s.belt} Belt</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-muted-foreground">
                <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Batch</th>
                    <th className="px-6 py-4">Belt</th>
                    <th className="px-6 py-4">Fee Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredStudents.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No students found.</td></tr>
                  ) : filteredStudents.map(s => {
                    const status = feeStatus(s)
                    return (
                      <tr key={s._id} className={`hover:bg-white/5 transition-colors ${!s.active ? 'opacity-50' : ''}`}>
                        <td className="px-6 py-4 font-medium text-white">
                          <div className="flex flex-col">
                            <span>{s.name}</span>
                            {s.parentName && <span className="text-xs text-muted-foreground font-normal mt-0.5">{s.parentName}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`tel:${s.phone}`} className="text-white/80 hover:text-primary transition-colors hover:underline">{s.phone}</a>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-white/5 rounded-md text-xs border border-white/10 font-medium">{BATCH_LABELS[s.batch]}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs border font-medium capitalize flex inline-flex items-center gap-1.5 ${BELT_COLORS[s.belt]}`}>
                            <span className="w-2 h-2 rounded-full bg-current opacity-70"></span>
                            {s.belt}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                          <span className={`px-2.5 py-1 rounded-md bg-white/5 font-medium border border-transparent ${status.cls.replace('text-', 'text-').replace('400', '400')}`}>{status.label}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity md:opacity-100">
                            <button onClick={() => openEditStudent(s)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteStudent(s._id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive/70 hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : activeTab === 'attendance' ? (
        /* ─── ATTENDANCE ─── */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div>
              <label className={labelCls}>Select Date</label>
              <input type="date" value={attendanceDate} onChange={e => setAttendanceDate(e.target.value)}
                className="px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-primary" />
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-sm text-muted-foreground">
                Present: <span className="text-green-400 font-semibold">{Object.values(attendanceMap).filter(Boolean).length}</span>
                {' / '}
                <span className="text-white font-semibold">{students.filter(s => s.active).length}</span>
              </span>
              <button onClick={saveAttendance} disabled={savingAttendance} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                <Check className="w-4 h-4" />
                {savingAttendance ? 'Saving...' : 'Save Attendance'}
              </button>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            {/* Mobile View: List */}
            <div className="block md:hidden divide-y divide-white/5">
                {students.filter(s => s.active).map(s => (
                  <div key={s._id} className={`p-4 flex items-center justify-between transition-colors ${attendanceMap[s._id] ? 'bg-green-500/5' : 'hover:bg-white/5'}`}>
                    <div>
                      <h4 className="font-semibold text-white/90">{s.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border capitalize ${BELT_COLORS[s.belt]}`}>{s.belt}</span>
                        <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded border border-white/5">{BATCH_LABELS[s.batch]}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setAttendanceMap(prev => ({ ...prev, [s._id]: !prev[s._id] }))}
                      className={`w-12 h-7 rounded-full transition-colors relative shadow-inner ${attendanceMap[s._id] ? 'bg-green-500' : 'bg-black/40 border border-white/10'}`}
                    >
                      <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${attendanceMap[s._id] ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
                {students.filter(s => s.active).length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">No active students. Add students first.</div>
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-muted-foreground">
                <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Belt</th>
                    <th className="px-6 py-4">Batch</th>
                    <th className="px-6 py-4 text-center">Present</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {students.filter(s => s.active).map(s => (
                    <tr key={s._id} className={`transition-colors ${attendanceMap[s._id] ? 'bg-green-500/5' : 'hover:bg-white/5'}`}>
                      <td className="px-6 py-4 font-medium text-white">{s.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs border capitalize font-medium ${BELT_COLORS[s.belt]}`}>{s.belt}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium">{BATCH_LABELS[s.batch]}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setAttendanceMap(prev => ({ ...prev, [s._id]: !prev[s._id] }))}
                          className={`w-11 h-6 rounded-full transition-colors relative shadow-inner ${attendanceMap[s._id] ? 'bg-green-500' : 'bg-black/40 border border-white/10'}`}
                        >
                          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${attendanceMap[s._id] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {students.filter(s => s.active).length === 0 && (
                    <tr><td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">No active students. Add students first.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ─── FEES ─── */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl"><Users className="w-6 h-6 text-white/80" /></div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Total Students</p>
                  <p className="text-3xl font-black text-white">{students.length}</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-red-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-red-500/20 transition-colors"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl"><IndianRupee className="w-6 h-6 text-red-400" /></div>
                <div>
                  <p className="text-xs text-red-400 uppercase tracking-wider font-semibold mb-1">Fee Overdue</p>
                  <p className="text-3xl font-black text-red-400">{overdueCount}</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-green-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-colors"></div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl"><CheckCircle className="w-6 h-6 text-green-400" /></div>
                <div>
                  <p className="text-xs text-green-400 uppercase tracking-wider font-semibold mb-1">Fee Up-to-date</p>
                  <p className="text-3xl font-black text-green-400">{students.filter(s => new Date(s.feePaidUntil) >= new Date()).length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            {/* Mobile View: Cards */}
            <div className="block md:hidden divide-y divide-white/5">
                {[...students].sort((a, b) => new Date(a.feePaidUntil).getTime() - new Date(b.feePaidUntil).getTime()).map(s => {
                  const status = feeStatus(s)
                  return (
                    <div key={s._id} className="p-5 space-y-4 hover:bg-white/5 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-white/90 text-lg">{s.name}</h4>
                          <a href={`tel:${s.phone}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{s.phone}</a>
                        </div>
                        <span className={`px-3 py-1.5 rounded-lg bg-white/5 text-xs font-semibold border ${status.cls.replace('text-', 'border-').replace('400', '400/30')} ${status.cls}`}>
                          {status.label}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Monthly</p>
                          <p className="text-sm font-medium text-white">₹{s.monthlyFee}</p>
                        </div>
                        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Admission</p>
                          <span className={`text-xs font-semibold ${s.admissionFeePaid ? 'text-green-400' : 'text-red-400'}`}>
                            {s.admissionFeePaid ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                        <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 text-center">
                          <p className="text-[10px] text-muted-foreground uppercase mb-1">Uniform</p>
                          <span className={`text-xs font-semibold ${s.uniformFeePaid ? 'text-green-400' : 'text-red-400'}`}>
                            {s.uniformFeePaid ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground text-center">
                        Paid Until: <span className="font-medium text-white/80">{new Date(s.feePaidUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                  )
                })}
                {students.length === 0 && (
                  <div className="px-5 py-12 text-center text-muted-foreground">No students added yet.</div>
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-muted-foreground">
                <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Monthly Fee</th>
                    <th className="px-6 py-4 text-center">Admission</th>
                    <th className="px-6 py-4 text-center">Uniform</th>
                    <th className="px-6 py-4">Valid Until</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[...students].sort((a, b) => new Date(a.feePaidUntil).getTime() - new Date(b.feePaidUntil).getTime()).map(s => {
                    const status = feeStatus(s)
                    return (
                      <tr key={s._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">
                          <div>{s.name}</div>
                          <a href={`tel:${s.phone}`} className="text-xs text-muted-foreground font-normal hover:text-primary">{s.phone}</a>
                        </td>
                        <td className="px-6 py-4 font-semibold">₹{s.monthlyFee}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium ${s.admissionFeePaid ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {s.admissionFeePaid ? '✓ Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium ${s.uniformFeePaid ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                            {s.uniformFeePaid ? '✓ Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-white/80 font-medium">
                          {new Date(s.feePaidUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md bg-white/5 text-xs font-semibold ${status.cls}`}>{status.label}</span>
                        </td>
                      </tr>
                    )
                  })}
                  {students.length === 0 && (
                    <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No students added yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
