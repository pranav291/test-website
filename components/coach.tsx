'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'
import { Award, Users, Calendar, Medal, Star } from 'lucide-react'

export function Coach() {
  const { language } = useLanguage()

  const stats = [
    { icon: Calendar, value: '5+', label: 'Years Experience' },
    { icon: Users, value: '100+', label: 'Students Trained' },
    { icon: Medal, value: '50+', label: 'Medals Won' },
    { icon: Award, value: 'Black Belt', label: 'Certification' },
  ]

  return (
    <section id="coach" className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Instructor
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('coach.title', language)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Coach Profile */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto mb-20">
          {/* Image */}
          <div className="relative group">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/images/coach.png"
                alt={getTranslation('coach.name', language)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -inset-2 rounded-2xl border border-primary/20 -z-10" />
            <div className="absolute -inset-4 rounded-2xl border border-primary/10 -z-10" />
          </div>

          {/* Info */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {getTranslation('coach.name', language)}
            </h3>
            <p className="text-primary font-semibold text-lg mb-6">
              {getTranslation('coach.role', language)}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-8">
              {getTranslation('coach.description', language)}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 text-center card-glow">
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            <span className="gradient-text">{getTranslation('testimonials.title', language)}</span>
          </h3>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="glass rounded-2xl p-6 md:p-8 card-glow relative">
              <div className="absolute top-4 right-6 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                ))}
              </div>
              <div className="text-4xl text-primary/30 font-serif mb-3">&ldquo;</div>
              <p className="text-muted-foreground italic mb-4 leading-relaxed">
                {getTranslation('testimonials.student1', language)}
              </p>
              <p className="font-semibold text-foreground text-sm">
                {getTranslation('testimonials.student1Name', language)}
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="glass rounded-2xl p-6 md:p-8 card-glow relative">
              <div className="absolute top-4 right-6 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-secondary fill-secondary" />
                ))}
              </div>
              <div className="text-4xl text-primary/30 font-serif mb-3">&ldquo;</div>
              <p className="text-muted-foreground italic mb-4 leading-relaxed">
                {getTranslation('testimonials.parent1', language)}
              </p>
              <p className="font-semibold text-foreground text-sm">
                {getTranslation('testimonials.parent1Name', language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
