'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { FaPhoneAlt, FaInstagram, FaMapMarkerAlt, FaExternalLinkAlt, FaPaperPlane, FaClock } from 'react-icons/fa'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const contactCards = [
    {
      icon: FaPhoneAlt,
      titleKey: 'contact.phone',
      value: '+91 8226856261',
      href: 'tel:+918226856261',
      action: 'Call Now',
      colorHover: 'hover:border-green-500/50 hover:bg-green-500/5',
      iconColor: 'text-green-500',
    },
    {
      icon: FaInstagram,
      titleKey: 'contact.instagram',
      value: '@kings_of_taekwondo',
      href: 'https://www.instagram.com/kings_of_taekwondo/',
      action: 'Follow Page',
      colorHover: 'hover:border-pink-500/50 hover:bg-pink-500/5',
      iconColor: 'text-pink-500',
    },
    {
      icon: FaMapMarkerAlt,
      titleKey: 'contact.location',
      value: getTranslation('contact.locationText', language),
      href: 'https://www.google.com/maps/search/Darbhanga+Bihar',
      action: 'Get Directions',
      colorHover: 'hover:border-blue-500/50 hover:bg-blue-500/5',
      iconColor: 'text-blue-500',
    },
    {
      icon: FaClock,
      titleKey: 'timing.title',
      value: getTranslation('timing.schedule', language),
      subValue: getTranslation('timing.closed', language),
      href: '#programs',
      action: getTranslation('timing.action', language),
      colorHover: 'hover:border-amber-500/50 hover:bg-amber-500/5',
      iconColor: 'text-amber-500',
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', phone: '', message: '' })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send message')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-background">
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white">
            {getTranslation('contact.title', language)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* Info Cards */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24 max-w-5xl mx-auto"
        >
          {contactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.a
                variants={item}
                key={index}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`glass-minimal rounded-3xl p-6 md:p-8 text-center group transition-all duration-300 ${card.colorHover}`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 tracking-tight">
                  {getTranslation(card.titleKey, language)}
                </h3>
                <p className="text-muted-foreground font-light text-xs md:text-sm mb-1">{card.value}</p>
                {card.subValue && (
                  <p className="text-xs text-red-400/80 font-medium">{card.subValue}</p>
                )}
                <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-foreground/50 group-hover:text-white transition-colors mt-3 md:mt-6">
                  {card.action} <FaExternalLinkAlt className="w-2.5 h-2.5 md:w-3 md:h-3" />
                </span>
              </motion.a>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="glass-minimal rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <FaPaperPlane className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {getTranslation('contact.message', language)}
              </h3>
            </div>
            
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/5">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">Message Sent!</h4>
                <p className="text-muted-foreground font-light max-w-xs">Our team will respond shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-xl border border-destructive/20 font-medium">
                    {error}
                  </div>
                )}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    {getTranslation('contact.name', language)}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white outline-none transition-all placeholder:text-muted-foreground/30 font-light"
                    placeholder={getTranslation('contact.namePlaceholder', language)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    {getTranslation('contact.phone', language)}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-5 py-4 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white outline-none transition-all placeholder:text-muted-foreground/30 font-light"
                    placeholder={getTranslation('contact.phonePlaceholder', language)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-5 py-4 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary text-white outline-none transition-all resize-none placeholder:text-muted-foreground/30 font-light"
                    placeholder={getTranslation('contact.messagePlaceholder', language)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl flex justify-center items-center hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-3d tracking-widest uppercase text-sm mt-2"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
                  ) : (
                    getTranslation('contact.send', language)
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-minimal rounded-3xl overflow-hidden h-[400px] lg:h-auto min-h-[400px] border border-white/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114678.40444463028!2d85.82173!3d26.15424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb96e1ac8e6f9%3A0x2e8de4bed0c9aa69!2sDarbhanga%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(1.1) brightness(0.6)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Darbhanga Taekwondo Academy Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
