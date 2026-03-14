'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { HiMenuAlt3, HiX, HiTranslate } from 'react-icons/hi'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: getTranslation('nav.home', language), href: '#home' },
    { name: getTranslation('nav.about', language), href: '#about' },
    { name: getTranslation('nav.programs', language), href: '#programs' },
    { name: getTranslation('nav.gallery', language), href: '#gallery' },
    { name: getTranslation('nav.contact', language), href: '#contact' },
  ]

  const toggleLanguage = () => {
    const next: Record<string, 'en' | 'hi' | 'mai'> = { en: 'hi', hi: 'mai', mai: 'en' }
    setLanguage(next[language])
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-white/5 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-white/10 group-hover:border-primary/50 transition-colors">
                <Image src="/images/logo.png" alt="DTA Logo" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                  Darbhanga
                </span>
                <span className="text-[9px] md:text-xs text-muted-foreground uppercase tracking-widest -mt-1">
                  Taekwondo
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground relative group py-2 transition-colors"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              ))}
              
              <div className="h-4 w-px bg-white/10 mx-2" />
              
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-primary/50 hover:bg-white/5 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <HiTranslate className="text-primary text-base" />
                {language}
              </button>
              
              <a
                href="#contact"
                className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 btn-3d"
              >
                {getTranslation('hero.joinBtn', language)}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 text-foreground/80 text-[10px] font-bold uppercase border border-white/10 rounded-lg bg-white/5 active:bg-white/10"
              >
                {language}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2 -mr-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden pt-24 pb-8 px-6 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center space-y-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.4 }}
              className="mt-auto"
            >
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-4 text-center bg-primary text-white rounded-xl font-bold tracking-wide shadow-lg shadow-primary/20 btn-3d"
              >
                {getTranslation('hero.joinBtn', language)}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
