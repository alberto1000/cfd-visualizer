import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'
import { Bike, Shield, Gauge, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testScenarios = [
  {
    icon: Bike,
    title: 'Confronto tra bici',
    description: 'Telaio da corsa vs cronometro, bici attuale vs nuovo modello. Scopri quanto realmente guadagni prima di acquistare.',
    video: '/videos/cyclist-54kmh.mp4',
    label: "Flusso d'aria",
  },
  {
    icon: Shield,
    title: 'Casco e posizione',
    description: 'Casco aperto vs integrale, gomiti alti vs bassi, manubrio standard vs aerobar. Ogni centimetro conta.',
    video: '/videos/pressure-field_54kmh.mp4',
    label: 'Campo di pressione',
  },
  {
    icon: Gauge,
    title: 'Velocità e condizioni',
    description: 'Simulazione a diverse velocità, con o senza vento laterale, in salita o in discesa. Pianifica la tua strategia.',
    video: '/videos/3d-model.mp4',
    label: 'Dominio di calcolo',
  },
]

export function PressureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="pressure"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-secondary"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          Cosa puoi testare
        </p>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-4 text-center">
          Ogni configurazione, ogni dubbio
        </h2>
        <p className="text-txt-secondary text-center max-w-[600px] mx-auto mb-12 leading-relaxed">
          Tu scegli cosa confrontare. Noi simuliamo e ti diamo i numeri. Ecco alcuni esempi di cosa i nostri clienti hanno già testato
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testScenarios.map((scenario, i) => {
            const Icon = scenario.icon
            return (
              <div
                key={i}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group bg-bg-tertiary rounded-2xl border border-white/[0.06] hover:border-cfd-cyan/20 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                {/* Video */}
                <div className="relative">
                  <VideoReveal
                    src={scenario.video}
                    ariaLabel={`Esempio di simulazione: ${scenario.title}`}
                    className="border-0 rounded-none"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-bg-primary/80 backdrop-blur-sm rounded-full text-xs text-cfd-cyan font-medium tracking-wide">
                    {scenario.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cfd-cyan/10 mb-4 group-hover:bg-cfd-cyan/20 transition-colors">
                    <Icon className="w-5 h-5 text-cfd-cyan" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-txt-primary mb-2">
                    {scenario.title}
                  </h3>
                  <p className="text-txt-secondary text-sm leading-relaxed mb-4">
                    {scenario.description}
                  </p>
                  <div className="flex items-center gap-2 text-cfd-cyan text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Disponibile nel report</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}