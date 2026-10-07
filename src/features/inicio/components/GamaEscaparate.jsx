import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Lectura from '../../../shared/components/ui/Lectura.jsx'
import { formatoQuetzales } from '../../../shared/lib/formato.js'
import { CURVA } from '../../../shared/lib/movimiento.js'

/**
 * Escaparate de la gama (técnica "sticky column journey" de epic-design).
 *
 * En escritorio, la moto se queda fija a la izquierda mientras el texto de
 * cada modelo pasa a la derecha. Al llegar a un modelo nuevo, la moto
 * anterior sigue de largo hacia la derecha y la nueva entra rodando desde
 * la izquierda, como motos que pasan frente a una vitrina.
 *
 * En celular no hay columna fija: cada modelo lleva su propia imagen.
 */
export default function GamaEscaparate({ modelos }) {
  const [activo, setActivo] = useState(modelos[0]?.id)
  const reduced = useReducedMotion()
  const modeloActivo = modelos.find((m) => m.id === activo) ?? modelos[0]

  return (
    <section aria-labelledby="gama-titulo" className="relative bg-papel py-24 sm:py-32">
      <Contenedor>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="gama-titulo" className="tipo-ruta max-w-2xl text-[clamp(2.2rem,5.5vw,4rem)]">
            Una moto para cada recorrido
          </h2>
          <Link to="/comparar" viewTransition className="shrink-0 font-semibold underline underline-offset-4">
            Compararlas lado a lado
          </Link>
        </div>

        <div className="mt-14 lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* Vitrina fija (solo escritorio) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 flex h-[calc(100vh-8rem)] items-center">
              <div className="relative w-full">
                {/* Halo del color del modelo activo */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-[8%] rounded-full blur-3xl"
                  animate={{ backgroundColor: modeloActivo.colores[0].hex, opacity: 0.28 }}
                  transition={{ duration: 0.6 }}
                />
                <p
                  aria-hidden="true"
                  className="tipo-ruta pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(5rem,11vw,10rem)] leading-none text-transparent select-none [-webkit-text-stroke:1.5px_rgba(31,32,36,0.12)]"
                >
                  {modeloActivo.nombre}
                </p>
                <div className="relative aspect-[44/27] overflow-hidden">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={modeloActivo.id}
                      className="absolute inset-0"
                      initial={reduced ? { opacity: 0 } : { x: '-70%', opacity: 0 }}
                      animate={{ x: '0%', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { x: '70%', opacity: 0 }}
                      transition={{ duration: 0.7, ease: CURVA.expo }}
                    >
                      <ModeloImagen modelo={modeloActivo} transicion={false} className="h-full w-full" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Capítulos: uno por modelo */}
          <ol className="space-y-16 lg:space-y-0">
            {modelos.map((m, i) => (
              <Capitulo key={m.id} modelo={m} indice={i} total={modelos.length} onActivo={setActivo} />
            ))}
          </ol>
        </div>
      </Contenedor>
    </section>
  )
}

function Capitulo({ modelo, indice, total, onActivo }) {
  const ref = useRef(null)
  // Se activa cuando el capítulo ocupa la franja central de la pantalla.
  const enCentro = useInView(ref, { margin: '-45% 0px -45% 0px' })
  useEffect(() => {
    if (enCentro) onActivo(modelo.id)
  }, [enCentro, modelo.id, onActivo])

  return (
    <li ref={ref} className="flex flex-col justify-center lg:min-h-[85vh]">
      <div className="mb-6 lg:hidden">
        <ModeloImagen modelo={modelo} className="aspect-[44/27] w-full" />
      </div>
      <p className="tipo-tablero text-grafito">
        {String(indice + 1).padStart(2, '0')} de {String(total).padStart(2, '0')} · {modelo.perfilLabel}
      </p>
      <h3 className="tipo-ruta mt-2 text-[clamp(2.6rem,5vw,4.2rem)]">{modelo.nombre}</h3>
      <p className="mt-3 max-w-md text-lg text-grafito">{modelo.tagline}</p>

      <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
        <Lectura etiqueta="Autonomía" valor={modelo.specs.autonomia} unidad="km" energia />
        <Lectura etiqueta="Velocidad" valor={modelo.specs.velocidad} unidad="km/h" />
        <Lectura etiqueta="Carga" valor={modelo.specs.carga} unidad="h" energia />
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <span className="tipo-tablero text-3xl">{formatoQuetzales(modelo.precio)}</span>
        <Link
          to={`/modelos/${modelo.id}`}
          viewTransition
          className="inline-flex min-h-12 items-center rounded-full bg-asfalto px-6 font-semibold text-papel transition-[background-color] duration-200 hover:bg-rojo"
        >
          Ver la {modelo.nombre}
        </Link>
      </div>
    </li>
  )
}
