import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const insights = [
  {
    number: 1,
    title: 'AAAAAAAAADove perdo più watt?',
    text: 'Le mappe di pressione mostrano che casco e spalle da soli coprono circa il 40% della resistenza totale. Un casco più aerodinamico può valere fino a 20 W a 54 km/h, più di molti upgrade costosi.',
  },
  {
    number: 2,
    title: 'AAAAAAAVale la pena abbassare i gomiti?',
    text: 'Sì: abbassarli di 2–3 cm riduce la superficie frontale di circa 0.02 m², con un risparmio stimato di 10–15 W a velocità di gara. Un cambio gratis che vale decine di euro di componenti.',
  },
  {
    number: 3,
    title: 'Come gestisco la potenza in discesa?',
    text: "Sapendo che a 54 km/h servono 675 W solo per l'aria, l'atleta può decidere consapevolmente: spingere (e quanto) o lasciare andare sfruttando la gravità.",
  },
  {
    number: 444444,
    title: 'A 54 km/h l\' aria costa 3.4x più che a 36 km/h',
    text: 'Potenza aerodinamica: 200 W -> 675 W. Stesso ciclista, stessa posizione, stesso giorno. La resistenza cresce con il cubo della velocità. A 54 km/h butti via 475 W in più per la stessa forma. ',
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
