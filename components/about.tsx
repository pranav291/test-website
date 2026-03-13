'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { Shield, Brain, Flame, Heart, Zap, Target, Award, Users } from 'lucide-react'

const BENEFIT_ICONS = [Shield, Brain, Flame, Heart, Zap, Target, Award, Users]

export function About() {
  const { language } = useLanguage()

  const benefits = [
    'benefits.selfDefence',
    'benefits.discipline',
    'benefits.confidence',
    'benefits.fitness',
    'benefits.flexibility',
    'benefits.focus',
    'benefits.respect',
    'benefits.leadership',
  ]

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {getTranslation('nav.about', language)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('about.title', language)}</span>
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {getTranslation('about.description', language)}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {/* Mission */}
          <div className="glass rounded-2xl p-8 card-glow group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {getTranslation('about.mission', language)}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {getTranslation('about.missionText', language)}
            </p>
          </div>

          {/* Vision */}
          <div className="glass rounded-2xl p-8 card-glow group">
            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
              <Flame className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {getTranslation('about.vision', language)}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {getTranslation('about.visionText', language)}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="gradient-text">{getTranslation('benefits.title', language)}</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {benefits.map((key, index) => {
              const Icon = BENEFIT_ICONS[index]
              return (
                <div
                  key={key}
                  className="glass rounded-xl p-5 text-center card-glow group cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-foreground">
                    {getTranslation(key, language)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
