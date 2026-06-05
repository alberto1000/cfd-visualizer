import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

type Tab = 'flow' | 'pressure' | 'compare'

const tabs = [
  { id: 'flow' as Tab, label: 'Flusso d\'Aria' },
  { id: 'pressure' as Tab, label: 'Campo di Pressione' },
  { id: 'compare' as Tab, label: 'Confronto Configurazioni' },
]

export function ScenariosSection() {
  const [activeTab, setActiveTab] = useState<Tab>('flow')
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [animKey, setAnimKey] = useState(0)

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
    setAnimKey((k) => k + 1)
  }

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [activeTab])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tab-nav', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="scenarios"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-primary"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          ESEMPIO DI REPORT
        </p>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-4 text-center">
          Cosa ricevi dopo la simulazione
        </h2>
        <p className="text-txt-secondary text-center max-w-[600px] mx-auto mb-12 leading-relaxed">
          Ogni report è personalizzato sulla tua configurazione. Ecco un esempio di come presentiamo i risultati
        </p>

        {/* Tab Navigation */}
        <div className="tab-nav flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              className={`px-6 py-3 text-xs font-medium tracking-widest uppercase rounded-full border transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cfd-cyan/10 border-cfd-cyan text-cfd-cyan shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                  : 'bg-transparent border-white/10 text-txt-secondary hover:border-white/20 hover:text-txt-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div ref={contentRef} key={animKey}>
          {activeTab === 'flow' && <ScenarioFlow />}
          {activeTab === 'pressure' && <ScenarioPressure />}
          {activeTab === 'compare' && <ScenarioCompare />}
        </div>
      </div>
    </section>
  )
}

/* ==================== FLOW SCENARIO ==================== */
function ScenarioFlow() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
        {/* Video Panel */}
        <div>
          <VideoReveal
            src="/videos/cyclist-54kmh.mp4"
            ariaLabel="Flusso d'aria attorno al ciclista in simulazione CFD"
            className="border border-cfd-cyan/10 hover:border-cfd-cyan/30 transition-all duration-500"
          />
          {/* Velocity Legend */}
          <div className="mt-4">
            <div
              className="h-2 rounded-full w-full"
              style={{
                background: 'linear-gradient(90deg, #1E3A8A, #06B6D4, #22C55E, #EAB308)',
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="text-txt-tertiary text-xs">Bassa</span>
              <span className="text-txt-tertiary text-xs">Alta velocità</span>
            </div>
            <p className="text-txt-tertiary text-xs mt-2 tracking-wide">
              Mappa di velocità del flusso d'aria — i colori mostrano dove l'aria accelera e dove forma turbolenze
            </p>
          </div>
        </div>

        {/* Data Panel */}
        <div className="bg-bg-tertiary rounded-2xl p-6 lg:p-8 border border-white/[0.06] shadow-glow relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, #06B6D4, #22C55E)' }}
          />
          <p className="text-cfd-cyan text-xs font-medium tracking-[0.2em] uppercase mb-2">
            ANALISI DEL FLUSSO
          </p>
          <h3 className="font-heading text-2xl font-bold text-txt-primary mb-6">
            Come l'aria si muove intorno a te
          </h3>

          <div className="space-y-0">
            <MetricRow 
              label="Velocità di riferimento" 
              value="Personalizzata" 
              description="Tu scegli: 30, 40, 50 km/h o qualsiasi altra" 
            />
            <MetricRow 
              label="Resistenza aerodinamica" 
              value="Calcolata" 
              description="Forza in Newton esatta per la tua geometria" 
            />
            <MetricRow 
              label="Potenza dissipata" 
              value="Calcolata" 
              description="Watt che servono solo per spostare l'aria" 
            />
            <MetricRow 
              label="Quota su resistenza totale" 
              value="Calcolata" 
              description="Percentuale rispetto a ruote, cuscinetti, gravità" 
            />
            <MetricRow 
              label="CDA (ingombro aerodinamico)" 
              value="Calcolato" 
              description="Il numero che determina la tua efficienza" 
            />
          </div>

          <div className="mt-6 p-4 bg-cfd-yellow/10 border border-cfd-yellow/20 rounded-xl">
            <p className="text-sm text-txt-secondary leading-relaxed">
              <strong className="text-cfd-yellow">In parole semplici:</strong> scoprirai esattamente quanti watt della tua potenza vengono "rubati" dall'aria, e qual è la percentuale reale sulla resistenza totale che incontri in sella.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-txt-secondary max-w-[800px] mx-auto text-center leading-relaxed">
        Questa visualizzazione mostra il flusso d'aria attorno alla tua geometria specifica. Le zone colorate indicano dove l'aria scorre liscia e dove crea vortici che ti rallentano.
      </p>
    </div>
  )
}

/* ==================== PRESSURE SCENARIO ==================== */
function ScenarioPressure() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
        {/* Video Panel */}
        <div>
          <VideoReveal
            src="/videos/pressure-field_54kmh.mp4"
            ariaLabel="Campo di pressione attorno al ciclista in simulazione CFD"
            className="border border-cfd-red/10 hover:border-cfd-red/30 transition-all duration-500"
          />
          <p className="text-txt-tertiary text-xs mt-4 tracking-wide">
            Mappa di pressione — le zone rosse indicano dove l'aria colpisce con più forza
          </p>
        </div>

        {/* Data Panel */}
        <div className="bg-bg-tertiary rounded-2xl p-6 lg:p-8 border border-white/[0.06] shadow-glow relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, #F97316, #DC2626)' }}
          />
          <p className="text-cfd-orange text-xs font-medium tracking-[0.2em] uppercase mb-2">
            ANALISI DELLA PRESSIONE
          </p>
          <h3 className="font-heading text-2xl font-bold text-txt-primary mb-6">
            Dove l'aria colpisce di più
          </h3>

          <div className="space-y-4">
            <PressureZone 
              color="#DC2626" 
              label="Frontale" 
              parts="casco, petto, manubrio" 
              desc="Pressione massima — tipicamente il 35-45% della resistenza totale. Qui si decide la maggior parte del drag." 
            />
            <PressureZone 
              color="#EAB308" 
              label="Laterale" 
              parts="spalle, braccia, fianchi" 
              desc="Pressione media — il flusso laterale contribuisce in modo significativo, specialmente con vento laterale." 
            />
            <PressureZone 
              color="#1E3A8A" 
              label="Posteriore" 
              parts="schiena, glutei, zona sella" 
              desc="Zona di scia — bassa pressione ma grande area. Una posizione compatta riduce drasticamente il drag qui." 
            />
          </div>

          <div className="mt-6 p-4 bg-cfd-orange/10 border border-cfd-orange/20 rounded-xl">
            <p className="text-sm text-txt-secondary leading-relaxed">
              <strong className="text-cfd-orange">Il vantaggio della simulazione:</strong> mentre in galleria del vento vedi solo il numero finale, qui vediamo esattamente quale parte del tuo corpo o della bici genera più resistenza. Puoi decidere con cognizione di causa dove intervenire.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-txt-secondary max-w-[800px] mx-auto text-center leading-relaxed">
        La mappa di pressione rivela i punti critici del tuo setup. Un casco diverso, un manubrio più basso o una posizione più compatta possono spostare drasticamente queste zone.
      </p>
    </div>
  )
}

/* ==================== COMPARE SCENARIO ==================== */
function ScenarioCompare() {
  return (
    <div className="max-w-[800px] mx-auto space-y-10">
      <div className="bg-bg-tertiary rounded-2xl border border-white/[0.06] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cfd-cyan/10">
              <th className="text-left px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-cyan">
                Cosa confrontiamo
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-cyan">
                Configurazione A
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-orange">
                Configurazione B
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/[0.06]">
              <td className="px-6 py-4 text-txt-primary text-sm">Setup testato</td>
              <td className="px-6 py-4 text-center text-txt-secondary text-sm">La tua configurazione attuale</td>
              <td className="px-6 py-4 text-center text-txt-secondary text-sm">Nuova bici / casco / posizione</td>
            </tr>
            <tr className="border-t border-white