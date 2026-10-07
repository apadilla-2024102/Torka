import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Boton from '../../../shared/components/ui/Boton.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import { formatoQuetzales } from '../../../shared/lib/formato.js'
import { CURVA, DURACION, escalonar, lineaMascara, subir } from '../../../shared/lib/movimiento.js'
import CalleComparativa from './CalleComparativa.jsx'

const LINEAS = ['Deja la gasolinera', 'en el retrovisor.']

/**
 * Portada. La escena de entrada es una sola secuencia orquestada:
 *
 *   0.0 s  el titular sube línea por línea desde detrás de una máscara
 *   0.3 s  la moto entra rodando desde la izquierda y frena con un leve
 *          asentamiento (muelle con poca sobreoscilación: frenada, no rebote)
 *   0.7 s  texto y botones
 *   1.0 s  los dos carriles arrancan la comparativa
 *
 * Al hacer scroll, la moto se adelanta (parallax atado al scroll: sin
 * curva ni duración, la mano del usuario es el reloj).
 */
export default function Hero({ precioDesde, totalModelos, modeloPortada }) {
  const seccion = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end start'] })
  const adelante = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])

  return (
    <section ref={seccion} className="overflow-hidden bg-asfalto pt-32 pb-16 text-papel sm:pt-40 sm:pb-24">
      <Contenedor>
        <motion.div
          initial="oculto"
          animate="visible"
          variants={escalonar(0, 0.12)}
          className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]"
        >
          <div>
            <h1 className="tipo-ruta text-[clamp(2.6rem,7vw,5.25rem)]">
              {LINEAS.map((linea) => (
                <span key={linea} className="block overflow-hidden pb-[0.08em]">
                  <motion.span variants={lineaMascara} className="block">
                    {linea}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p variants={subir} className="mt-6 max-w-xl text-lg text-niebla sm:text-xl">
              Motos eléctricas con batería que subes a tu casa y cargas en un contacto normal.{' '}
              {totalModelos} modelos desde {formatoQuetzales(precioDesde)}.
            </motion.p>
            <motion.div variants={subir} className="mt-9 flex flex-wrap gap-3">
              <Boton to="/modelos">Ver los modelos</Boton>
              <Boton to="/cotizar" variante="secundario" sobreOscuro>
                Agendar prueba de manejo
              </Boton>
            </motion.div>
          </div>

          {modeloPortada && (
            <motion.div style={reduced ? undefined : { x: adelante }} className="relative">
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: '-55%' }}
                animate={{ opacity: 1, x: '0%' }}
                transition={
                  reduced
                    ? { duration: 0.3 }
                    : {
                        x: { type: 'spring', stiffness: 70, damping: 15, mass: 1, delay: 0.3 },
                        opacity: { duration: 0.35, delay: 0.3 },
                      }
                }
              >
                <ModeloImagen
                  modelo={modeloPortada}
                  transicion={false}
                  prioridad
                  className="aspect-[44/27] w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
                />
              </motion.div>
              {/* Estela de velocidad: aparece mientras la moto entra y se disuelve al frenar. */}
              {!reduced && (
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[38%] left-[-10%] h-[22%] w-[60%] rounded-full bg-gradient-to-r from-transparent via-rojo/25 to-transparent blur-xl"
                  initial={{ opacity: 0, x: '-40%' }}
                  animate={{ opacity: [0, 1, 0], x: ['-40%', '10%', '20%'] }}
                  transition={{ duration: DURACION.escena, ease: CURVA.expo, delay: 0.3, times: [0, 0.35, 1] }}
                />
              )}
            </motion.div>
          )}
        </motion.div>

        <div className="mt-16 sm:mt-20">
          <CalleComparativa />
        </div>
      </Contenedor>
    </section>
  )
}
