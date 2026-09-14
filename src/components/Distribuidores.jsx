import { motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import SplitText from './SplitText.jsx'
import { EASE, inViewOnce, riseIn, stagger } from '../lib/motion.js'

/** DATOS DE EJEMPLO: sustituye por tu red real de distribuidores. */
const puntos = [
  { ciudad: 'Ciudad de Guatemala', zona: 'Zona 10', tel: '2200 0000' },
  { ciudad: 'Quetzaltenango', zona: 'Zona 3', tel: '7700 0000' },
  { ciudad: 'Escuintla', zona: 'Centro', tel: '7880 0000' },
  { ciudad: 'Cobán', zona: 'Zona 1', tel: '7950 0000' },
]

export default function Distribuidores() {
  const reduced = useReducedMotion()

  return (
    <section id="distribuidores" className="scroll-mt-24 border-t border-ink-line bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <Reveal as="p" className="mb-4 font-display text-sm font-semibold tracking-widest text-brand-bright uppercase">
            Dónde probarla
          </Reveal>
          <SplitText
              as="h2"
              texto="Ninguna moto se compra por una página web"
              retraso={0.08}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] text-mist"
            />
          <Reveal as="p" delay={0.16} className="mt-5 text-lg leading-relaxed text-mist/60">
            Súbete, acelera y siente el par. Te vas a dar cuenta en los primeros
            veinte metros. Agenda una prueba en el punto que te quede cerca.
          </Reveal>
        </div>

        <motion.ul
          variants={stagger(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inViewOnce}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {puntos.map((p) => (
            <motion.li
              key={p.ciudad}
              variants={reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : riseIn}
              whileHover={reduced ? {} : { y: -6 }}
              transition={{ duration: 0.35, ease: EASE.outExpo }}
              className="group rounded-2xl border border-ink-line bg-ink-soft/50 p-7 transition-colors duration-500 hover:border-brand/35"
            >
              <span className="font-display text-xl font-semibold text-mist">{p.ciudad}</span>
              <span className="mt-1 block text-sm text-mist/50">{p.zona}</span>
              <a
                href={`tel:${p.tel.replace(/\s/g, '')}`}
                className="tabular mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-bright transition-colors hover:text-brand-deep"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.5 5.5c0 8 6 14 14 14l2.5-3.5-4-2.5-2 2a12 12 0 0 1-6.5-6.5l2-2L6 3 2.5 5.5Z"
                  />
                </svg>
                {p.tel}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal
          delay={0.15}
          className="mt-14 flex flex-col items-start gap-6 rounded-3xl border border-brand/25 bg-gradient-to-br from-ink-soft to-ink p-9 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-display text-2xl font-semibold text-mist">
              ¿Compras para flotilla?
            </p>
            <p className="mt-2 max-w-xl leading-relaxed text-mist/55">
              A partir de cinco unidades cambian el precio, las condiciones de
              servicio y el esquema de refacciones. Esa conversación no va por aquí.
            </p>
          </div>
          <a
            href="mailto:ventas@torka.gt"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-mist transition-all duration-300 hover:bg-brand-deep hover:shadow-[0_0_40px_-6px] hover:shadow-brand/50"
          >
            Hablar con ventas
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
