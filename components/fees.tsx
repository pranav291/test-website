'use client'

import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { Check, Star } from 'lucide-react'

const FEES = [
  {
    labelKey: 'fees.monthly',
    priceKey: 'fees.monthlyPrice',
    features: ['fees.feat1', 'fees.feat2', 'fees.feat3'],
    popular: true,
  },
  {
    labelKey: 'fees.admission',
    priceKey: 'fees.admissionPrice',
    features: ['fees.feat4', 'fees.feat5'],
    popular: false,
  },
  {
    labelKey: 'fees.uniform',
    priceKey: 'fees.uniformPrice',
    features: ['fees.feat6', 'fees.feat7'],
    popular: false,
  },
]

export function Fees() {
  const { language } = useLanguage()

  return (
    <section id="fees" className="py-20 md:py-28 relative">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('fees.title', language)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Fees Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {FEES.map((fee, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 md:p-8 card-glow transition-all ${
                fee.popular
                  ? 'glass border-2 border-primary/40 shadow-lg shadow-primary/10'
                  : 'glass border border-white/5'
              }`}
            >
              {/* Popular Badge */}
              {fee.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-primary to-red-700 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Label */}
              <h3 className="text-lg md:text-xl font-bold text-foreground text-center mt-2 mb-6">
                {getTranslation(fee.labelKey, language)}
              </h3>

              {/* Price */}
              <div className="text-center mb-8">
                <p className="text-3xl md:text-4xl font-black gradient-text">
                  {getTranslation(fee.priceKey, language)}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {fee.features.map((featKey, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {getTranslation(featKey, language)}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  fee.popular
                    ? 'bg-gradient-to-r from-primary to-red-700 text-white hover:shadow-lg hover:shadow-primary/30'
                    : 'glass text-foreground hover:bg-white/10'
                }`}
              >
                {getTranslation('hero.joinBtn', language)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
