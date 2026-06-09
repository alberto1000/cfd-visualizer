import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { IntroSection } from '@/sections/IntroSection'
import { MethodSection } from '@/sections/MethodSection'
import { PersonalizationSection } from '@/sections/PersonalizationSection'


import { InsightsSection } from '@/sections/InsightsSection'
import { PartnersSection } from '@/sections/PartnersSection'
import { ContactSection } from '@/sections/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navigation />
      <main>
        <HeroSection />
        <IntroSection />
        <MethodSection />
        <PersonalizationSection />


        <InsightsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
