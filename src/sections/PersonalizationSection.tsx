import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const options = [
  {
    id: 'position',
    label: 'Confronto posizioni',
    description: "Vedi come cambia il flusso d'aria abbassando i gomiti, alzando il sedile o modificando l'angolo del torso.",
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: true,
  },
  {
    id: 'helmet',
    label: 'Confronto caschi',
    description: "Confronta il campo di pressione tra il tuo casco attuale e uno più aerodinamico.",
    videoSrc: '/videos/pressure-field_54kmh.mp4',
    available: true,
  },
  {
    id: 'wheels',
    label: 'Confronto ruote',
    description: 'Cerchio alto vs basso, profilo diverso, raggi tradizionali vs aero.',
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: false,
  },
  {
    id: 'clothing',
    label: 'Confronto abbigliamento',
    description: 'Tuta aero vs maglia normale, calzamaglia vs pantaloncini.',
    videoSrc: '/videos/pressure-field_54kmh.mp4',
    available: false,
  },
  {
    id: 'accessories',
    label: 'Accessori e dettagli',
    description: 'Borraccia, computer, pedali — ogni dettaglio ha un costo in watt.',
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: false,
  },
]

export function PersonalizationSection() {
  const [selected, setSelected] = useState(['position'])
  const sectionRef = useRef(null)

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

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

  const activeOptions = options.filter((o) => selected.includes(o.id))
  const activeVideo = activeOptions.length > 0 
    ? activeOptions[activeOptions.length - 1].videoSrc 
    : options[0].videoSrc

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
            Ogni ciclista ha le sue domande. Seleziona cosa vuoi vedere nel tuo report.
          </p>
        </div>

        {/* Grid: checkbox left, video right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: Options */}
          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selected.includes(option.id)
              const isAvailable = option.available

              return (
                <div
                  key={option.id}
                  onClick={() => isAvailable && toggleOption(option.id)}
                  className={`p-5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#06b6d4]/5 border-[#06b6d4]/30'
                      : isAvailable
                      ? 'bg-[#1a1a1a] border-white/10 hover:border-white/20 cursor-pointer'
                      : 'bg-[#1a1a1a]/50 border-white/5 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-[#06b6d4] border-[#06b6d4]'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium text-sm">
                          {option.label}
                        </h3>
                        {!isAvailable && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-500 uppercase tracking-wider">
                            Disponibile su richiesta
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Video Preview */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <p className="text-[#06b6d4] text-xs font-medium tracking-[0.2em] uppercase">
                  ANTEPRIMA
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {activeOptions.length > 0
                    ? `Mostrando: ${activeOptions.map((o) => o.label).join(', ')}`
                    : "Seleziona un'opzione"}
                </p>
              </div>

              <VideoReveal
                src={activeVideo}
                ariaLabel="Anteprima"
                className="rounded-none border-0"
                aspectRatio="16/9"
              />

              <div className="p-4">
                <p className="text-gray-500 text-xs leading-relaxed">
                  Video dimostrativo. Nel report finale vedrai i tuoi dati reali.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}