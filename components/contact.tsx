'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { Phone, Instagram, MapPin, ExternalLink } from 'lucide-react'

export function Contact() {
  const { language } = useLanguage()

  const contactCards = [
    {
      icon: Phone,
      titleKey: 'contact.phone',
      value: '+91 8226856261',
      href: 'tel:+918226856261',
      action: 'Call Now',
      gradient: 'from-green-500/20 to-emerald-500/20',
      iconColor: 'text-green-500',
    },
    {
      icon: Instagram,
      titleKey: 'contact.instagram',
      value: '@kings_of_taekwondo',
      href: 'https://www.instagram.com/kings_of_taekwondo/',
      action: 'Follow',
      gradient: 'from-pink-500/20 to-purple-500/20',
      iconColor: 'text-pink-500',
    },
    {
      icon: MapPin,
      titleKey: 'contact.location',
      value: getTranslation('contact.locationText', language),
      href: 'https://www.google.com/maps/search/Darbhanga+Bihar',
      action: 'Directions',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('contact.title', language)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          {contactCards.map((card, index) => {
            const Icon = card.icon
            return (
              <a
                key={index}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-2xl p-6 card-glow group text-center block"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {getTranslation(card.titleKey, language)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{card.value}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  {card.action} <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            )
          })}
        </div>

        {/* Google Map */}
        <div className="glass rounded-2xl overflow-hidden max-w-4xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114678.40444463028!2d85.82173!3d26.15424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39edb96e1ac8e6f9%3A0x2e8de4bed0c9aa69!2sDarbhanga%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="350"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Darbhanga Taekwondo Academy Location"
          />
        </div>
      </div>
    </section>
  )
}
