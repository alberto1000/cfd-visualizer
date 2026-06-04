import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Wind, Cpu, BarChart3 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Box,
    title: 'Scansione 3D',
    description: "Scansioniamo l'atleta in sella con uno scanner. In pochi minuti otteniamo una copia digitale precisa al millimetro della sua reale geometria.",
  },
  {
    icon: Wind,
    title: 'Galleria Digitale',
    description: "Costruiamo attorno al ciclista una galleria del vento virtuale che divide lo spazio in oltre 30 milioni di celle minuscole.",
  },
  {
    icon: Cpu,
    title: 'Simulazione CFD',
    description: "Risolviamo le equazioni di Navier-Stokes su un server HPC per ottenere i campi di pressione e velocità.",
  },
  {
    icon: BarChart3,
    title: 'Risultati',
    description: 'Traduciamo i dati in informazioni pratiche: quanti watt, dove perdi maggior energia, cosa cambiare per ottimizzare il flusso.',
  },
]

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      // Steps stagger
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2 * i,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="method"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-secondary relative overflow-hidden"
    >
      {/* Glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          IL NOSTRO METODO
        </p>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-4 text-center">
          Dal corridore reale ai numeri precisi
        </h2>
        <p className="text-txt-secondary text-center max-w-[600px] mx-auto mb-16 leading-relaxed">
          Un processo in 4 fasi che trasforma uno scanner 3D in insight aerodinamici
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line - desktop only */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[24px] left-[12.5%] right-[12.5%] h-[2px] origin-left"
            style={{
              background: 'linear-gradient(90deg, #06B6D4, rgba(6,182,212,0.1))',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={i}
                  ref={(el) => { stepsRef.current[i] = el }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cfd-cyan/10 mb-4">
                    <Icon className="w-5 h-5 text-cfd-cyan" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-txt-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-txt-secondary text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
