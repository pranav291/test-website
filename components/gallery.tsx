'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { X } from 'lucide-react'

const GALLERY_IMAGES = [
  { src: '/images/img1.jpg', alt: 'Taekwondo Training', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/img2.jpg', alt: 'Students Practicing Kicks', span: '' },
  { src: '/images/gallery-training.png', alt: 'Group Training Session', span: '' },
  { src: '/images/img3.jpg', alt: 'Belt Promotion Ceremony', span: '' },
  { src: '/images/gallery-competition.png', alt: 'Competition', span: 'md:col-span-2' },
  { src: '/images/img4.jpg', alt: 'Academy Group Photo', span: '' },
]

export function Gallery() {
  const { language } = useLanguage()
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">
            {getTranslation('nav.gallery', language)}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            <span className="gradient-text">{getTranslation('nav.gallery', language)}</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${image.span}`}
              style={{ minHeight: image.span.includes('row-span-2') ? '400px' : '200px' }}
              onClick={() => setLightbox(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={lightbox}
              alt="Gallery"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
