import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

const bullets = [
  'Quanta energia perdi contro l\'aria alla tua velocità di riferimento',
  'Dove il tuo corpo e la tua bici accumulano più pressione',
  'Quanto puoi guadagnare cambiando posizione, casco o telaio'
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
          L’aria è il tuo avversario più grande       
          </h2>
          <p className="text-txt-secondary leading-relaxed mb-4">
          Oltre i 30 km/h, la maggior parte della potenza che produci serve semplicemente a vincere la resistenza dell’aria. Ogni watt perso contro il vento è energia che non si trasforma in velocità.
          Su strada intervengono decine di variabili: vento, traffico, asfalto, pendenza, stanchezza. Nelle nostre simulazioni eliminiamo il rumore e analizziamo ciò che conta davvero: l’interazione tra te, la tua bici e l’aria che ti circonda.
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
              ariaLabel="Visualizzazione del dominio di calcolo CFD"
              aspectRatio="5/4"
              className="border border-cfd-cyan/20 shadow-glow"
            />
          </div>
          <p className="text-txt-tertiary text-xs text-center mt-4 tracking-wide">
            Esempio di dominio di calcolo per un ciclista. I dettagli contano.
          </p>
        </div>
      </div>
    </section>
  )
}