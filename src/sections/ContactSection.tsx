import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, Mail, Linkedin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const contacts = [
  { icon: Globe, label: 'fes-engineering.it', href: 'https://fes-engineering.it' },
  { icon: Mail, label: 'info@fes-engineering.it', href: 'mailto:info@fes-engineering.it' },
  { icon: Linkedin, label: 'FES-Functional-Engineering-System', href: '#' },
]

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)]"
      style={{
        background: 'linear-gradient(180deg, #0A0A0F 0%, #0F172A 50%, #0A0A0F 100%)',
      }}
    >
      <div className="contact-content max-w-[700px] mx-auto px-6 text-center">
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-4">
          Il tuo profilo aerodinamico è unico. Riduci i consumi e guadagna minuti ottimizzandolo:
        </h2>
        <p className="text-lg text-txt-secondary leading-relaxed mb-10">
          Scansioniamo la tua posizione, simuliamo la tua configurazione e ti diciamo esattamente come ridurre il drag. Wind tunnel digitale da 400€ invece di 3000€ — stessa precisione, stessi numeri.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {contacts.map((contact, i) => {
            const Icon = contact.icon
            return (
              <a
                key={i}
                href={contact.href}
                className="flex items-center gap-2 text-txt-secondary hover:text-cfd-cyan transition-colors duration-300"
              >
                <Icon className="w-4 h-4 text-cfd-cyan" />
                <span className="text-sm">{contact.label}</span>
              </a>
            )
          })}
        </div>

        <a
          href="mailto:info@fes-engineering.it"
          className="inline-flex px-10 py-4 bg-cfd-cyan text-bg-primary font-medium rounded-full hover:shadow-glow-strong transition-all duration-300 text-sm tracking-wide animate-[pulse-glow_3s_ease-in-out_infinite]"
        >
          Richiedi una Simulazione
        </a>
      </div>
    </section>
  )
}