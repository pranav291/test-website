'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { FaChevronDown, FaArrowRight } from 'react-icons/fa'
import { GiTrophyCup, GiPlayerBase } from 'react-icons/gi'
import { MdAccessTimeFilled } from 'react-icons/md'

export function Hero() {
  const { language } = useLanguage()

  const stats = [
    { icon: GiPlayerBase, value: '200+', labelKey: 'hero.students' },
    { icon: GiTrophyCup, value: '50+', labelKey: 'hero.medals' },
    { icon: MdAccessTimeFilled, value: '10+', labelKey: 'hero.years' },
  ]

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background with 3D Parallax feel */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full h-full bg-[url('/images/hero_background_1773424725265.png')] bg-cover bg-center opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 border-2 border-primary bg-background mb-6 shadow-[4px_4px_0_0_rgba(230,57,70,1)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Darbhanga No.1
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6 uppercase"
          >
            Become Strong & 
            <br />
            <span className="tk-text-solid-primary">Confident.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-10 font-light"
          >
            {getTranslation('hero.subtitle', language)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="btn-3d-primary flex items-center justify-center gap-2"
            >
              {getTranslation('hero.joinBtn', language)}
              <FaArrowRight />
            </a>
            <a
              href="#programs"
              className="tk-card-solid px-8 py-4 rounded-xl font-bold text-center text-white transition-all duration-300 btn-3d"
            >
              {getTranslation('hero.contactBtn', language)}
            </a>
          </motion.div>
        </div>

        {/* Stats Strip Minimal */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 md:mt-32 grid grid-cols-3 gap-4 md:gap-12 max-w-2xl border-t border-white/10 pt-8"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <stat.icon className="w-6 h-6 text-primary" />
              <div className="text-2xl md:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                {getTranslation(stat.labelKey, language)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaChevronDown />
        </motion.div>
      </motion.a>
    </section>
  )
}
