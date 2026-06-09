import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type ComparisonType = {
  id: string
  label: string
  description: string
  leftVideo: string   // velocità / flusso
  rightVideo: string  // pressione
}

const comparisons: ComparisonType[] = [
  {
    id: 'position',
    label: 'Confronto posizioni',
    description: 'Vedi come cambia il flusso e la pressione tra due posizioni del corpo: gomiti alti vs bassi, schiena curva vs dritta.',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'helmet',
    label: 'Confronto caschi',
    description: 'Confronta il flusso d\'aria e il campo di pressione tra il tuo casco attuale e uno più aerodinamico.',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'speed',
    label: 'Confronto velocità',
    description: 'Confronta 36 km/h vs 54 km/h: come cambia il flusso e la pressione sul tuo corpo alla stessa posizione.',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'bike',
    label: 'Confronto bici',
    description: 'Confronta due configurazioni di bici diverse: cronometro vs bici da strada, manubrio integrato vs tradizionale.',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
]

export function PersonalizationSection() {
  const [selected, setSelected] = useState<string>('position') // solo una alla volta
  const sectionRef = useRef(null)

  const activeComparison = comparisons.find((c) => c.id === selected) || comparisons[0]

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.personalization-header', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="personalizza"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-[#0a0a0a]"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="personalization-header text-center mb-12">
          <p className="text-[#06b6d4] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            PERSONALIZZA IL TUO REPORT
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Cosa vuoi confrontare?
          </h2>
          <p className="text-gray-400 max-w-[600px] mx-auto leading-relaxed">
            Seleziona il tipo di confronto. Il video si aggiorna automaticamente con le due visualizzazioni affiancate.
          </p>
        </div>

        {/* Grid: checkbox left, video right */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-start">
          
          {/* LEFT: Options (radio-style, solo una selezione) */}
          <div className="space-y-3">
            {comparisons.map((comparison) => {
              const isSelected = selected === comparison.id

              return (
                <div
                  key={comparison.id}
                  onClick={() => setSelected(comparison.id)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#06b6d4]/10 border-[#06b6d4]/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                      : 'bg-[#1a1a1a] border-white/10 hover:border-white/25 hover:bg-[#1a1a1a]/80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Radio circle */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? 'border-[#06b6d4] bg-[#06b6d4]'
                          : 'border-white/30'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex-1">
                      <h3 className={`font-medium text-sm mb-1 ${
                        isSelected ? 'text-[#06b6d4]' : 'text-white'
                      }`}>
                        {comparison.label}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {comparison.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Dual Video Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
              
              {/* Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <p className="text-[#06b6d4] text-xs font-medium tracking-[0.2em] uppercase">
                  {activeComparison.label}
                </p>
                <p className="text-gray-500 text-xs">
                  Configurazione A vs B
                </p>
              </div>

              {/* Two videos side by side */}
              <div className="grid grid-cols-2 gap-1">
                {/* Left: Velocity / Flow */}
                <div>
                  <div className="bg-black/50 px-3 py-2">
                    <p className="text-[10px] text-[#22c55e] uppercase tracking-wider font-medium">
                      Flusso d'aria
                    </p>
                  </div>
                  <VideoReveal
                    src={activeComparison.leftVideo}
                    ariaLabel="Flusso d'aria"
                    className="rounded-none border-0"
                    aspectRatio="4/3"
                  />
                </div>

                {/* Right: Pressure */}
                <div>
                  <div className="bg-black/50 px-3 py-2">
                    <p className="text-[10px] text-[#f97316] uppercase tracking-wider font-medium">
                      Campo di pressione
                    </p>
                  </div>
                  <VideoReveal
                    src={activeComparison.rightVideo}
                    ariaLabel="Campo di pressione"
                    className="rounded-none border-0"
                    aspectRatio="4/3"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <p className="text-gray-400 text-xs leading-relaxed">
                  <span className="text-white font-medium">Sinistra:</span> mappa di velocità — dove l'aria accelera e forma turbolenze.{' '}
                  <span className="text-white font-medium">Destra:</span> mappa di pressione — dove l'aria colpisce con più forza.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}