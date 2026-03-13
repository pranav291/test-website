'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/app/language-context'
import { getTranslation, Language } from '@/lib/translations'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: getTranslation('nav.home', language), href: '#home' },
    { label: getTranslation('nav.about', language), href: '#about' },
    { label: getTranslation('nav.programs', language), href: '#programs' },
    { label: getTranslation('nav.fees', language), href: '#fees' },
    { label: getTranslation('nav.gallery', language), href: '#gallery' },
    { label: getTranslation('nav.coach', language), href: '#coach' },
    { label: getTranslation('nav.contact', language), href: '#contact' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-dark shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-colors">
              <Image
                src="/images/logo.png"
                alt="DTA Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg md:text-xl font-bold gradient-text">DTA</span>
              <span className="block text-[10px] md:text-xs text-muted-foreground -mt-1">
                Darbhanga Taekwondo
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-white/5 text-foreground border border-white/10 rounded-lg px-2 py-1.5 text-xs md:text-sm cursor-pointer hover:border-primary/50 transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="en" className="bg-background text-foreground">English</option>
              <option value="hi" className="bg-background text-foreground">हिंदी</option>
              <option value="mai" className="bg-background text-foreground">मैथिली</option>
            </select>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={22} className="text-primary" />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass rounded-xl mb-4 p-4 animate-slideDown">
            <div className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-white/5 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
