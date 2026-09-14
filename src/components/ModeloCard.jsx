import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion.js'

const money = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export default function ModeloCard({ modelo, index }) {
  const reduced = useReducedMotion()
  const { nombre, tagline, precio, destacado, resumen, specs, puntos } = modelo

  return (
    <motion.article
      layout
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.55, ease: EASE.outExpo, delay: index * 0.06 }}
      whileHover={reduced ? {} : { y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-mist-soft bg-white transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(12,12,14,0.26)]"
    >
      {/* Zona de imagen */}
      <div className="relative aspect-[4/3] overflow-hidden border-b border-mist-soft bg-mist-soft/60">
        <div className="bg-grid absolute inset-0 opacity-[0.07]" aria-hidden="true" />

        {destacado && (
          <span className="absolute left-5 top-5 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-bright uppercase">
            {destacado}
          </span>
        )}

        {/* Sustituye por: <img src={`/modelos/${modelo.id}.png`} alt={`TORKA ${nombre}`} className="..." /> */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          whileHover={reduced ? {} : { scale: 1.06 }}
          transition={{ duration: 0.7, ease: EASE.outExpo }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-10 w-10 text-slate/35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4 17 5-5 4 4 3-2 4 3" />
          </svg>
          <span className="mt-2 text-xs font-medium text-slate/60">
            Foto de TORKA {nombre}
          </span>
        </motion.div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-7">
        <header>
          <h3 className="font-display text-2xl font-bold text-ink">
            TORKA <span className="text-brand-deep">{nombre}</span>
          </h3>
          <p className="mt-1.5 text-sm leading-snug text-slate">{tagline}</p>
        </header>

        <p className="mt-5 text-sm leading-relaxed text-ink/70">{resumen}</p>

        {/* Especificaciones que deciden la compra */}
        <dl className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-mist p-4">
          {[
            { k: 'Autonomía', v: specs.autonomia, u: 'km' },
            { k: 'Velocidad', v: specs.velocidad, u: 'km/h' },
            { k: 'Carga', v: specs.carga, u: 'h' },
          ].map((s) => (
            <div key={s.k}>
              <dt className="text-[11px] font-medium tracking-wide text-slate uppercase">{s.k}</dt>
              <dd className="tabular mt-1 font-display text-xl font-bold text-ink">
                {s.v}
                <span className="ml-0.5 text-xs font-medium text-slate">{s.u}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 mb-7 space-y-2.5">
          {puntos.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-ink/75">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-deep" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <footer className="mt-auto flex items-end justify-between gap-4 border-t border-mist-soft pt-6">
          <div>
            <span className="block text-[11px] font-medium tracking-wide text-slate uppercase">
              Desde
            </span>
            <span className="tabular font-display text-2xl font-bold text-ink">
              {money.format(precio)}
            </span>
          </div>
          <a
            href="#distribuidores"
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-mist transition-colors duration-300 hover:bg-brand hover:text-mist"
          >
            Cotizar
            <span
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </footer>
      </div>
    </motion.article>
  )
}
