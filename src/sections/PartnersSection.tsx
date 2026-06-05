import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  {
    name: 'OpenFOAM',
    logo: '/images/logo-openfoam.png',
    description: 'Il software open source leader mondiale per la fluidodinamica computazionale.',
  },
  {
    name: 'Leonardo - HPC Cineca',
    logo: '/images/logo-leonardo.png',
    description: 'Un supercomputer di ultima generazione esteso su 1500 metri quadri, gestito dal CINECA.',
  },
    {
    name: 'Paraview',
    logo: '/images/logo-paraview.png',
    description: 'ParaView,  software open-source leader mondiale nella visualizzazione e rappresentazione di dati.',
  },

]

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-secondary"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          TECNOLOGIE
        </p>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-12 text-center">
          Gli strumenti della precisione
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[800px] mx-auto">
          {partners.map((partner, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group bg-bg-tertiary rounded-xl border border-white/[0.06] hover:border-cfd-cyan/30 transition-all duration-400 overflow-hidden"
            >
              <div className="p-8 flex items-center justify-center h-24">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-400"
                />
              </div>
              <div className="px-6 pb-6">
                <p className="text-txt-secondary text-sm text-center leading-relaxed">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}