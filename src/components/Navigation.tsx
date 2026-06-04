import { useEffect, useState } from 'react'
import { useScrollSpy } from '@/hooks/useScrollSpy'

const navLinks = [
  { id: 'intro', label: 'Di cosa si tratta' },
  { id: 'scenarios', label: 'Simulazioni' },
  { id: 'insights', label: 'Scopri di più' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(['hero', 'intro', 'method', 'scenarios', 'pressure', 'insights', 'partners', 'contact'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/images/logo-fes.png" alt="FES" className="h-8 w-auto brightness-0 invert" />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-300 ${
                activeSection === link.id
                  ? 'text-cfd-cyan bg-cfd-cyan/10'
                  : 'text-txt-secondary hover:text-txt-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 text-xs font-medium tracking-widest uppercase rounded-full bg-cfd-cyan text-bg-primary hover:shadow-glow-strong transition-all duration-300"
        >
          Contattaci
        </a>
      </nav>
    </header>
  )
}
