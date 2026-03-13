'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useState } from 'react'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive font-medium border border-transparent hover:border-destructive/20 transition-all text-sm mt-auto"
    >
      <LogOut className="w-5 h-5" />
      {loading ? 'Logging out...' : 'Sign Out'}
    </button>
  )
}
