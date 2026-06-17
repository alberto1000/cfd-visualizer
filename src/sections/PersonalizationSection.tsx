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
    label: 'Posizione',
    headline: 'Aumenta i Watt ottimizzando la posizione',
    description: 'Una differenza di 2 cm nell\'altezza dei gomiti può valere 15 watt. Lo stesso vale per l\'angolo del torso. Scopri quanto lasci per strada con la tua posizione attuale.',
    benefit: 'Risparmio stimato: 10-20 watt senza spendere un euro',
    leftVideo: '/videos/cyclist-54kmh.mp4',
    rightVideo: '/videos/pressure-field_54kmh.mp4',
  },
  {
    id: 'helmet',
    label: 'Casco',
    headline: 'Il casco sbagliato ti costa più di quello che credi',
    description: 'Il casco è il primo punto di impatto con l\'aria. Tra un modello ventilato e uno aero la differenza è 20-30 watt a 50 km/h. Ti mostriamo esattamente dove l\'aria si ferma.',
    benefit: 'Miglior upgrade per euro speso nel tuo setup',
    leftVideo: '/videos/flow_dynamics1.mp4',
    rightVideo: '/videos/flow_dynamics2.mp4',
  },
  {
    id: 'speed',
    label: 'Velocità',
    headline: 'Cosa cambia e dove hai maggior resistenza a diverse velocità',
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
  const [selected, setSelected] = useState('position')
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
        <div className="personalization-header text-center mb-12">
          <p className="text-[#06b6d4] text-xs font-medium tracking-[0.25em] uppercase mb-4">
            IL TUO REPORT SU MISURA
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Cosa vuoi esplorare?
          </h2>
          <p className="text-gray-400 max-w-[600px] mx-auto leading-relaxed">
           Due caschi diversi? Due posizioni differenti? l'impatto dei gomiti? questi sono solo alcuni degli esempi che ti proponiamo...sbizzarisciti!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {comparisons.map((comparison) => {
            const isSelected = selected === comparison.id

            return (
              <button
                key={comparison.id}
                onClick={() => setSelected(comparison.id)}
                className={`px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#06b6d4]/15 border-[#06b6d4] text-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.2)]'
                    : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:border-white/25 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isSelected ? 'bg-[#06b6d4] scale-110' : 'bg-white/20'
                    }`}
                  />
                  {comparison.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="space-y-8">
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <p className="text-[#06b6d4] text-xs font-medium tracking-[0.2em] uppercase mb-2">
                  {activeComparison.label}
                </p>
                <h3 className="text-white text-2xl lg:text-3xl font-bold mb-3">
                  {activeComparison.headline}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed max-w-[700px]">
                  {activeComparison.description}
                </p>
              </div>
              <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/20 rounded-xl p-4 lg:min-w-[280px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#06b6d4]" />
                  <p className="text-[#06b6d4] text-xs font-medium uppercase tracking-wider">
                    Risultato
                  </p>
                </div>
                <p className="text-white font-semibold">
                  {activeComparison.benefit}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <p className="text-[#22c55e] text-xs font-medium uppercase tracking-wider">
                  Configurazione A
                </p>
              </div>
              <VideoReveal
                src={activeComparison.leftVideo}
                ariaLabel="Flusso d'aria"
                className="rounded-none border-0"
                aspectRatio="16/9"
              />
              <div className="px-4 py-3 bg-black/30">
                <p className="text-gray-500 text-xs">
                  
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl border border-white/10 overflow-hidden">
              <div className="bg-black/60 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <p className="text-[#f97316] text-xs font-medium uppercase tracking-wider">
                  Configurazione B
                </p>
                
              </div>
              <VideoReveal
                src={activeComparison.rightVideo}
                ariaLabel="Campo di pressione"
                className="rounded-none border-0"
                aspectRatio="16/9"
              />
              <div className="px-4 py-3 bg-black/30">
                <p className="text-gray-500 text-xs">
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}