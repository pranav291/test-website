'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/language-context'
import { getTranslation } from '@/lib/translations'
import { IoCloseOutline } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IGalleryImage } from '@/lib/models/GalleryImage'

const DEFAULT_IMAGES = [
  { url: '/images/tk1.jpg', alt: 'Image 1', span: 'md:col-span-2 md:row-span-2' },
  { url: '/images/tk2.jpg', alt: 'Image 2', span: '' },
  { url: '/images/tk3.jpg', alt: 'Image 3', span: '' },
  { url: '/images/tk4.jpg', alt: 'Image 4', span: '' },
  { url: '/images/tk5.jpg', alt: 'Image 5', span: 'md:col-span-2' },
  { url: '/images/tk6.jpg', alt: 'Image 6', span: '' },
  { url: '/images/tk7.jpg', alt: 'Image 7', span: '' },
  { url: '/images/tk8.jpg', alt: 'Image 8', span: 'md:col-span-2' },
  { url: '/images/tk9.jpg', alt: 'Image 9', span: '' },
]

export function Gallery() {
  const { language } = useLanguage()
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [dbImages, setDbImages] = useState<IGalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery')
      if (res.ok) {
        const data = await res.json()
        setDbImages(data)
      }
    } catch (error) {
      console.error('Failed to fetch gallery images', error)
    } finally {
      setLoading(false)
    }
  }

  const allImages = [
    ...dbImages.map(img => ({ url: img.url, alt: img.alt, span: '' })),
    ...DEFAULT_IMAGES
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <section id="gallery" className="py-24 md:py-32 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">
            Moments
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6 tracking-tight text-white uppercase">
            {getTranslation('nav.gallery', language)}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <AiOutlineLoading3Quarters className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 auto-rows-[250px]"
          >
            {allImages.map((image, index) => (
              <motion.div
                variants={item}
                key={index}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-white/5 ${image.span || 'col-span-1 row-span-1'}`}
                style={{ minHeight: image.span.includes('row-span-2') ? '500px' : '250px' }}
                onClick={() => setLightbox(image.url)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Caption Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex flex-col items-center text-center">
                  <div className="w-8 h-1 bg-primary rounded-full mb-3" />
                  <p className="text-white font-semibold text-sm drop-shadow-lg tracking-wide">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setLightbox(null)}
            >
              <IoCloseOutline size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox}
                alt="Gallery Preview"
                className="w-full h-full object-contain bg-black/40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
