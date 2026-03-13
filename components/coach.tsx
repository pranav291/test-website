'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'
import { FaCalendarAlt, FaUsers, FaMedal, FaCertificate, FaStar, FaQuoteLeft } from 'react-icons/fa'

export function Coach() {
  const { language } = useLanguage()

  const stats = [
    { icon: FaCalendarAlt, value: '5+', label: 'Years Experience' },
    { icon: FaUsers, value: '100+', label: 'Students Trained' },
    { icon: FaMedal, value: '50+', label: 'Medals Won' },
    { icon: FaCertificate, value: 'Black Belt', label: 'Certification' },
  ]

  return (
    <section id="coach" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Instructor
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white">
            {getTranslation('coach.title', language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Coach Profile */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 max-w-6xl mx-auto">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/5">
              <Image
                src="/images/coach_portrait_1773424748271.png"
                alt={getTranslation('coach.name', language)}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
            </div>
            {/* Minimal Decorative border */}
            <div className="absolute -inset-4 rounded-[2rem] border border-primary/20 -z-10 opacity-50 block md:hidden lg:block hidden group-hover:-inset-2 transition-all duration-500" />
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
              {getTranslation('coach.name', language)}
            </h3>
            <p className="text-primary font-bold text-xl mb-6 tracking-wide uppercase">
              {getTranslation('coach.role', language)}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mb-10 font-light">
              {getTranslation('coach.description', language)}
            </p>

            {/* Stats Grid Minimal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass-minimal rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors">
                  <div className="w-12 h-12 bg-background mx-auto rounded-full flex items-center justify-center mb-4 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {getTranslation('testimonials.title', language)}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="glass-minimal rounded-3xl p-8 md:p-10 relative group hover:bg-white/5 transition-colors">
              <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-6 justify-end relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/80 font-light text-lg leading-relaxed mb-6 relative z-10 italic">
                "{getTranslation('testimonials.student1', language)}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  S
                </div>
                <div>
                  <p className="font-bold text-white text-sm tracking-wide">
                    {getTranslation('testimonials.student1Name', language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-minimal rounded-3xl p-8 md:p-10 relative group hover:bg-white/5 transition-colors">
              <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-6 justify-end relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/80 font-light text-lg leading-relaxed mb-6 relative z-10 italic">
                "{getTranslation('testimonials.parent1', language)}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold">
                  P
                </div>
                <div>
                  <p className="font-bold text-white text-sm tracking-wide">
                    {getTranslation('testimonials.parent1Name', language)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
