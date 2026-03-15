'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import Image from 'next/image'

const partners = [
  {
    name: 'Bihar Taekwondo',
    logo: 'https://ltalucknow.com/images/Partners/p6.png',
    isExternal: true,
  },
  {
    name: 'India Taekwondo',
    logo: 'https://upload.wikimedia.org/wikipedia/en/2/23/India_Taekwondo.png',
    isExternal: true,
  },
  {
    name: 'World Taekwondo',
    logo: '/images/partner-world-taekwondo.png',
    isExternal: false,
  },
  {
    name: 'National Sports Council',
    logo: '/images/partner-national-sports.png',
    isExternal: false,
  },
  {
    name: 'Bihar Sports Authority',
    logo: '/images/partner-bihar-sports.png',
    isExternal: false,
  },
]

export function Partners() {
  const { language } = useLanguage()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Affiliations
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-4 mb-6 tracking-tight text-white">
            {getTranslation('partners.title', language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Partners Marquee */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex gap-8 md:gap-12 justify-center items-center flex-wrap"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-minimal rounded-2xl p-6 md:p-8 flex flex-col items-center gap-4 group hover:bg-white/5 transition-all duration-300 w-[140px] md:w-[180px]"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                    sizes="80px"
                  />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground font-medium text-center leading-tight group-hover:text-white transition-colors">
                  {partner.name}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
