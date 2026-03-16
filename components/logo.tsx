'use client'

import Image from 'next/image'

export function DTALogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/images/dta-logo-new.png"
        alt="Darbhanga Taekwondo Academy Logo"
        fill
        className="object-contain"
        sizes={`${size}px`}
      />
    </div>
  )
}
