'use client'

export function DTALogo({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" stroke="url(#borderGrad)" strokeWidth="3" />
      
      {/* Inner ring */}
      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      
      {/* Taekwondo Kick Silhouette */}
      <g transform="translate(30, 18) scale(0.5)">
        {/* Standing leg */}
        <path
          d="M58 170 L55 140 L50 115 L48 100"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Kicking leg - high roundhouse */}
        <path
          d="M55 140 L70 125 L95 105 L115 90"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Body/torso */}
        <path
          d="M48 100 L52 75 L55 55"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Head */}
        <circle cx="55" cy="45" r="12" fill="white" />
        {/* Arms - guard position */}
        <path
          d="M52 75 L35 65 L25 55"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M52 75 L40 80 L30 75"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      
      {/* DTA Text */}
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="4"
      >
        DTA
      </text>
      
      {/* Accent line under text */}
      <rect x="35" y="105" width="50" height="2" rx="1" fill="url(#accentGrad)" />
      
      {/* Decorative dots */}
      <circle cx="30" cy="107" r="2" fill="hsl(0, 85%, 55%)" opacity="0.6" />
      <circle cx="90" cy="107" r="2" fill="hsl(0, 85%, 55%)" opacity="0.6" />
      
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="hsl(0, 75%, 45%)" />
          <stop offset="100%" stopColor="hsl(0, 85%, 30%)" />
        </linearGradient>
        <linearGradient id="borderGrad" x1="0" y1="0" x2="120" y2="120">
          <stop offset="0%" stopColor="hsl(0, 85%, 60%)" />
          <stop offset="100%" stopColor="hsl(0, 75%, 40%)" />
        </linearGradient>
        <linearGradient id="accentGrad" x1="35" y1="0" x2="85" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="hsl(0, 85%, 55%)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  )
}
