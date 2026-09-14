import { motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import { EASE, inViewOnce, riseIn, stagger } from '../lib/motion.js'

const razones = [
  {
    n: '01',
    titulo: 'Ocho veces más barata de mover',
    texto:
      'Cerca de 20 centavos por kilómetro en energía contra los casi 70 de una moto de gasolina de 150 cc. En 15,000 km al año la diferencia paga buena parte de la moto.',
    icono: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 3 4 14h7l-1 8 9-11h-7l1-8Z" />
    ),
  },
  {
    n: '02',
    titulo: 'La batería sube contigo',
    texto:
      'Se desmonta con llave, pesa 11 kg y se carga en cualquier contacto de 127 V. No necesitas cochera, ni instalación eléctrica especial, ni pelearte con el vecino por el enchufe.',
    icono: (
      <>
        <rect x="3" y="7" width="15" height="10" rx="2" strokeLinejoin="round" />
        <path strokeLinecap="round" d="M21 10.5v3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m10 9.5-2 3h3l-2 3" />
      </>
    ),
  },
  {
    n: '03',
    titulo: 'No hay nada que afinar',
    texto:
      'Sin aceite, sin filtros, sin bujías, sin clutch. El mantenimiento se reduce a frenos, llantas y suspensión. Menos taller significa más días con la moto trabajando.',
    icono: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4a4 4 0 0 0 5 5l4 4a2 2 0 0 1-3 3l-4-4a4 4 0 0 0-5-5L5 4a2 2 0 0 0-3 3l4 4"
      />
    ),
  },
  {
    n: '04',
    titulo: 'Respaldo que puedes verificar',
    texto:
      'Dos años en motor y estructura, tres en batería, y existencia de refacciones garantizada por siete años. El riesgo real de una marca nueva no es la moto: es quedarte sin repuesto.',
    icono: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Zm-2.5 9 2 2 4-4"
      />
    ),
  },
]

export default function Propuesta() {
  const reduced = useReducedMotion()

  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-16 max-w-2xl">
          <Reveal as="p" className="mb-4 font-display text-sm font-semibold tracking-widest text-volt uppercase">
            Por qué eléctrica
          </Reveal>
          <Reveal
            as="h2"
            delay={0.08}
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] text-mist"
          >
            Cuatro razones que aguantan una hoja de cálculo
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-5 text-lg leading-relaxed text-mist/60">
            No vendemos la moto por moderna. La vendemos porque el número sale, y
            porque las tres dudas que te frenan tienen respuesta concreta.
          </Reveal>
        </div>

        <motion.ul
          variants={stagger(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid gap-4 sm:grid-cols-2"
        >
          {razones.map((r) => (
            <motion.li
              key={r.n}
              variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : riseIn}
              whileHover={reduced ? {} : { y: -6 }}
              transition={{ duration: 0.35, ease: EASE.outExpo }}
              className="group relative overflow-hidden rounded-2xl border border-ink-line bg-ink-soft/50 p-8 transition-colors duration-500 hover:border-volt/35"
            >
              {/* Resplandor que sigue al hover, sutil */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-volt/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="relative flex items-start justify-between gap-6">
                <svg
                  viewBox="0 0 24 24"
                  className="h-8 w-8 shrink-0 text-volt"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  {r.icono}
                </svg>
                <span className="tabular font-display text-sm font-semibold text-mist/25">{r.n}</span>
              </div>

              <h3 className="relative mt-7 font-display text-2xl font-semibold text-mist">
                {r.titulo}
              </h3>
              <p className="relative mt-3 leading-relaxed text-mist/55">{r.texto}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
