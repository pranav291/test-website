'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { FaCheckCircle } from 'react-icons/fa'
import { MdCardMembership } from 'react-icons/md'

export function Fees() {
  const { language } = useLanguage()

  const features = [
    'fees.feat1',
    'fees.feat2',
    'fees.feat3',
    'fees.feat4',
    'fees.feat5',
    'fees.feat6',
    'fees.feat7',
  ]

  return (
    <section id="fees" className="py-24 md:py-32 relative bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Investment
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white uppercase">
            {getTranslation('fees.title', language)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Pricing Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 20 }}
            className="group relative max-w-4xl mx-auto tk-card-3d p-8 md:p-12"
          >
            <div className="relative z-10 w-full h-full">
              {/* Popular Badge */}
              <div className="absolute -top-12 -right-12 bg-primary text-white text-xs font-bold px-6 py-2 rounded uppercase tracking-wider shadow-md transform rotate-12">
                Most Popular
              </div>

              <div className="grid md:grid-cols-5 gap-12 items-center">
                
                {/* Price Info */}
                <div className="md:col-span-2 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-12">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 border border-primary/20">
                    <MdCardMembership className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {getTranslation('fees.monthly', language)}
                  </h3>
                  
                  <div className="text-5xl font-black text-white my-6 tracking-tight flex items-baseline justify-center md:justify-start">
                    <span className="tk-text-solid-primary">₹500</span>
                    <span className="text-lg text-muted-foreground font-medium ml-2">/mo</span>
                  </div>
                  
                  <p className="text-sm font-light text-muted-foreground mb-4">
                    + {getTranslation('fees.admissionPrice', language)}
                    <br />
                    + {getTranslation('fees.uniformPrice', language)} (Uniform)
                  </p>

                  <a
                    href="#contact"
                    className="mt-6 w-full inline-block btn-3d-primary tracking-widest text-sm"
                  >
                    Enroll Today
                  </a>
                </div>

                {/* Features List */}
                <div className="md:col-span-3">
                  <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">
                    What's Included
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {features.map((featKey, idx) => (
                      <motion.li 
                        key={idx}
                        className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <FaCheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80 font-medium leading-tight">
                          {getTranslation(featKey, language)}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
