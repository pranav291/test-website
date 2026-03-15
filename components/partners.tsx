'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'

export function Partners() {
  const { language } = useLanguage()

  const partners = [
    {
      name: 'Bihar Taekwondo',
      logo: 'https://ltalucknow.com/images/Partners/p6.png',
      isExternal: true,
      nameKey: 'partners.bihar'
    },
    {
      name: 'India Taekwondo',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/23/India_Taekwondo.png',
      isExternal: true,
      nameKey: 'partners.india'
    },
    {
      name: 'World Taekwondo',
      logo: '/images/partner-world-taekwondo.png',
      isExternal: false,
      nameKey: 'partners.world'
    },
    {
      name: 'National Sports Council',
      logo: '/images/partner-national-sports.png',
      isExternal: false,
      nameKey: 'partners.national'
    },
    {
      name: 'Bihar Sports Authority',
      logo: '/images/partner-bihar-sports.png',
      isExternal: false,
      nameKey: 'partners.authority'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section className="py-20 md:py-24 relative overflow-hidden bg-background border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4">
            {getTranslation('partners.title', language)}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        <motion.div
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="flex flex-wrap justify-center items-center gap-6 md:gap-10"
        >
          {partners.map((partner, index) => (
            <motion.div
              variants={item}
              key={index}
              className="glass-minimal rounded-full p-4 md:p-6 flex items-center justify-center group hover:bg-white/5 transition-all duration-300 w-28 h-28 md:w-36 md:h-36 relative overflow-hidden shrink-0 border border-white/5"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-inherit" />
              
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 z-10">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-logo.png';
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
