import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

const bullets = [
  'Quanto la velocità dell\'aria influisce sui tuoi consumi',
  'Dove esattamente il tuo corpo accumula più pressione',
  'Quanto puoi guadagnare cambiando posizione e/o equipaggiamento',
]

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      gsap.from(rightRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-primary"
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left Column - Text */}
        <div ref={leftRef}>
          <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4">
            DI COSA SI TRATTA
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-6">
            L'aria è il tuo vero avversario
          </h2>
          <p className="text-txt-secondary leading-relaxed mb-4">
            Quando pedali, la resistenza che senti di più non viene dalla fatica dei muscoli né dall'attrito delle ruote: viene dall'aria che devi spostare. Abbiamo analizzato al computer il profilo di un atleta reale in bici a due velocità tipiche di gara: 36 km/h (ritmo di granfondo) e 54 km/h (sprint finale o discesa).
          </p>
          <p className="text-txt-secondary leading-relaxed mb-8">
            In strada ci sono il vento, le buche, la stanchezza, il traffico. Al computer possiamo congelare tutto e studiare solo l'aria. È come avere una galleria del vento virtuale, disponibile 24 ore su 24.
          </p>

          <div className="space-y-4">
            {bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cfd-cyan flex-shrink-0" />
                <p className="text-txt-secondary text-sm leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Video */}
        <div ref={rightRef} className="lg:pl-8">
          <div className="transform lg:rotate-2">
            <VideoReveal
              src="/videos/3d-model.mp4"
              ariaLabel="Visualizzazione del dominio di calcolo"
              aspectRatio="4/4"
              className="border border-cfd-cyan/20 shadow-glow"
            />
          </div>
          <p className="text-txt-tertiary text-xs text-center mt-4 tracking-wide">
            Visualizzazione del dominio di calcolo
          </p>
        </div>
      </div>
    </section>
  )
}
