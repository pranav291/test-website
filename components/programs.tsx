'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { FaChild, FaUserNinja, FaMedal, FaShieldAlt, FaArrowRight, FaFistRaised, FaHeartbeat } from 'react-icons/fa'
import { MdOutlineSportsMartialArts } from 'react-icons/md'
import { GiBlackBelt } from 'react-icons/gi'

export function Programs() {
  const { language } = useLanguage()

  const programs = [
    {
      icon: MdOutlineSportsMartialArts,
      titleKey: 'programs.kids',
      descKey: 'programs.kidsDesc',
      badge: getTranslation('programs.kidsAge', language),
    },
    {
      icon: GiBlackBelt,
      titleKey: 'programs.beginner',
      descKey: 'programs.beginnerDesc',
    },
    {
      icon: FaFistRaised,
      titleKey: 'programs.advanced',
      descKey: 'programs.advancedDesc',
    },
    {
      icon: FaMedal,
      titleKey: 'programs.competition',
      descKey: 'programs.competitionDesc',
    },
    {
      icon: FaShieldAlt,
      titleKey: 'programs.selfDefence',
      descKey: 'programs.selfDefenceDesc',
    },
    {
      titleKey: 'programs.fitness',
      descKey: 'programs.fitnessDesc',
      icon: FaHeartbeat,
      color: 'from-rose-500/20 to-rose-600/10',
      iconColor: 'text-rose-400',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  }

  return (
    <section id="programs" className="py-24 md:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Curriculum
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white">
            {getTranslation('programs.title', language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {programs.map((prog, index) => {
            const Icon = prog.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="glass-minimal rounded-3xl p-8 relative group hover:bg-white/5 transition-all duration-500 overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                  <Icon className="w-32 h-32 absolute -top-4 -right-4 -rotate-12 text-white" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    {prog.badge && (
                      <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md">
                        {prog.badge}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {getTranslation(prog.titleKey, language)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light mb-8 flex-1">
                    {getTranslation(prog.descKey, language)}
                  </p>
                  
                  <div className="mt-auto">
                    <a href="#contact" className="inline-flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors uppercase tracking-widest">
                      Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
