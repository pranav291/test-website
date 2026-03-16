'use client'

import { useState, useEffect } from 'react'
import { X, ExternalLink, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface Ann { _id: string; title?: string; text: string; linkUrl?: string; type: 'info' | 'warning' | 'success'; active: boolean; expiresAt: string | null }

const typeStyles = {
  info: 'from-blue-600/20 to-blue-900/40 border-blue-500/30 text-blue-100 ring-blue-500/20',
  warning: 'from-orange-600/20 to-orange-900/40 border-orange-500/30 text-orange-100 ring-orange-500/20',
  success: 'from-emerald-600/20 to-emerald-900/40 border-emerald-500/30 text-emerald-100 ring-emerald-500/20',
}

const iconColors = {
  info: 'text-blue-400',
  warning: 'text-orange-400',
  success: 'text-emerald-400',
}

const typeIcons = { 
  info: Info, 
  warning: AlertTriangle, 
  success: CheckCircle2 
}

export default function AnnouncementBanner() {
  const [ann, setAnn] = useState<Ann | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    fetch('/api/announcements', { cache: 'no-store' })
      .then(r => r.json())
      .then((data: Ann[]) => {
        const now = new Date()
        const active = Array.isArray(data) ? data.find(a => a.active && (!a.expiresAt || new Date(a.expiresAt) > now)) : null
        if (active) setAnn(active)
      })
      .catch(() => {})
  }, [])

  if (!ann || dismissed) return null

  const Icon = typeIcons[ann.type]

  return (
    <div className={`relative z-[100] w-full border-b bg-gradient-to-r backdrop-blur-md shadow-lg ${typeStyles[ann.type]}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center flex-1 gap-3 min-w-0">
            <span className={`flex p-1.5 rounded-lg bg-white/5 ${iconColors[ann.type]}`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
              {ann.title && <strong className="font-semibold text-white whitespace-nowrap">{ann.title}</strong>}
              <span className="text-sm opacity-90 truncate">{ann.text}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
            {ann.linkUrl && (
              <a 
                href={ann.linkUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-white text-black hover:bg-white/90 rounded-full transition-all focus:outline-none focus:ring-2 ring-offset-2 ring-offset-[#0a0a0a] ${typeStyles[ann.type].split(' ').pop()}`}
              >
                Learn More <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button 
              onClick={() => setDismissed(true)} 
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
