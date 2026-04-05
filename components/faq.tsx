'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa'

const faqKeys = [
  { q: 'faq.q1', a: 'faq.a1' },
  { q: 'faq.q2', a: 'faq.a2' },
  { q: 'faq.q3', a: 'faq.a3' },
  { q: 'faq.q4', a: 'faq.a4' },
  { q: 'faq.q5', a: 'faq.a5' },
  { q: 'faq.q6', a: 'faq.a6' },
  { q: 'faq.q7', a: 'faq.a7' },
  { q: 'faq.q8', a: 'faq.a8' },
  { q: 'faq.q9', a: 'faq.a9' },
  { q: 'faq.q10', a: 'faq.a10' },
  { q: 'faq.q11', a: 'faq.a11' },
  { q: 'faq.q12', a: 'faq.a12' },
  { q: 'faq.q13', a: 'faq.a13' },
]

export function FAQ() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 md:py-32 relative bg-background">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Help
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white uppercase">
            {getTranslation('faq.title', language)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 font-light max-w-lg mx-auto">
            {getTranslation('faq.subtitle', language)}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqKeys.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`tk-card-3d rounded-xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? 'bg-[#1a1a1a] border border-primary/20' : 'hover:bg-[#1f1f1f]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      isOpen ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground'
                    }`}>
                      <FaQuestionCircle className="w-4 h-4" />
                    </div>
                    <span className={`font-semibold text-sm md:text-base transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-foreground/80'
                    }`}>
                      {getTranslation(faq.q, language)}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-300 text-muted-foreground ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="pl-12 border-l-2 border-primary/20">
                          <p className="text-muted-foreground leading-relaxed font-light text-sm md:text-base">
                            {getTranslation(faq.a, language)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground font-light mb-4">
            {getTranslation('faq.moreQuestions', language)}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 btn-3d text-sm"
          >
            {getTranslation('faq.contactUs', language)}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
