'use client'

export function DTALogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" /> {/* Purple-500 */}
          <stop offset="100%" stopColor="#7e22ce" /> {/* Purple-700 */}
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e9d5ff" /> {/* Purple-200 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Ring */}
      <circle cx="100" cy="100" r="95" stroke="url(#primaryGradient)" strokeWidth="4" className="animate-spin-slow" style={{ animationDuration: '20s' }} />
      <circle cx="100" cy="100" r="85" stroke="url(#primaryGradient)" strokeWidth="1" strokeDasharray="5 5" opacity="0.5" className="animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

      {/* Center Shield/Badge Shape */}
      <path d="M100 20 L170 45 L160 140 C140 170 100 185 100 185 C100 185 60 170 40 140 L30 45 Z" fill="rgba(168, 85, 247, 0.1)" stroke="url(#primaryGradient)" strokeWidth="2" />
      
      {/* Text DTA */}
      <text x="100" y="115" fill="url(#textGradient)" fontSize="48" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="4" filter="url(#glow)">DTA</text>
      
      {/* Dynamic Accents */}
      <circle cx="100" cy="20" r="4" fill="#d8b4fe" /> {/* Purple-300 */}
      <circle cx="30" cy="45" r="3" fill="#d8b4fe" />
      <circle cx="170" cy="45" r="3" fill="#d8b4fe" />
      <circle cx="100" cy="185" r="4" fill="#d8b4fe" />
    </svg>
  )
}
