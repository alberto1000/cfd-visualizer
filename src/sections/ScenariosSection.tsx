import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { VideoReveal } from '@/components/VideoReveal'

gsap.registerPlugin(ScrollTrigger)

type Tab = '36kmh' | '54kmh' | 'compare'

const tabs = [
  { id: '36kmh' as Tab, label: '36 km/h — Ritmo Gara' },
  { id: '54kmh' as Tab, label: '54 km/h — Sprint' },
  { id: 'compare' as Tab, label: '36 vs 54 — Confronto' },
]

export function ScenariosSection() {
  const [activeTab, setActiveTab] = useState<Tab>('36kmh')
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
          {activeTab === '36kmh' && <Scenario36kmh />}
          {activeTab === '54kmh' && <Scenario54kmh />}
          {activeTab === 'compare' && <ScenarioCompare />}
        </div>
      </div>
    </section>
  )
}

/* ==================== 36 KM/H SCENARIO ==================== */
function Scenario36kmh() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
        {/* Video Panel */}
        <div>
          <VideoReveal
            src="/videos/cyclist-54kmh.mp4"
            ariaLabel="Flusso d'aria attorno al ciclista a 36 km/h"
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
              Mappa di velocità del flusso d'aria attorno all'atleta a 36 km/h
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
            DATI A 36 KM/H
          </p>
          <h3 className="font-heading text-2xl font-bold text-txt-primary mb-6">
            Ritmo di Granfondo
          </h3>

          <div className="space-y-0">
            <MetricRow label="Resistenza dell'aria" value={21.6} suffix=" N" note="~ peso di 2 kg" />
            <MetricRow label="Potenza spesa contro l'aria" value={216} suffix=" W" />
            <MetricRow label="Quota resistenza totale" value={73} suffix="%" prefix="~" />
            <MetricRow label="CDA (ingombro aerodinamico)" value={0.352} suffix=" m²" decimals={3} />
          </div>

          <div className="mt-6 p-4 bg-cfd-yellow/10 border border-cfd-yellow/20 rounded-xl">
            <p className="text-sm text-txt-secondary leading-relaxed">
              <strong className="text-cfd-yellow">In parole semplici:</strong> con una potenza media di 280 W, ben 216 W a 36 km/h se ne vanno solo per aprire l'aria davanti a sé. Solo 64 W per tutto il resto.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-txt-secondary max-w-[800px] mx-auto text-center leading-relaxed">
        A questa velocità, circa 7 watt su 10 che eroghi vanno a combattere l'aria. L'attrito delle ruote e il peso incidono pochissimo rispetto all'aerodinamica.
      </p>
    </div>
  )
}

/* ==================== 54 KM/H SCENARIO ==================== */
function Scenario54kmh() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
        {/* Video Panel */}
        <div>
          <VideoReveal
            src="/videos/cyclist-54kmh.mp4"
            ariaLabel="Flusso d'aria attorno al ciclista a 54 km/h"
            className="border border-cfd-orange/10 hover:border-cfd-orange/30 transition-all duration-500"
          />
          <p className="text-txt-tertiary text-xs mt-4 tracking-wide">
            Il flusso d'aria a 54 km/h. Rispetto ai 36, la scia dietro l'atleta è più ampia e turbolenta.
          </p>
        </div>

        {/* Data Panel */}
        <div className="bg-bg-tertiary rounded-2xl p-6 lg:p-8 border border-white/[0.06] shadow-glow relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, #F97316, #DC2626)' }}
          />
          <p className="text-cfd-orange text-xs font-medium tracking-[0.2em] uppercase mb-2">
            DATI A 54 KM/H
          </p>
          <h3 className="font-heading text-2xl font-bold text-txt-primary mb-6">
            Sprint Finale
          </h3>

          <div className="space-y-0">
            <MetricRow label="Resistenza dell'aria" value={45} suffix=" N" note="~ peso di 4.6 kg" />
            <MetricRow label="Potenza spesa contro l'aria" value={675} suffix=" W" />
            <MetricRow label="Quota resistenza totale" value={90} suffix="%" prefix=">" />
            <MetricRow label="CDA (ingombro aerodinamico)" value={0.327} suffix=" m²" decimals={3} />
          </div>

          <div className="mt-6 p-4 bg-cfd-orange/10 border border-cfd-orange/20 rounded-xl">
            <p className="text-sm text-txt-secondary leading-relaxed">
              <strong className="text-cfd-orange">Il CDA è leggermente diminuito</strong> rispetto a 36 km/h: il corpo non cambia, ma ad alta velocità il flusso d'aria si comporta in modo diverso e 'avvolge' meglio alcune zone. Questo effetto è invisibile in strada, ma la simulazione lo cattura con precisione.
            </p>
          </div>
        </div>
      </div>

      <p className="text-lg text-txt-secondary max-w-[800px] mx-auto text-center leading-relaxed">
        Qui la situazione cambia radicalmente. L'aria non è più il problema principale: è l'unico problema. Superata questa velocità, ottimizzare peso o cambio non serve quasi a niente. Conta solo la forma con cui ti presenti al vento.
      </p>
    </div>
  )
}

/* ==================== COMPARE SCENARIO ==================== */
function ScenarioCompare() {
  return (
    <div className="max-w-[800px] mx-auto">
      <div className="bg-bg-tertiary rounded-2xl border border-white/[0.06] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-cfd-cyan/10">
              <th className="text-left px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-cyan">
                Metrica
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-cyan">
                36 km/h
              </th>
              <th className="text-center px-6 py-4 text-xs font-medium tracking-widest uppercase text-cfd-orange">
                54 km/h
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/[0.06]">
              <td className="px-6 py-4 text-txt-primary text-sm">Resistenza dell'aria</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-cyan font-semibold">21.6 N</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-orange font-semibold">45 N</td>
            </tr>
            <tr className="border-t border-white/[0.06] bg-bg-secondary/50">
              <td className="px-6 py-4 text-txt-primary text-sm">Watt spesi per l'aria</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-cyan font-semibold">216 W</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-orange font-semibold">675 W</td>
            </tr>
            <tr className="border-t border-white/[0.06]">
              <td className="px-6 py-4 text-txt-primary text-sm">% sulla resistenza totale</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-cyan font-semibold">~73%</td>
              <td className="px-6 py-4 text-center font-mono text-cfd-orange font-semibold">{`>90%`}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-cfd-red/10 border border-cfd-red/20 rounded-xl">
        <p className="text-txt-secondary leading-relaxed text-center">
          <strong className="text-cfd-red">La regola pratica:</strong> passando da 36 a 54 km/h (velocità aumentata del 50%), la potenza richiesta all'aria passa da 216 W a 675 W: <strong className="text-txt-primary">più del triplo</strong>. Non è possibile pianificare uno sprint o una discesa senza sapere questa cifra in anticipo.
        </p>
      </div>
    </div>
  )
}

/* ==================== SHARED COMPONENTS ==================== */
function MetricRow({
  label,
  value,
  suffix,
  prefix = '',
  note,
  decimals = 1,
}: {
  label: string
  value: number
  suffix: string
  prefix?: string
  note?: string
  decimals?: number
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
      <span className="text-txt-secondary text-sm">{label}</span>
      <div className="text-right">
        <span className="font-mono text-lg font-semibold text-txt-primary">
          {prefix && <span className="text-txt-tertiary">{prefix}</span>}
          <AnimatedCounter target={value} decimals={decimals} />
          <span className="text-txt-tertiary">{suffix}</span>
        </span>
        {note && <span className="block text-txt-tertiary text-xs">{note}</span>}
      </div>
    </div>
  )
}
