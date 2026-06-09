import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

type ComparisonType = {
  id: string
  label: string
  headline: string
  description: string
  benefit: string
  leftVideo: string
  rightVideo: string
}

const comparisons: ComparisonType[] = [
  {
    id: 'position',
    label: 'Posizione sul sellino',
    headline: 'Trova i watt nascosti nella tua postura',
    description: 'Una differenza di 2 cm nell'altezza dei gomiti può valere 15 watt. Lo stesso vale per l'angolo del torso. Scopri quanto lasci per strada con la tua posizione attuale.',
    benefit: 'Risparmio stimato: 10-20 watt senza spendere un euro',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'helmet',
    label: 'Casco',
    headline: 'Il casco sbagliato ti costa più di un paio di ruote',
    description: 'Il casco è il primo punto di impatto con l'aria. Tra un modello ventilato e uno aero la differenza è 20-30 watt a 50 km/h. Ti mostriamo esattamente dove l'aria si ferma.',
    benefit: 'Miglior upgrade per euro speso nel tuo setup',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'speed',
    label: 'Velocità',
    headline: 'A 54 km/h l'aria non è più amica',
    description: 'La resistenza cresce con il cubo della velocità. Passare da 36 a 54 km/h costa 3.4× più watt. Vediamo insieme dove il tuo corpo diventa un freno a quelle velocità.',
    benefit: 'Capisci quando conviene spingere e quando risparmiare',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'bike',
    label: 'Bici',
    headline: 'Prima di comprare, confronta in digitale',
    description: 'Cronometro vs strada, telaio rigido vs aerodinamico, manubrio integrato vs tradizionale. Confrontiamo due configurazioni complete prima che tu investa migliaia di euro.',
    benefit: 'Risparmia il costo di una bici sbagliata',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
]

export function PersonalizationSection() {
  const [selected, setSelected] = useState<string>('position')
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
            IL TUO REPORT SU MISURA
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Cosa vuoi scoprire?
          </h2>
          <p className="text-gray-400 max-w-[600px] mx-auto leading-relaxed">
            Ogni confronto ti mostra due visualizzazioni affiancate: il flusso d'aria e il campo di pressione. 
            Scegli cosa vuoi analizzare — i numeri parlano chiaro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-start">
          
          {/* LEFT: Options */}
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
                      <h3 className={`font-semibold text-sm mb-1 ${
                        isSelected ? 'text-[#06b6d4]' : 'text-white'
                      }`}>
                        {comparison.label}
                      </h3>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {comparison.headline}
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
              <div className="p-5 border-b border-white/10">
                <p className="text-[#06b6d4] text-xs font-medium tracking-[0.2em] uppercase mb-2">
                  {activeComparison.label}
                </p>
                <h3 className="text-white text-xl font-bold mb-2">
                  {activeComparison.headline}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {activeComparison.description}
                </p>
              </div>

              {/* Two videos side by side */}
              <div className="grid grid-cols-2 gap-1">
                <div>
                  <div className="bg-black/50 px-3 py-2 flex items-center justify-between">
                    <p className="text-[10px] text-[#22c55e] uppercase tracking-wider font-medium">
                      Flusso d'aria
                    </p>
                    <span className="text-[10px] text-gray-500">Config A</span>
                  </div>
                  <VideoReveal
                    src={activeComparison.leftVideo}
                    ariaLabel="Flusso d'aria"
                    className="rounded-none border-0"
                    aspectRatio="4/3"
                  />
                </div>

                <div>
                  <div className="bg-black/50 px-3 py-2 flex items-center justify-between">
                    <p className="text-[10px] text-[#f97316] uppercase tracking-wider font-medium">
                      Pressione
                    </p>
                    <span className="text-[10px] text-gray-500">Config B</span>
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
              <div className="p-5 border-t border-white/10 bg-[#06b6d4]/5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                  <p className="text-[#06b6d4] text-xs font-medium uppercase tracking-wider">
                    Risultato
                  </p>
                </div>
                <p className="text-white text-sm font-medium">
                  {activeComparison.benefit}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}