import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'motion/react'

/**
 * Lleva un número de su valor anterior al nuevo con una curva suave.
 * Responde a una acción del usuario (mover un control), así que el
 * movimiento explica qué cambió en lugar de decorar.
 */
export function useCountUp(objetivo, duracion = 0.6) {
  const reduced = useReducedMotion()
  const [valor, setValor] = useState(objetivo)
  // Valor mostrado en este instante: si el usuario mueve el control a
  // mitad de la animación, la siguiente parte de donde está, sin saltos.
  const actual = useRef(objetivo)

  useEffect(() => {
    if (reduced) {
      actual.current = objetivo
      setValor(objetivo)
      return
    }
    const controles = animate(actual.current, objetivo, {
      duration: duracion,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        actual.current = v
        setValor(v)
      },
    })
    return () => controles.stop()
  }, [objetivo, duracion, reduced])

  return valor
}
