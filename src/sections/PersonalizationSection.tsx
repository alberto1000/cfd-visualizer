import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

type PersonalizationOption = {
  id: string
  label: string
  description: string
  videoSrc: string
  available: boolean
}

const options: PersonalizationOption[] = [
  {
    id: 'position',
    label: 'Confronto posizioni',
    description: "Vedi come cambia il flusso d'aria abbassando i gomiti, alzando il sedile o modificando l'angolo del torso. Ogni posizione ha il suo video dedicato.",
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: true,
  },
  {
    id: 'helmet',
    label: 'Confronto caschi',
    description: "Confronta il campo di pressione tra il tuo casco attuale e uno più aerodinamico. Vedi esattamente dove l'aria colpisce di più.",
    videoSrc: '/videos/pressure-field_54kmh.mp4',
    available: true,
  },
  {
    id: 'wheels',
    label: 'Confronto ruote',
    description: 'Cerchio alto vs basso, profilo diverso, raggi tradizionali vs aero. Il flusso attorno alle ruote cambia più di quanto pensi.',
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: false,
  },
  {
    id: 'clothing',
    label: 'Confronto abbigliamento',
    description: 'Tuta aero vs maglia normale, calzamaglia vs pantaloncini. La pelle liscia conta, ma non sempre come credi.',
    videoSrc: '/videos/pressure-field_54kmh.mp4',
    available: false,
  },
  {
    id: 'accessories',
    label: 'Accessori e dettagli',
    description: 'Borraccia sul telaio vs sotto il sellino, computer da manubrio vs sullo stelo, pedali standard vs aero. Ogni dettaglio ha un costo in watt.',
    videoSrc: '/videos/cyclist-54kmh.mp4',
    available: false,
  },
]

export function PersonalizationSection() {
  const [selected, setSelected] = useState<string[]>(['position'])
  const sectionRef = useRef<<HTMLElement>(null)
  const gridRef = useRef<<HTMLDivElement>(null)

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.personalization-header', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.option-card', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const activeOptions = options.filter((o) => selected.includes(o.id))
  const activeVideo = activeOptions.length > 0 ? activeOptions[activeOptions.length - 1].videoSrc : options[0].videoSrc

  return (
    <section
      id="personalizza"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-bg-primary"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="personalization-header text-center mb-12">
          <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4">
            PERSONALIZZA IL TUO REPORT
          </p>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-txt-primary leading-tight mb-4">
            Cosa vuoi confrontare?
          </h2>
          <p className="text-txt-secondary max-w-[600px] mx-auto leading-relaxed">
            Ogni ciclista ha le sue domande. Seleziona cosa vuoi vedere nel tuo report e immagina il confronto. Quando avrai i dati, sostituirai i video con quelli reali.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-start">
          {/* Left: Options */}
          <div ref={gridRef} className="space-y-3">
            {options.map((option) => {
              const isSelected = selected.includes(option.id)
              const isAvailable = option.available

              return (
                <div
                  key={option.id}
                  onClick={() => isAvailable && toggleOption(option.id)}
                  className={`option-card relative p-5 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-cfd-cyan/5 border-cfd-cyan/30 shadow-[0_0_20px_rgba(6,182,212,0.08)]'
                      : isAvailable
                      ? 'bg-bg-tertiary border-white/[0.06] hover:border-white/20 cursor-pointer'
                      : 'bg-bg-tertiary/50 border-white/[0.03] opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <div
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-cfd-cyan border-cfd-cyan'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-bg-primary" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-txt-primary font-medium text-sm">
                          {option.label}
                        </h3>
                        {!isAvailable && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-txt-tertiary uppercase tracking-wider">
                            Disponibile su richiesta
                          </span>
                        )}
                      </div>
                      <p className="text-txt-secondary text-xs leading-relaxed">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            <p className="text-txt-tertiary text-xs mt-4 text-center">
              I video mostrati sono esempi. Quando avrai i dati della tua simulazione, sostituirai ogni video con quello reale.
            </p>
          </div>

          {/* Right: Video Preview */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-bg-tertiary rounded-2xl border border-white/[0.06] overflow-hidden">
              <div className="p-4 border-b border-white/[0.06]">
                <p className="text-cfd-cyan text-xs font-medium tracking-[0.2em] uppercase">
                  ANTEPRIMA
                </p>
                <p className="text-txt-tertiary text-xs mt-1">
                  {activeOptions.length > 0
                    ? `Mostrando: ${activeOptions.map((o) => o.label).join(', ')}`
                    : "Seleziona un'opzione per vedere l'anteprima"}
                </p>
              </div>

              <VideoReveal
                src={activeVideo}
                ariaLabel="Anteprima della personalizzazione selezionata"
                className="rounded-none border-0"
                aspectRatio="16/9"
              />

              <div className="p-4">
                <p className="text-txt-tertiary text-xs leading-relaxed">
                  {activeOptions.length > 0
                    ? 'Questo è un video dimostrativo. Nel tuo report finale, qui vedrai il confronto tra le tue configurazioni reali con i dati numerici affiancati.'
                    : "Seleziona almeno un'opzione a sinistra per vedere come apparirà il tuo report."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}