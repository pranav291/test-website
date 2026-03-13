'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'
import { ChevronDown, Users, Trophy, Clock } from 'lucide-react'

export function Hero() {
  const { language } = useLanguage()

  const stats = [
    { icon: Users, value: '100+', labelKey: 'hero.students' },
    { icon: Trophy, value: '50+', labelKey: 'hero.medals' },
    { icon: Clock, value: '5+', labelKey: 'hero.years' },
  ]

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Darbhanga Taekwondo Academy Training"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-fadeInUp">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-foreground/80">
              Darbhanga&apos;s #1 Taekwondo Academy
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 animate-fadeInUp delay-100">
            <span className="gradient-text">
              {getTranslation('hero.title', language)}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-xl mb-8 animate-fadeInUp delay-200 leading-relaxed">
            {getTranslation('hero.subtitle', language)}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fadeInUp delay-300">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-red-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 text-sm md:text-base"
            >
              {getTranslation('hero.joinBtn', language)}
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center px-8 py-4 glass text-foreground font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-sm md:text-base"
            >
              {getTranslation('hero.contactBtn', language)}
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 md:gap-10 animate-fadeInUp delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground">
                    {getTranslation(stat.labelKey, language)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scrollIndicator">
        <ChevronDown className="w-6 h-6 text-foreground/40" />
      </div>
    </section>
  )
}
