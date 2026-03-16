'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Ann { _id: string; text: string; type: 'info' | 'warning' | 'success' }

const typeStyles = {
  info: 'bg-blue-900/80 border-blue-500/30 text-blue-100',
  warning: 'bg-yellow-900/80 border-yellow-500/30 text-yellow-100',
  success: 'bg-green-900/80 border-green-500/30 text-green-100',
}
const typeIcons = { info: 'ℹ️', warning: '⚠️', success: '✅' }

export default function AnnouncementBanner() {
  const [ann, setAnn] = useState<Ann | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/announcements')
      .then(r => r.json())
      .then((data: Ann[]) => {
        if (data && data.length > 0) setAnn(data[0])
      })
      .catch(() => {})
  }, [])

  if (!ann || dismissed) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] border-b px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-medium ${typeStyles[ann.type]}`}>
      <span>{typeIcons[ann.type]}</span>
      <span className="flex-1 text-center">{ann.text}</span>
      <button onClick={() => setDismissed(true)} className="shrink-0 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
