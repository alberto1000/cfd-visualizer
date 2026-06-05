import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const insights = [
  {
    number: 1,
    title: 'Dove perdo più watt?',
    text: 'Le mappe di pressione mostrano che casco e spalle da soli coprono tipicamente il 35-45% della resistenza totale. Un casco più aerodinamico o una posizione più compatta possono valere fino a 15-25 W a velocità di gara — più di molti upgrade costosi.',
  },
  {
    number: 2,
    title: 'Vale la pena abbassare i gomiti?',
    text: 'Sì: abbassarli di 2–3 cm riduce la superficie frontale di circa 0.02 m², con un risparmio stimato di 10–15 W a velocità di gara. Un cambio gratuito che vale decine di euro di componenti. La simulazione ti dice esattamente quanto risparmieresti nella tua posizione specifica.',
  },
  {
    number: 3,
    title: 'Come gestisco la potenza in discesa?',
    text: "Sapendo esattamente quanti watt servono per l'aria alla tua velocità massima, puoi decidere consapevolmente: spingere (e quanto) o lasciare andare sfruttando la gravità. Nessuna sensazione, solo numeri.",
  },
  {
    number: 4,
    title: 'La resistenza cresce con il cubo della velocità',
    text: 'Aumentare la velocità del 50% non significa aumentare la resistenza del 50%: significa triplicarla (o peggio). Questo è il motivo per cui l'aerodinamica diventa cruciale sopra i 40 km/h. La simulazione ti mostra esattamente la curva per il tuo corpo e la tua bici.',
  },
]

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="py-[clamp(5rem,10vh,8rem)] bg-bg-primary"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-cfd-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 text-center">
          INSIGHT PRATICI
        </p>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold text-txt-primary leading-tight mb-4 text-center">
          Come usare questi numeri
        </h2>
        <p className="text-txt-secondary text-center max-w-[600px] mx-auto mb-12 leading-relaxed">
          I risultati della simulazione si traducono in scelte concrete, già prima di salire in bici
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group bg-bg-secondary rounded-2xl p-6 border border-white/[0.06] hover:border-cfd-cyan/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-glow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cfd-cyan flex items-center justify-center text-bg-primary font-bold text-sm group-hover:scale-110 transition-transform">
                  {insight.number}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-txt-primary mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-txt-secondary text-sm leading-relaxed">
                    {insight.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}