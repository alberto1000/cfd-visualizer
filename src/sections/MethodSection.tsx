import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Wind, Cpu, BarChart3 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Box,
    title: 'Acquisizione 3D',
    description:
      'Creiamo una replica digitale estremamente accurata di te e della tua bicicletta, catturando la tua reale posizione in sella e ogni dettaglio che influenza l’aerodinamica.',
  },
  {
    icon: Wind,
    title: 'Galleria del vento digitale',
    description:
      'Ricostruiamo virtualmente il flusso d’aria attorno al sistema atleta-bicicletta per individuare le aree che generano più resistenza e dissipano energia.',
  },
  {
    icon: Cpu,
    title: 'Simulazione CFD avanzata',
    description:
      'Utilizziamo simulazioni ad alta fedeltà e calcolo HPC per misurare con precisione drag, pressioni e strutture vorticali che influenzano le prestazioni.',
  },
  {
    icon: BarChart3,
    title: 'Guadagni concreti',
    description:
      'Trasformiamo milioni di dati in indicazioni pratiche: quali modifiche apportare, quanti watt puoi risparmiare e dove ottenere il massimo vantaggio prestazionale.',
  },
]

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      stepsRef.current.forEach((step, i) => {
        if (!step) return

        gsap.from(step, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2 * i,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
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
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          IL NOSTRO METODO
        </p>

        <h2 className="font-heading text-[clamp(2rem,4vw,3.8rem)] font-bold text-txt-primary leading-tight text-center mb-6">
          Dalla tua posizione in sella
          <br />
          alla versione più veloce di te stesso
        </h2>

        <p className="text-cfd-cyan text-center font-medium mb-6">
          Ogni simulazione ha un solo obiettivo: trasformare la tua potenza in più velocità.
        </p>

        <p className="text-txt-secondary text-center max-w-[800px] mx-auto mb-16 leading-relaxed">
          Utilizziamo le stesse metodologie impiegate nei settori più avanzati
          dell’ingegneria per analizzare l’interazione tra atleta, bicicletta e
          flusso d’aria. Dalla scansione 3D alla simulazione CFD, ogni fase del
          processo è progettata per individuare dove stai perdendo velocità e
          come recuperarla con interventi concreti e misurabili.
        </p>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] origin-left"
            style={{
              background:
                'linear-gradient(90deg, rgba(6,182,212,1) 0%, rgba(6,182,212,0.15) 100%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, i) => {
              const Icon = step.icon

              return (
                <div
                  key={i}
                  ref={(el) => {
                    stepsRef.current[i] = el
                  }}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cfd-cyan/10 border border-cfd-cyan/20 mb-5">
                    <Icon className="w-6 h-6 text-cfd-cyan" />
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-txt-primary mb-3">
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
