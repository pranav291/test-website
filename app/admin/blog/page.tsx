'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    published: false
  })

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog?all=1')
      const data = await res.json()
      setPosts(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }
    
    const url = editingId ? `/api/blog/${editingId}` : '/api/blog'
    const method = editingId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      setIsEditing(false)
      setEditingId(null)
      fetchPosts()
      setFormData({ title: '', slug: '', excerpt: '', content: '', tags: '', published: false })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    fetchPosts()
  }
  
  const handleEdit = (post: any) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      tags: post.tags ? post.tags.join(', ') : '',
      published: post.published || false
    })
    setEditingId(post._id)
    setIsEditing(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-white/50 mt-1">Manage markdown blog posts</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({ title: '', slug: '', excerpt: '', content: '', tags: '', published: false })
            setIsEditing(true)
          }}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </div>

      {isEditing ? (
        <div className="bg-[#161616] rounded-xl border border-white/8 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{editingId ? 'Edit Post' : 'New Post'}</h2>
            <button onClick={() => setIsEditing(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Slug</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Excerpt</label>
              <textarea rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">Markdown Content</label>
              <textarea required rows={12} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500 font-mono text-sm"></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Tags (comma-separated)</label>
                <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-orange-500" />
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} className="w-4 h-4 text-orange-500 bg-[#0a0a0a] border-white/10 rounded focus:ring-0" />
                  <span className="text-sm font-medium">Published</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Save Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-[#161616] rounded-xl border border-white/8 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-white/50">Loading...</div>
          ) : posts.length === 0 ? (
             <div className="p-8 text-center text-white/50">No blog posts found. Create your first post!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-white/70">
                <thead className="bg-[#1a1a1a] text-xs uppercase text-white/50">
                  <tr>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{post.title}</td>
                      <td className="px-4 py-3">
                        {post.published ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <Eye className="w-3.5 h-3.5" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-white/50 border border-white/10">
                            <EyeOff className="w-3.5 h-3.5" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/50">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(post)} className="p-1.5 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(post._id)} className="p-1.5 rounded-lg text-white/50 hover:bg-white/10 hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
