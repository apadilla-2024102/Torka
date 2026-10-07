import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useIntro } from './IntroContexto.jsx'
import { CURVA } from '../../lib/movimiento.js'
import { rutaRender } from '../brand/ModeloImagen.jsx'

const SEGMENTOS = 10
const MINIMO_MS = 1600 // aunque todo llegue antes: la carga se tiene que poder ver
const MAXIMO_MS = 4500 // con conexión lenta, nunca se queda esperando de más

/**
 * Pantalla de carga: una batería que se carga de 0 a 100 %.
 *
 * El porcentaje sigue la carga real de lo que la portada necesita para
 * verse bien (tipografía e imagen principal), suavizado para que no salte.
 * Al llegar a 100, la cortina se abre hacia arriba y la portada arranca su
 * propia animación de entrada.
 *
 * Solo aparece en la primera visita de la sesión. Con "reducir
 * movimiento" se resuelve con un fundido corto.
 */
export default function PantallaCarga() {
  const { lista, terminar } = useIntro()
  const reduced = useReducedMotion()
  const [porcentaje, setPorcentaje] = useState(0)
  const real = useRef(0)

  useEffect(() => {
    if (lista) return
    const inicio = performance.now()
    let cancelado = false

    // Lo que cuenta como "cargado": tipografías e imagen de la portada.
    const tareas = [
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolver) => {
        const img = new Image()
        img.onload = img.onerror = resolver
        img.src = rutaRender('sport', 'rojo')
      }),
      new Promise((resolver) => (document.readyState === 'complete' ? resolver() : window.addEventListener('load', resolver, { once: true }))),
    ]
    tareas.forEach((t) => t.then(() => (real.current += 1 / tareas.length)))

    // El número avanza hacia la carga real, pero nunca más rápido que el
    // mínimo ni más lento que el máximo.
    let marco
    const avanzar = (ahora) => {
      if (cancelado) return
      const t = ahora - inicio
      const porTiempo = Math.min(t / MINIMO_MS, 1)
      const tope = t > MAXIMO_MS ? 1 : real.current
      const objetivo = Math.min(porTiempo, Math.max(tope, porTiempo * 0.85)) * 100
      // Paso mínimo de 1: con redondeo puro, el número se atoraría a unos
      // puntos del 100 (96 + 0.48 redondea otra vez a 96).
      setPorcentaje((p) => (p >= objetivo ? p : Math.min(100, p + Math.max(1, Math.round((objetivo - p) * 0.12)))))
      marco = requestAnimationFrame(avanzar)
    }
    marco = requestAnimationFrame(avanzar)
    return () => {
      cancelado = true
      cancelAnimationFrame(marco)
    }
  }, [lista])

  // Al llegar a 100, una pausa breve y se abre la cortina.
  useEffect(() => {
    if (lista || porcentaje < 100) return
    const espera = setTimeout(terminar, reduced ? 100 : 350)
    return () => clearTimeout(espera)
  }, [porcentaje, lista, reduced, terminar])

  const llenos = Math.round((porcentaje / 100) * SEGMENTOS)

  return (
    <AnimatePresence>
      {!lista && (
        <motion.div
          key="carga"
          role="status"
          aria-live="polite"
          aria-label={`Cargando TORKA, ${porcentaje} por ciento`}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-black px-5 py-6 text-papel sm:px-10 sm:py-8"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={reduced ? { opacity: 0, transition: { duration: 0.3 } } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: CURVA.expo } }}
        >
          <div className="flex items-center justify-between text-sm text-niebla">
            <span className="tipo-ruta text-lg text-papel italic">TORKA</span>
            <span>Motos eléctricas para Guatemala</span>
          </div>

          <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
            {/* Batería: diez celdas que se encienden en amarillo de carril */}
            <div className="flex w-full items-center gap-2" aria-hidden="true">
              <div className="flex h-24 flex-1 gap-1.5 rounded-2xl border-2 border-papel/80 p-2 sm:h-32">
                {Array.from({ length: SEGMENTOS }, (_, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 rounded-md bg-senal"
                    initial={false}
                    animate={{ opacity: i < llenos ? 1 : 0.08, scaleY: i < llenos ? 1 : 0.86 }}
                    transition={{ duration: 0.25, ease: CURVA.entrar }}
                  />
                ))}
              </div>
              <span className="h-10 w-3 rounded-r-md bg-papel/80 sm:h-12" />
            </div>

            <p className="tipo-tablero mt-8 text-[clamp(4rem,16vw,10rem)] leading-none" aria-hidden="true">
              {porcentaje}
              <span className="text-[0.4em] text-niebla">%</span>
            </p>
          </div>

          <p className="text-center text-sm text-niebla sm:text-left" aria-hidden="true">
            {porcentaje < 100 ? 'Cargando la batería' : 'Lista para salir'}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
