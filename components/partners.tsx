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
    <section className="py-20 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[#0f0f0f] clip-diagonal-reverse pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 uppercase">
            {getTranslation('partners.title', language)}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
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
              className="tk-card-3d rounded-xl flex items-center justify-center p-4 w-32 h-32 md:w-40 md:h-40"
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center">
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
