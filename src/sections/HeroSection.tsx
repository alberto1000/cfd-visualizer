import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const overlineRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.to(overlineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(chevronRef.current, { opacity: 1, duration: 0.6 }, '-=0.4')
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '700px' }}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Abstract CFD velocity field visualization"
      >
        <source src="/videos/hero-flow.mp4" type="video/mp4" />
      </video>

      {/* Overlay Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.85) 60%, rgba(10,10,15,1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
        <p
          ref={overlineRef}
          className="opacity-0 translate-y-8 text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6"
        >
          FES ENGINEERING — SIMULAZIONE CFD
        </p>

        <h1
          ref={titleRef}
          className="opacity-0 translate-y-8 font-heading text-[clamp(2.5rem,6vw,5rem)] font-bold text-txt-primary leading-[0.95] mb-6"
        >
          La tua galleria del vento digitale
        </h1>

        <p
          ref={subtitleRef}
          className="opacity-0 translate-y-8 text-lg text-txt-secondary max-w-[700px] mx-auto mb-10 leading-relaxed"
        >
          Simuliamo il tuo profilo aerodinamico in condizioni controllate: stessa precisione di una wind tunnel reale, a una frazione del costo
        </p>

        <div ref={ctaRef} className="opacity-0 translate-y-8 flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#scenarios"
            className="px-8 py-3.5 bg-cfd-cyan text-bg-primary font-medium rounded-full hover:shadow-glow-strong transition-all duration-300 text-sm tracking-wide"
          >
            Vedi un Esempio di Report
          </a>
          <a
            href="#method"
            className="px-8 py-3.5 border border-white/20 text-txt-primary font-medium rounded-full hover:border-cfd-cyan/50 hover:text-cfd-cyan transition-all duration-300 text-sm tracking-wide"
          >
            Scopri il Metodo
          </a>
        </div>

        <div ref={statsRef} className="opacity-0 translate-y-8 flex items-center justify-center gap-3 text-txt-tertiary text-xs tracking-widest uppercase">
          <span>Validato in wind tunnel</span>
          <span>·</span>
          <span>Errore &lt; 5%</span>
          <span>·</span>
          <span>Da 400€</span>
        </div>
      </div>

      {/* Scroll-down chevron */}
      <div
        ref={chevronRef}
        className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#intro" className="block text-txt-tertiary hover:text-cfd-cyan transition-colors">
          <ChevronDown className="w-6 h-6 animate-chevron-bounce" />
        </a>
      </div>
    </section>
  )
}