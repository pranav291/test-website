'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 z-[100]"
        >
          <a
            href="https://wa.me/918226856261?text=Hi%2C%20I%20want%20to%20know%20about%20Darbhanga%20Taekwondo%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full whatsapp-float btn-3d"
            aria-label="Chat on WhatsApp"
          >
            {/* Ripple Effects */}
            <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />
            <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 animation-delay-500" />
            
            <FaWhatsapp className="w-8 h-8 md:w-9 md:h-9 relative z-10 drop-shadow-md" />

            {/* Hover Tooltip Minimal */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
              Quick Chat
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
