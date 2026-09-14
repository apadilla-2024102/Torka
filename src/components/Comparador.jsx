import { motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import { modelos, specsMeta } from '../data/modelos.js'
import { EASE, inViewOnce } from '../lib/motion.js'

const money = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

/** Marca cuál modelo gana en cada especificación numérica. */
function mejorEn(key, mejor) {
  if (!mejor) return null
  const valores = modelos.map((m) => m.specs[key]).filter((v) => typeof v === 'number')
  if (valores.length === 0) return null
  return mejor === 'alto' ? Math.max(...valores) : Math.min(...valores)
}

export default function Comparador() {
  const reduced = useReducedMotion()

  return (
    <section id="comparar" className="scroll-mt-24 bg-mist pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <Reveal
            as="h2"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-ink"
          >
            Compara lado a lado
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-4 leading-relaxed text-slate">
            Resaltado en verde, el mejor dato de cada fila. Ojo: el mejor número
            no siempre es la mejor compra — más autonomía de la que necesitas es
            dinero inmovilizado en batería.
          </Reveal>
        </div>

        <Reveal className="overflow-x-auto rounded-3xl border border-mist-soft bg-white">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">
              Comparativa de especificaciones entre los modelos de la gama TORKA
            </caption>
            <thead>
              <tr className="border-b border-mist-soft">
                <th scope="col" className="p-5 text-xs font-semibold tracking-wide text-slate uppercase">
                  Especificación
                </th>
                {modelos.map((m) => (
                  <th key={m.id} scope="col" className="p-5">
                    <span className="block font-display text-lg font-bold text-ink">{m.nombre}</span>
                    <span className="mt-0.5 block text-xs font-medium text-slate">{m.perfilLabel}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specsMeta.map((s, fila) => {
                const ganador = mejorEn(s.key, s.mejor)
                return (
                  <motion.tr
                    key={s.key}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={inViewOnce}
                    transition={{ duration: 0.45, ease: EASE.outExpo, delay: fila * 0.05 }}
                    className="border-b border-mist-soft/70 last:border-0"
                  >
                    <th
                      scope="row"
                      className="p-5 text-sm font-medium text-slate"
                    >
                      {s.label}
                    </th>
                    {modelos.map((m) => {
                      const v = m.specs[s.key]
                      const esGanador = ganador !== null && v === ganador
                      return (
                        <td key={m.id} className="p-5">
                          <span
                            className={`tabular inline-flex items-center gap-1.5 rounded-lg px-2 py-1 font-display text-base font-semibold ${
                              esGanador ? 'bg-brand/25 text-ink' : 'text-ink/75'
                            }`}
                          >
                            {v}
                            {s.unidad && <span className="text-xs font-medium text-slate">{s.unidad}</span>}
                          </span>
                        </td>
                      )
                    })}
                  </motion.tr>
                )
              })}

              <tr className="bg-mist/60">
                <th scope="row" className="p-5 text-sm font-semibold text-ink">
                  Precio desde
                </th>
                {modelos.map((m) => (
                  <td key={m.id} className="tabular p-5 font-display text-lg font-bold text-ink">
                    {money.format(m.precio)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>

        <Reveal as="p" delay={0.1} className="mt-5 text-sm text-slate">
          Precios de lista sugeridos, sin incluir emplacamiento ni seguro. Consulta
          disponibilidad y promociones vigentes con tu distribuidor.
        </Reveal>
      </div>
    </section>
  )
}
