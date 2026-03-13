import type { Metadata } from 'next'
import { Poppins, Noto_Sans_Devanagari } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
    'Darbhanga Taekwondo Academy (DTA) offers professional taekwondo training in Darbhanga, Bihar. Learn self defence, discipline, fitness & confidence. Coached by Suraj Raj. Join now — kids & adults welcome!',
  keywords: [
    'Darbhanga Taekwondo Academy',
    'Taekwondo Darbhanga',
    'Darbhanga Log Dhun',
    'martial arts Darbhanga',
    'self defence training Bihar',
    'taekwondo classes Darbhanga',
    'kids martial arts Bihar',
    'Suraj Raj coach',
    'best taekwondo academy Bihar',
    'taekwondo training near me',
    'DTA Darbhanga',
    'taekwondo competition Bihar',
    'self defence classes',
    'physical fitness Darbhanga',
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
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Darbhanga Taekwondo Academy | Best Martial Arts Training',
    description:
      'Professional taekwondo training in Darbhanga, Bihar. Self defence, discipline, fitness & confidence for kids and adults.',
    url: 'https://darbhanga-taekwondo.com',
    siteName: 'Darbhanga Taekwondo Academy',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Darbhanga Taekwondo Academy Training',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darbhanga Taekwondo Academy',
    description: 'Professional taekwondo training in Darbhanga, Bihar',
    images: ['/images/hero-bg.png'],
  },
  alternates: {
    canonical: 'https://darbhanga-taekwondo.com',
  },
  category: 'Sports & Fitness',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoDevanagari.variable}`}>
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
              url: 'https://darbhanga-taekwondo.com',
              telephone: '+918226856261',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Darbhanga',
                addressRegion: 'Bihar',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 26.1542,
                longitude: 85.8918,
              },
              sameAs: [
                'https://www.instagram.com/kings_of_taekwondo/',
              ],
              sport: 'Taekwondo',
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                ],
                opens: '06:00',
                closes: '20:00',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
