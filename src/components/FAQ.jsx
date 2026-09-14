import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import { faq } from '../data/faq.js'
import { EASE } from '../lib/motion.js'

export default function FAQ() {
  const [abierta, setAbierta] = useState(0)
  const reduced = useReducedMotion()

  return (
    <section id="preguntas" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal
            as="h2"
            className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] text-ink"
          >
            Lo que todos preguntan antes de decidir
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-5 leading-relaxed text-slate">
            Son las seis dudas que detienen la compra en piso. Si después de
            leerlas te queda una más, tu distribuidor la responde en la prueba
            de manejo.
          </Reveal>
        </div>

        <ul className="divide-y divide-mist-soft border-y border-mist-soft">
          {faq.map((item, i) => {
            const activa = abierta === i
            return (
              <li key={item.p}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierta(activa ? -1 : i)}
                    aria-expanded={activa}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-lg font-semibold transition-colors duration-300 sm:text-xl ${
                        activa ? 'text-ink' : 'text-ink/75'
                      }`}
                    >
                      {item.p}
                    </span>
                    <motion.span
                      animate={{ rotate: activa ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: EASE.outExpo }}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        activa ? 'border-transparent bg-volt text-ink' : 'border-mist-soft text-slate'
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {activa && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE.outExpo }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 leading-relaxed text-slate">{item.r}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
