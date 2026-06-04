export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-txt-tertiary tracking-wide">
          &copy; 2024 FES — Functional Engineering System. Tutti i diritti riservati.
        </p>
        <p className="text-xs text-txt-tertiary tracking-wide">
          CFD Analysis · OpenFOAM · HPC CINECA
        </p>
      </div>
    </footer>
  )
}
