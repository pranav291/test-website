import { LanguageProvider } from './language-context'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Programs } from '@/components/programs'
import { Fees } from '@/components/fees'
import { Gallery } from '@/components/gallery'
import { Coach } from '@/components/coach'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Fees />
      <Gallery />
      <Coach />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </LanguageProvider>
  )
}
