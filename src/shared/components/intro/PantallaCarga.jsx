import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useIntro } from './IntroContexto.jsx'
import { CURVA } from '../../lib/movimiento.js'
import Logo, { RUTAS_LOGO } from '../brand/Logo.jsx'
import { useSinMovimiento } from '../../hooks/useMovimiento.js'

// La moto de la portada (InicioPage): se precarga junto con el logo.
const FOTO_PORTADA = '/modelos/fotos/x-grafito.webp'
const MINIMO_MS = 1600 // aunque todo llegue antes: la carga se tiene que poder ver
const MAXIMO_MS = 4500 // con conexión lenta, nunca se queda esperando de más

/**
 * Pantalla de carga: la Y de yolt se llena de lima de 0 a 100 %.
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
  const reduced = useSinMovimiento()
  const [porcentaje, setPorcentaje] = useState(0)
  const real = useRef(0)

  useEffect(() => {
    if (lista) return
    const inicio = performance.now()
    let cancelado = false

    // Lo que cuenta como "cargado": tipografías, logo e imagen de la portada.
    // No se espera el evento "load" de la ventana: Edge y Chrome lo
    // aplazan con conexión lenta o ahorro de datos ("Load events are
    // deferred") y la batería se quedaría esperando.
    const tareas = [
      document.fonts?.ready ?? Promise.resolve(),
      ...[FOTO_PORTADA, RUTAS_LOGO.claro, RUTAS_LOGO.isotipo].map(
        (ruta) =>
          new Promise((resolver) => {
            const img = new Image()
            img.onload = img.onerror = resolver
            img.src = ruta
          }),
      ),
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
    // Red de seguridad: si el navegador frena los cuadros de animación
    // (pestaña en segundo plano, modo ahorro), el sitio se abre igual.
    const rescate = setTimeout(terminar, MAXIMO_MS + 1500)
    return () => {
      cancelado = true
      cancelAnimationFrame(marco)
      clearTimeout(rescate)
    }
  }, [lista, terminar])

  // Al llegar a 100, una pausa breve y se abre la cortina.
  useEffect(() => {
    if (lista || porcentaje < 100) return
    const espera = setTimeout(terminar, reduced ? 100 : 350)
    return () => clearTimeout(espera)
  }, [porcentaje, lista, reduced, terminar])

  return (
    <AnimatePresence>
      {!lista && (
        <motion.div
          key="carga"
          role="status"
          aria-live="polite"
          aria-label={`Cargando yolt, ${porcentaje} por ciento`}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-tinta px-5 py-6 text-lienzo-alto sm:px-10 sm:py-8"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={reduced ? { opacity: 0, transition: { duration: 0.3 } } : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: CURVA.expo } }}
        >
          <div className="flex items-center justify-between text-sm text-tinta-inversa-suave">
            <Logo sobreLienzo={false} />
            <span className="tipo-etiqueta hidden sm:block">Movilidad eléctrica · Guatemala</span>
          </div>

          {/* La Y del logotipo se llena de lima de abajo hacia arriba con la
              carga: sobre una Y apagada, la misma Y recortada por el avance. */}
          <div className="mx-auto flex w-full max-w-md flex-col items-center" aria-hidden="true">
            <div className="relative w-40 sm:w-56">
              <img src={RUTAS_LOGO.isotipo} alt="" className="block w-full opacity-[0.08]" width="851" height="535" />
              <img
                src={RUTAS_LOGO.isotipo}
                alt=""
                className="absolute inset-0 block w-full"
                style={{ clipPath: `inset(${100 - porcentaje}% 0 0 0)` }}
                width="851"
                height="535"
              />
            </div>
          </div>

          <div aria-hidden="true">
            <div className="flex items-end justify-between text-tinta-inversa-suave">
              <span className="tipo-etiqueta">{porcentaje < 100 ? 'Encendiendo' : 'Enciende tu camino'}</span>
              <span className="tipo-tablero text-3xl text-lienzo-alto sm:text-4xl">
                {String(porcentaje).padStart(3, '0')}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-filete-inverso">
              <div className="h-px origin-left bg-lima" style={{ transform: `scaleX(${porcentaje / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
