'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { DTALogo } from '@/components/logo'
import { FaInstagram, FaPhoneAlt, FaHeart, FaArrowUp, FaClock, FaCode } from 'react-icons/fa'

export function Footer() {
  const { language } = useLanguage()

  const quickLinks = [
    { label: getTranslation('nav.home', language), href: '#home' },
    { label: getTranslation('nav.about', language), href: '#about' },
    { label: getTranslation('nav.programs', language), href: '#programs' },
    { label: getTranslation('nav.fees', language), href: '#fees' },
    { label: getTranslation('nav.gallery', language), href: '#gallery' },
    { label: getTranslation('nav.coach', language), href: '#coach' },
    { label: 'FAQ', href: '#faq' },
    { label: getTranslation('nav.contact', language), href: '#contact' },
  ]

  const programs = [
    getTranslation('programs.kids', language),
    getTranslation('programs.beginner', language),
    getTranslation('programs.advanced', language),
    getTranslation('programs.competition', language),
    getTranslation('programs.selfDefence', language),
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-background pt-20 border-t border-white/5 overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[300px] bg-primary/5 rounded-[100%] blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Brand */}
          <div className="col-span-2 lg:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <DTALogo size={48} />
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-none">DTA</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Darbhanga
                </span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed font-light mb-8 max-w-sm">
              {getTranslation('footer.location', language)}
            </p>
            <div className="flex gap-3">
              <a
                href="tel:+918226856261"
                className="w-10 h-10 rounded-xl glass-minimal flex items-center justify-center text-foreground/80 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                aria-label="Phone"
              >
                <FaPhoneAlt size={16} />
              </a>
              <a
                href="https://www.instagram.com/kings_of_taekwondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-minimal flex items-center justify-center text-foreground/80 hover:text-white hover:bg-pink-500/20 hover:-translate-y-1 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-3 lg:col-start-5">
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors font-light text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">
              {getTranslation('programs.title', language)}
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href="#programs"
                    className="text-muted-foreground hover:text-primary transition-colors font-light text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/0 group-hover:bg-primary transition-colors" />
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Timings */}
          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-6">
              {getTranslation('footer.timings', language)}
            </h4>
            <div className="glass-minimal rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-semibold text-white">{getTranslation('timing.title', language)}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Mon – Sat</span>
                  <span className="text-white font-medium">4:00 – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-light">Sunday</span>
                  <span className="text-red-400 font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-muted-foreground/80 font-light">
              {getTranslation('footer.copyright', language)}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground/80 font-light uppercase tracking-widest">
                Made with <FaHeart className="text-primary animate-pulse" size={10} /> in 
                <span className="font-semibold text-white">Darbhanga</span>
              </p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground/60 font-light">
                <FaCode className="text-primary/60" size={10} />
                {getTranslation('footer.developer', language)}
              </p>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 btn-3d"
                aria-label="Scroll to top"
              >
                <FaArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
