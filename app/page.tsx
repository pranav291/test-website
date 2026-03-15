import { LanguageProvider } from './language-context'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Partners } from '@/components/partners'
import { Programs } from '@/components/programs'
import { Fees } from '@/components/fees'
import { Gallery } from '@/components/gallery'
import { Coach } from '@/components/coach'
import { FAQ } from '@/components/faq'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <About />
      <Partners />
      <Programs />
      <Fees />
      <Gallery />
      <Coach />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  )
}
