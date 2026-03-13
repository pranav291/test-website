'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { Shield, Users, Award, Swords, Heart } from 'lucide-react'

const PROGRAMS = [
  {
    titleKey: 'programs.kids',
    ageKey: 'programs.kidsAge',
    descKey: 'programs.kidsDesc',
    icon: Users,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
  },
  {
    titleKey: 'programs.beginner',
    ageKey: 'programs.kidsAge',
    descKey: 'programs.beginnerDesc',
    icon: Shield,
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
  },
  {
    titleKey: 'programs.advanced',
    ageKey: 'programs.kidsAge',
    descKey: 'programs.advancedDesc',
    icon: Award,
    gradient: 'from-primary/20 to-red-700/20',
    borderColor: 'border-primary/30',
  },
  {
    titleKey: 'programs.competition',
    ageKey: 'programs.kidsAge',
    descKey: 'programs.competitionDesc',
    icon: Swords,
    gradient: 'from-secondary/20 to-amber-500/20',
    borderColor: 'border-secondary/30',
  },
  {
    titleKey: 'programs.selfDefence',
    ageKey: 'programs.kidsAge',
    descKey: 'programs.selfDefenceDesc',
    icon: Heart,
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
  },
]

export function Programs() {
  const { language } = useLanguage()

  return (
    <section id="programs" className="py-20 md:py-28 relative">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {getTranslation('nav.programs', language)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('programs.title', language)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program, index) => {
            const Icon = program.icon
            return (
              <div
                key={index}
                className={`glass rounded-2xl p-6 md:p-8 card-glow group border ${program.borderColor} relative overflow-hidden`}
              >
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  {/* Icon + Age Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {getTranslation(program.ageKey, language)}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                    {getTranslation(program.titleKey, language)}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {getTranslation(program.descKey, language)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
