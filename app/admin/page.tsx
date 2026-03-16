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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Manage students, attendance, fees and enquiries</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 glass rounded-xl">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key ? 'bg-primary text-white' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            {t.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === t.key ? 'bg-white/20' : 'bg-primary/20 text-primary'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : activeTab === 'messages' ? (
        /* ─── MESSAGES ─── */
        <div className="glass rounded-xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {messages.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No messages yet.</td></tr>
                ) : messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-white/5 transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => markAsRead(msg._id!, !!msg.read)}
                        className={`p-1.5 rounded-full transition-colors ${msg.read ? 'text-green-500 bg-green-500/10' : 'text-primary bg-primary/10'}`}>
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </td>
                    <td className={`px-6 py-4 font-medium ${!msg.read ? 'text-foreground' : ''}`}>{msg.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors hover:underline">{msg.phone}</a>
                      <br />
                      <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-500 hover:underline">WhatsApp</a>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {new Date(msg.createdAt!).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteMessage(msg._id!)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
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
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass w-full max-w-2xl rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
                  <button onClick={() => setShowAddStudent(false)} className="p-1.5 hover:bg-white/10 rounded-lg text-muted-foreground"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={saveStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div>
                    <label className={labelCls}>Batch</label>
                    <select value={studentForm.batch} onChange={e => setStudentForm({ ...studentForm, batch: e.target.value as Batch })} className={inputCls}>
                      {Object.entries(BATCH_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Belt</label>
                    <select value={studentForm.belt} onChange={e => setStudentForm({ ...studentForm, belt: e.target.value as Belt })} className={inputCls}>
                      {Object.keys(BELT_COLORS).map(b => <option key={b} value={b}>{b.charAt(0).toUpperCase() + b.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Join Date</label>
                    <input type="date" value={studentForm.joinDate} onChange={e => setStudentForm({ ...studentForm, joinDate: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Fee Paid Until</label>
                    <input type="date" value={studentForm.feePaidUntil} onChange={e => setStudentForm({ ...studentForm, feePaidUntil: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Monthly Fee (₹)</label>
                    <input type="number" value={studentForm.monthlyFee} onChange={e => setStudentForm({ ...studentForm, monthlyFee: Number(e.target.value) })} className={inputCls} />
                  </div>
                  <div className="flex gap-4 items-center pt-5">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="checkbox" checked={studentForm.admissionFeePaid} onChange={e => setStudentForm({ ...studentForm, admissionFeePaid: e.target.checked })} className="accent-primary w-4 h-4" />
                      Admission Paid
                    </label>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                      <input type="checkbox" checked={studentForm.uniformFeePaid} onChange={e => setStudentForm({ ...studentForm, uniformFeePaid: e.target.checked })} className="accent-primary w-4 h-4" />
                      Uniform Paid
                    </label>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Notes</label>
                    <textarea placeholder="Any remarks..." value={studentForm.notes} onChange={e => setStudentForm({ ...studentForm, notes: e.target.value })} className={`${inputCls} resize-none h-20`} />
                  </div>
                  <div className="sm:col-span-2 flex gap-3 justify-end">
                    <button type="button" onClick={() => setShowAddStudent(false)} className="px-5 py-2.5 border border-white/10 rounded-xl text-sm text-muted-foreground hover:bg-white/5 transition-colors">Cancel</button>
                    <button type="submit" disabled={savingStudent} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50">
                      {savingStudent ? 'Saving...' : editingStudent ? 'Update Student' : 'Add Student'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Student Table */}
          <div className="glass rounded-xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-muted-foreground">
                <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Batch</th>
                    <th className="px-5 py-4">Belt</th>
                    <th className="px-5 py-4">Fee Status</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredStudents.length === 0 ? (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">No students found.</td></tr>
                  ) : filteredStudents.map(s => (
                    <tr key={s._id} className={`hover:bg-white/5 transition-colors ${!s.active ? 'opacity-50' : ''}`}>
                      <td className="px-5 py-4 font-medium text-white">
                        {s.name}
                        {s.parentName && <span className="block text-xs text-muted-foreground">{s.parentName}</span>}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <a href={`tel:${s.phone}`} className="hover:text-primary hover:underline">{s.phone}</a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 bg-white/5 rounded-md text-xs border border-white/10">{BATCH_LABELS[s.batch]}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-md text-xs border capitalize ${BELT_COLORS[s.belt]}`}>{s.belt}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        <span className={feeStatus(s).cls}>{feeStatus(s).label}</span>
                      </td>
                      <td className="px-5 py-4 text-right flex gap-1 justify-end">
                        <button onClick={() => openEditStudent(s)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-white">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteStudent(s._id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
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

          <div className="glass rounded-xl overflow-hidden border border-white/10">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs">
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
                      <span className={`px-2 py-1 rounded-md text-xs border capitalize ${BELT_COLORS[s.belt]}`}>{s.belt}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs">{BATCH_LABELS[s.batch]}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setAttendanceMap(prev => ({ ...prev, [s._id]: !prev[s._id] }))}
                        className={`w-10 h-6 rounded-full transition-colors relative ${attendanceMap[s._id] ? 'bg-green-500' : 'bg-white/10'}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${attendanceMap[s._id] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                      </button>
                    </td>
                  </tr>
                ))}
                {students.filter(s => s.active).length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">No active students. Add students first.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ─── FEES ─── */
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-5 border border-white/10">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Total Students</p>
              <p className="text-3xl font-black text-white">{students.length}</p>
            </div>
            <div className="glass rounded-xl p-5 border border-red-500/20">
              <p className="text-xs text-red-400 uppercase font-semibold mb-1">Fee Overdue</p>
              <p className="text-3xl font-black text-red-400">{overdueCount}</p>
            </div>
            <div className="glass rounded-xl p-5 border border-green-500/20">
              <p className="text-xs text-green-400 uppercase font-semibold mb-1">Fee Up-to-date</p>
              <p className="text-3xl font-black text-green-400">{students.filter(s => new Date(s.feePaidUntil) >= new Date()).length}</p>
            </div>
          </div>

          <div className="glass rounded-xl overflow-hidden border border-white/10">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-white/5 text-foreground font-semibold uppercase text-xs">
                <tr>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Monthly Fee</th>
                  <th className="px-5 py-4">Admission</th>
                  <th className="px-5 py-4">Uniform</th>
                  <th className="px-5 py-4">Fee Paid Until</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[...students].sort((a, b) => new Date(a.feePaidUntil).getTime() - new Date(b.feePaidUntil).getTime()).map(s => {
                  const status = feeStatus(s)
                  return (
                    <tr key={s._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-medium text-white">{s.name}</td>
                      <td className="px-5 py-4">
                        <a href={`tel:${s.phone}`} className="hover:text-primary hover:underline">{s.phone}</a>
                      </td>
                      <td className="px-5 py-4">₹{s.monthlyFee}</td>
                      <td className="px-5 py-4">
                        <span className={s.admissionFeePaid ? 'text-green-400' : 'text-red-400'}>{s.admissionFeePaid ? '✓ Paid' : '✗ Pending'}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={s.uniformFeePaid ? 'text-green-400' : 'text-red-400'}>{s.uniformFeePaid ? '✓ Paid' : '✗ Pending'}</span>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-xs">
                        {new Date(s.feePaidUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-semibold ${status.cls}`}>{status.label}</span>
                      </td>
                    </tr>
                  )
                })}
                {students.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-muted-foreground">No students added yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
