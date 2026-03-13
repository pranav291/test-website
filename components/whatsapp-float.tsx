'use client'

import { useState, useEffect } from 'react'

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <a
      href="https://wa.me/918226856261?text=Hi%2C%20I%20want%20to%20know%20about%20Darbhanga%20Taekwondo%20Academy"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float animate-whatsapp-pulse group"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      {/* WhatsApp Icon SVG */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="w-7 h-7 md:w-8 md:h-8"
      >
        <path
          d="M16.004 2.667A13.29 13.29 0 002.667 15.92a13.16 13.16 0 001.937 6.88L2.667 29.333l6.747-1.893A13.3 13.3 0 0016.004 29.28 13.293 13.293 0 0029.333 15.92 13.293 13.293 0 0016.004 2.667zm0 24.32a11.01 11.01 0 01-5.613-1.533l-.4-.24-4.16 1.173 1.12-4.08-.267-.427a10.91 10.91 0 01-1.707-5.96A11.04 11.04 0 0116.004 4.96 11.04 11.04 0 0127.04 15.92 11.04 11.04 0 0116.004 26.987zm6.027-8.24c-.333-.173-1.947--.96-2.253-1.067-.307-.107-.533-.16-.747.173-.213.333-.84 1.067-1.04 1.28-.187.213-.387.24-.72.08-.333-.173-1.413-.52-2.693-1.667-.987-.893-1.667-1.987-1.853-2.32-.187-.333-.02-.52.147-.68.147-.147.333-.387.493-.573.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.747-1.8-1.027-2.467-.267-.653-.54-.56-.747-.573h-.64c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.527 1.827.68.773.24 1.467.207 2.027.12.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"
          fill="white"
        />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 text-xs font-semibold px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white" />
      </span>
    </a>
  )
}
