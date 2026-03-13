'use client'

import { useState, useEffect } from 'react'
import { Trash2, CheckCircle, Image as ImageIcon, MessageSquare, Plus, ExternalLink } from 'lucide-react'
import { IMessage } from '@/lib/models/Message'
import { IGalleryImage } from '@/lib/models/GalleryImage'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'messages' | 'gallery'>('messages')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [images, setImages] = useState<IGalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  // New Image Form
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newImageAlt, setNewImageAlt] = useState('')
  const [addingImage, setAddingImage] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [msgRes, imgRes] = await Promise.all([
        fetch('/api/admin/messages'),
        fetch('/api/gallery')
      ])
      
      if (msgRes.ok) setMessages(await msgRes.json())
      if (imgRes.ok) setImages(await imgRes.json())
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: !currentStatus }),
      })
      if (res.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, read: !currentStatus } : m))
      }
    } catch (error) {
      console.error('Failed to update message', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setMessages(messages.filter(m => m._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete message', error)
    }
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newImageUrl) return
    setAddingImage(true)
    
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newImageUrl, alt: newImageAlt || 'Gallery Image' }),
      })
      
      if (res.ok) {
        const newImg = await res.json()
        setImages([newImg, ...images])
        setNewImageUrl('')
        setNewImageAlt('')
      }
    } catch (error) {
      console.error('Failed to add image', error)
    } finally {
      setAddingImage(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        setImages(images.filter(img => img._id !== id))
      }
    } catch (error) {
      console.error('Failed to delete image', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm">Manage messages and gallery images</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 glass rounded-xl inline-flex">
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'messages'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Messages
          <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs">
            {messages.filter(m => !m.read).length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'gallery'
              ? 'bg-primary text-white shadow-lg shadow-primary/20'
              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Gallery
          <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs">
            {images.length}
          </span>
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : activeTab === 'messages' ? (
        /* Messages Table */
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
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No messages relative to your filter found.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg._id} className={`hover:bg-white/5 transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => markAsRead(msg._id!, !!msg.read)}
                          className={`p-1.5 rounded-full transition-colors ${
                            msg.read ? 'text-green-500 bg-green-500/10' : 'text-primary bg-primary/10'
                          }`}
                          title={msg.read ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </td>
                      <td className={`px-6 py-4 font-medium ${!msg.read ? 'text-foreground' : ''}`}>
                        {msg.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors hover:underline">
                          {msg.phone}
                        </a>
                        <br />
                        <a href={`https://wa.me/${msg.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-green-500 hover:underline">
                          WhatsApp
                        </a>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate" title={msg.message}>
                        {msg.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs">
                        {new Date(msg.createdAt!).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteMessage(msg._id!)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Gallery Management */
        <div className="grid md:grid-cols-3 gap-6">
          {/* Add Form */}
          <div className="md:col-span-1 border border-white/10 rounded-xl p-6 glass">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-primary">
              <Plus className="w-5 h-5" /> Add New Image
            </h3>
            <form onSubmit={handleAddImage} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-2">
                  Alt Text (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Belt Promotion 2026"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-sm outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={addingImage || !newImageUrl}
                className="w-full py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {addingImage ? 'Adding...' : 'Add to Gallery'}
              </button>
            </form>
          </div>

          {/* Image Grid */}
          <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img._id} className="glass rounded-xl overflow-hidden group relative border border-white/10 aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <div className="flex justify-end gap-2">
                    <a
                      href={img.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-white/20 hover:bg-white/40 rounded-md backdrop-blur-sm text-white transition-colors"
                      title="Open external"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => deleteImage(img._id!)}
                      className="p-1.5 bg-destructive/60 hover:bg-destructive rounded-md backdrop-blur-sm text-white transition-colors"
                      title="Delete image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-white break-words line-clamp-2">
                    {img.alt}
                  </p>
                </div>
              </div>
            ))}
            {images.length === 0 && (
              <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground border border-dashed border-white/20 rounded-xl">
                No images added yet
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
