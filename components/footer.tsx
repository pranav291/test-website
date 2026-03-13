'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'
import { Instagram, Phone, Heart, ArrowUp } from 'lucide-react'

export function Footer() {
  const { language } = useLanguage()

  const quickLinks = [
    { label: getTranslation('nav.home', language), href: '#home' },
    { label: getTranslation('nav.about', language), href: '#about' },
    { label: getTranslation('nav.programs', language), href: '#programs' },
    { label: getTranslation('nav.fees', language), href: '#fees' },
    { label: getTranslation('nav.gallery', language), href: '#gallery' },
    { label: getTranslation('nav.coach', language), href: '#coach' },
    { label: getTranslation('nav.contact', language), href: '#contact' },
  ]

  const programs = [
    getTranslation('programs.kids', language),
    getTranslation('programs.beginner', language),
    getTranslation('programs.advanced', language),
    getTranslation('programs.competition', language),
    getTranslation('programs.selfDefence', language),
  ]

  return (
    <footer className="relative border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-primary/30">
                <Image
                  src="/images/logo.png"
                  alt="DTA Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text">DTA</span>
                <span className="block text-[10px] text-muted-foreground -mt-1">
                  Darbhanga Taekwondo
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {getTranslation('footer.location', language)}
            </p>
            <div className="flex gap-3">
              <a
                href="tel:+918226856261"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4 text-primary" />
              </a>
              <a
                href="https://www.instagram.com/kings_of_taekwondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-pink-500/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">
              {getTranslation('programs.title', language)}
            </h4>
            <ul className="space-y-2">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href="#programs"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-4">
              {getTranslation('footer.contact', language)}
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+918226856261"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 8226856261
              </a>
              <a
                href="https://www.instagram.com/kings_of_taekwondo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @kings_of_taekwondo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {getTranslation('footer.copyright', language)}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              Made with <Heart className="w-3 h-3 text-primary fill-primary" /> in Darbhanga
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-colors sm:ml-auto"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
