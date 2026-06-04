import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

const zones = [
  { color: '#DC2626', label: 'Frontale', parts: 'casco, petto', desc: 'Pressione massima — 40% resistenza' },
  { color: '#EAB308', label: 'Laterale', parts: 'spalle, braccia', desc: 'Pressione media — 30% resistenza' },
  { color: '#1E3A8A', label: 'Posteriore', parts: 'schiena, glutei', desc: 'Zona di scia — 30% resistenza' },
]

const SPEEDS = [
  { label: '36 km/h', src: '/videos/pressure-field_54kmh.mp4' },
  { label: '54 km/h', src: '/videos/pressure-field_54kmh.mp4' },
]

export function PressureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const zonesRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeSpeed, setActiveSpeed] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      zonesRef.current.forEach((zone, i) => {
        if (!zone) return
        gsap.from(zone, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: 0.3 + i * 0.15,
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
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Video + Toggle */}
        <div ref={leftRef} className="flex flex-col gap-4">

          {/* Toggle velocità */}
          <div className="flex gap-2 self-start">
            {SPEEDS.map((speed, i) => (
              <button
                key={i}
                onClick={() => setActiveSpeed(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 border ${
                  activeSpeed === i
                    ? 'bg-cfd-red text-white border-cfd-red shadow-[0_0_12px_#DC262640]'
                    : 'bg-transparent text-txt-secondary border-white/10 hover:border-cfd-red/40 hover:text-txt-primary'
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>

          {/* Video — key forzato per rimontare il componente al cambio sorgente */}
          <VideoReveal
            key={SPEEDS[activeSpeed].src}
            src={SPEEDS[activeSpeed].src}
            ariaLabel={`Campo di pressione attorno al ciclista a ${SPEEDS[activeSpeed].label}`}
            className="border border-cfd-red/10 hover:border-cfd-red/30 transition-all duration-500"
          />
        </div>

        {/* Text — invariato */}
        <div ref={rightRef}>
          <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4">
            ANALISI DEL CAMPO DI PRESSIONE
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-6">
            Dove l'aria colpisce di più
          </h2>
          <p className="text-txt-secondary leading-relaxed mb-8">
            Le mappe di pressione mostrano che casco e spalle da soli coprono circa il 40% della resistenza totale.
            Queste zone rosse sono dove l'aria si ferma contro il corpo, creando la maggior parte del rallentamento.
          </p>

          <div className="space-y-4">
            {zones.map((zone, i) => (
              <div
                key={i}
                ref={(el) => { zonesRef.current[i] = el }}
                className="flex items-start gap-4"
              >
                <span
                  className="mt-1 w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: zone.color, boxShadow: `0 0 12px ${zone.color}40` }}
                />
                <div>
                  <p className="text-txt-primary font-medium">
                    {zone.label} <span className="text-txt-tertiary font-normal">({zone.parts})</span>
                  </p>
                  <p className="text-txt-secondary text-sm">{zone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}