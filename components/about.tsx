'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { GiFist, GiMeditation, GiHeartBeats, GiTrophyCup, GiMuscleUp, GiBiceps, GiShintoShrine } from 'react-icons/gi'
import { FaYinYang } from 'react-icons/fa'

export function About() {
  const { language } = useLanguage()

  const benefits = [
    { icon: GiFist, titleKey: 'benefits.selfDefence' },
    { icon: GiMeditation, titleKey: 'benefits.discipline' },
    { icon: GiHeartBeats, titleKey: 'benefits.fitness' },
    { icon: GiTrophyCup, titleKey: 'benefits.confidence' },
    { icon: GiMuscleUp, titleKey: 'benefits.flexibility' },
    { icon: FaYinYang, titleKey: 'benefits.focus' },
    { icon: GiShintoShrine, titleKey: 'benefits.respect' },
    { icon: GiBiceps, titleKey: 'benefits.leadership' },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white uppercase">
            {getTranslation('about.title', language)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Description & Mission/Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              {getTranslation('about.description', language)}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid gap-6"
          >
            {/* Mission */}
            <div className="tk-card-3d p-8 rounded-xl group relative overflow-visible">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary flex items-center justify-center rounded shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10">
                <GiFist className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight mt-2 uppercase">
                {getTranslation('about.mission', language)}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {getTranslation('about.missionText', language)}
              </p>
            </div>

            {/* Vision */}
            <div className="tk-card-3d p-8 rounded-xl group relative overflow-visible">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary flex items-center justify-center rounded shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 z-10">
                <FaYinYang className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight mt-2 uppercase">
                {getTranslation('about.vision', language)}
              </h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {getTranslation('about.visionText', language)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white tracking-tight">
            {getTranslation('benefits.title', language)}
          </h3>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="tk-card-3d p-6 rounded-xl flex flex-col items-center justify-center text-center group"
              >
                <div className="w-14 h-14 bg-[#1a1a1a] rounded flex items-center justify-center mb-4 border border-white/5 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-foreground/90 uppercase tracking-wide">
                  {getTranslation(benefit.titleKey, language)}
                </h4>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
