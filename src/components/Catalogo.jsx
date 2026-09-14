import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import ModeloCard from './ModeloCard.jsx'
import Reveal from './Reveal.jsx'
import { filtros, modelos } from '../data/modelos.js'
import { EASE } from '../lib/motion.js'

export default function Catalogo() {
  const [activo, setActivo] = useState('todos')

  const visibles = useMemo(
    () => (activo === 'todos' ? modelos : modelos.filter((m) => m.perfil === activo)),
    [activo],
  )

  return (
    <section id="gama" className="scroll-mt-24 bg-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal
              as="p"
              className="mb-4 font-display text-sm font-semibold tracking-widest text-brand-deep uppercase"
            >
              La gama
            </Reveal>
            <Reveal
              as="h2"
              delay={0.08}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] text-ink"
            >
              Cuatro motos, cuatro usos distintos
            </Reveal>
            <Reveal as="p" delay={0.16} className="mt-5 text-lg leading-relaxed text-slate">
              Elegir mal aquí es el error más caro. Filtra por cómo vas a usarla,
              no por cuál se ve mejor.
            </Reveal>
          </div>

          {/* Filtros con indicador deslizante compartido */}
          <LayoutGroup id="filtros">
            <Reveal delay={0.2} className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar gama">
              {filtros.map((f) => {
                const seleccionado = activo === f.id
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={seleccionado}
                    onClick={() => setActivo(f.id)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      seleccionado ? 'text-mist' : 'text-slate hover:text-ink'
                    }`}
                  >
                    {seleccionado && (
                      <motion.span
                        layoutId="filtro-activo"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ duration: 0.4, ease: EASE.outExpo }}
                      />
                    )}
                    <span className="relative">{f.label}</span>
                  </button>
                )
              })}
            </Reveal>
          </LayoutGroup>
        </div>

        <LayoutGroup id="gama">
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visibles.map((m, i) => (
                <ModeloCard key={m.id} modelo={m} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {visibles.length === 0 && (
          <p className="py-16 text-center text-slate">
            No hay modelos en esta categoría todavía.
          </p>
        )}
      </div>
    </section>
  )
}
