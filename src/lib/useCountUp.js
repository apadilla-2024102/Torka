import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Anima un número desde su valor anterior hasta el nuevo.
 *
 * Un contador que sube comunica magnitud mejor que el número puesto de golpe:
 * el ojo sigue el recorrido y percibe la escala. Con movimiento reducido
 * salta al valor final, sin animación.
 */
export function useCountUp(valor, duracion = 900) {
  const reduced = useReducedMotion()
  const [mostrado, setMostrado] = useState(valor)
  const desde = useRef(valor)
  const raf = useRef(0)

  useEffect(() => {
    if (reduced) {
      desde.current = valor
      setMostrado(valor)
      return
    }

    const inicio = performance.now()
    const origen = desde.current
    const delta = valor - origen

    if (delta === 0) return

    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1)
      // Desaceleración exponencial: rápido al principio, suave al final.
      const eased = 1 - Math.pow(1 - t, 4)
      setMostrado(origen + delta * eased)

      if (t < 1) {
        raf.current = requestAnimationFrame(paso)
      } else {
        desde.current = valor
      }
    }

    raf.current = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(raf.current)
  }, [valor, duracion, reduced])

  return mostrado
}
