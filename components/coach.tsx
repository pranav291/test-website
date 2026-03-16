'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'
import { FaCalendarAlt, FaUsers, FaMedal, FaCertificate, FaStar, FaQuoteLeft, FaUserTie, FaChalkboardTeacher, FaAward } from 'react-icons/fa'
import { MdSportsMartialArts } from 'react-icons/md'

export function Coach() {
  const { language } = useLanguage()

  const stats = [
    { icon: FaCalendarAlt, value: '5+', label: 'Years Experience' },
    { icon: FaUsers, value: '200+', label: 'Students Trained' },
    { icon: FaMedal, value: '50+', label: 'Medals Won' },
    { icon: FaCertificate, value: 'Black Belt', label: 'Certification' },
  ]

  // Owner only

  const testimonials = [
    { textKey: 'testimonials.student1', nameKey: 'testimonials.student1Name', roleKey: 'testimonials.student1Role', stars: 5, color: 'text-primary bg-primary/20' },
    { textKey: 'testimonials.parent1', nameKey: 'testimonials.parent1Name', roleKey: 'testimonials.parent1Role', stars: 5, color: 'text-blue-400 bg-blue-500/20' },
    { textKey: 'testimonials.student2', nameKey: 'testimonials.student2Name', roleKey: 'testimonials.student2Role', stars: 5, color: 'text-green-400 bg-green-500/20' },
    { textKey: 'testimonials.parent2', nameKey: 'testimonials.parent2Name', roleKey: 'testimonials.parent2Role', stars: 5, color: 'text-amber-400 bg-amber-500/20' },
    { textKey: 'testimonials.student3', nameKey: 'testimonials.student3Name', roleKey: 'testimonials.student3Role', stars: 5, color: 'text-purple-400 bg-purple-500/20' },
    { textKey: 'testimonials.parent3', nameKey: 'testimonials.parent3Name', roleKey: 'testimonials.parent3Role', stars: 4, color: 'text-pink-400 bg-pink-500/20' },
    { textKey: 'testimonials.student4', nameKey: 'testimonials.student4Name', roleKey: 'testimonials.student4Role', stars: 5, color: 'text-cyan-400 bg-cyan-500/20' },
    { textKey: 'testimonials.student5', nameKey: 'testimonials.student5Name', roleKey: 'testimonials.student5Role', stars: 5, color: 'text-rose-400 bg-rose-500/20' },
    { textKey: 'testimonials.student6', nameKey: 'testimonials.student6Name', roleKey: 'testimonials.student6Role', stars: 5, color: 'text-emerald-400 bg-emerald-500/20' },
    { textKey: 'testimonials.student7', nameKey: 'testimonials.student7Name', roleKey: 'testimonials.student7Role', stars: 5, color: 'text-indigo-400 bg-indigo-500/20' },
    { textKey: 'testimonials.parent4', nameKey: 'testimonials.parent4Name', roleKey: 'testimonials.parent4Role', stars: 5, color: 'text-orange-400 bg-orange-500/20' },
    { textKey: 'testimonials.student8', nameKey: 'testimonials.student8Name', roleKey: 'testimonials.student8Role', stars: 5, color: 'text-teal-400 bg-teal-500/20' },
    { textKey: 'testimonials.student9', nameKey: 'testimonials.student9Name', roleKey: 'testimonials.student9Role', stars: 5, color: 'text-lime-400 bg-lime-500/20' },
    { textKey: 'testimonials.parent5', nameKey: 'testimonials.parent5Name', roleKey: 'testimonials.parent5Role', stars: 5, color: 'text-fuchsia-400 bg-fuchsia-500/20' },
    { textKey: 'testimonials.student10', nameKey: 'testimonials.student10Name', roleKey: 'testimonials.student10Role', stars: 5, color: 'text-sky-400 bg-sky-500/20' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

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
            Our Coach
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white">
            Meet The Coach
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Owner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-16"
        >
          <div className="glass-minimal rounded-3xl p-10 relative group hover:bg-white/5 transition-all duration-500 overflow-hidden border border-amber-500/30 max-w-sm w-full text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-6 border border-amber-500/30 mx-auto group-hover:scale-110 transition-transform duration-300">
                <FaUserTie className="w-9 h-9 text-amber-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Suraj Raj</h3>
              <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20">
                {getTranslation('team.director', language)}
              </span>
              <p className="text-muted-foreground leading-relaxed font-light text-sm">
                {getTranslation('team.directorDesc', language)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="glass-minimal rounded-2xl p-6 text-center group hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 bg-background mx-auto rounded-full flex items-center justify-center mb-4 border border-white/5 group-hover:border-primary/30 transition-colors">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
              {getTranslation('testimonials.title', language)}
            </h3>
            {/* Overall Rating */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-minimal border border-amber-500/20">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">
                {getTranslation('testimonials.overallRating', language)}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const name = getTranslation(testimonial.nameKey, language)
              const initial = name.charAt(0)
              const colorClasses = testimonial.color.split(' ')
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-minimal rounded-2xl p-6 relative group hover:bg-white/5 transition-colors"
                >
                  <FaQuoteLeft className="absolute top-6 left-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                  
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4 justify-end relative z-10">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-amber-400" />
                    ))}
                    {[...Array(5 - testimonial.stars)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-white/10" />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-foreground/80 font-light text-sm leading-relaxed mb-5 relative z-10 italic">
                    &ldquo;{getTranslation(testimonial.textKey, language)}&rdquo;
                  </p>
                  
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${testimonial.color}`}>
                      {initial}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm tracking-wide">
                        {name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getTranslation(testimonial.roleKey, language)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
