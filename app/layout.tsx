import type { Metadata } from 'next'
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import AnnouncementBanner from '@/components/announcement-banner'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
})

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Darbhanga Taekwondo Academy | Best Martial Arts Training in Darbhanga, Bihar',
  description:
    'Darbhanga Taekwondo Academy (DTA) offers professional taekwondo training in Darbhanga. Serving Bela, Mirzapur, Laheriasarai & nearby areas. Learn self defence, discipline, fitness & confidence. Join our expert coaching team now!',
  keywords: [
    'Taekwondo in Darbhanga',
    'Best Martial Arts Darbhanga',
    'Taekwondo near Bela Darbhanga',
    'Martial arts Mirzapur Darbhanga',
    'Karate class Laheriasarai',
    'Taekwondo Baheri',
    'Self Defence Benipatti',
    'DTA Darbhanga Academy',
    'Darbhanga Taekwondo',
    'Fitness Darbhanga',
    'Kids Martial Arts Bihar',
    'Karate classes in Darbhanga',
    'Martial arts training Darbhanga',
    'Self defense classes for kids Darbhanga',
    'Fitness center in Bela Darbhanga',
    'Taekwondo tournament coaching Bihar',
    'Women self defense training Darbhanga',
    'Best coach for taekwondo near me',
    'DTA Darbhanga fees',
    'Taekwondo academy in North Bihar'
  ],
  authors: [{ name: 'Darbhanga Taekwondo Academy' }],
  creator: 'Darbhanga Taekwondo Academy',
  publisher: 'Darbhanga Taekwondo Academy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/images/dta-logo-new.png', type: 'image/png' },
    ],
    apple: '/images/dta-logo-new.png',
  },
  openGraph: {
    title: 'DTA Darbhanga | Best Taekwondo Academy',
    description:
      'Professional taekwondo training in Darbhanga, Bihar. Providing self defence, fitness & confidence classes for Bela, Mirzapur, and Laheriasarai.',
    url: 'https://darbhangataekwondo.fit',
    siteName: 'Darbhanga Taekwondo Academy',
    images: [
      {
        url: '/images/dta-logo-new.png',
        width: 1200,
        height: 1200,
        alt: 'Darbhanga Taekwondo Academy Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darbhanga Taekwondo Academy',
    description: 'Professional taekwondo training in Darbhanga, Bihar',
    images: ['/images/dta-logo-new.png'],
  },
  alternates: {
    canonical: 'https://darbhangataekwondo.fit',
    languages: {
      'en': 'https://darbhangataekwondo.fit',
      'hi': 'https://darbhangataekwondo.fit?lang=hi',
    }
  },
  category: 'Sports & Fitness',
  other: {
    'geo.region': 'IN-BR',
    'geo.placename': 'Darbhanga',
    'geo.position': '26.1542;85.8918',
    'ICBM': '26.1542, 85.8918',
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoDevanagari.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SportsActivityLocation',
              name: 'Darbhanga Taekwondo Academy',
              description:
                'Professional taekwondo training center in Darbhanga, Bihar offering self defence, discipline and fitness training.',
              url: 'https://darbhangataekwondo.fit',
              telephone: '+918226856261',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Darbhanga',
                addressRegion: 'Bihar',
                addressCountry: 'IN',
              },
              areaServed: [
                'Darbhanga',
                'Bela',
                'Mirzapur',
                'Laheriasarai',
                'Baheri',
                'Benipatti'
              ],
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.1542,
                longitude: 85.8918,
              },
              sameAs: [
                'https://www.instagram.com/kings_of_taekwondo/',
              ],
              priceRange: '₹500 - ₹1500',
              image: 'https://darbhangataekwondo.fit/images/dta-logo-new.png',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Taekwondo Classes',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Monthly Training Fee'
                    },
                    price: '500',
                    priceCurrency: 'INR'
                  }
                ]
              },
              sport: 'Taekwondo',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                  ],
                  opens: '16:00',
                  closes: '18:00',
                }
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What age group can join DTA?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Children aged 5 years and above can join. We have separate batches for kids (5-12), teenagers (13-17), and adults (18+).'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What are the class timings?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Classes are held Monday to Saturday from 4:00 PM to 6:00 PM. Sunday is closed.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What is the monthly fee?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Monthly fee is just ₹500. Admission fee is ₹500 (one time) and uniform costs ₹550 to ₹1000.'
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <AnnouncementBanner />
        {children}
      </body>
    </html>
  )
}
