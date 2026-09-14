import { useRef } from 'react'
import { useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

/**
 * Inclinación en perspectiva según la posición del puntero.
 *
 * Da profundidad real —la tarjeta gira sobre dos ejes— sin cargar una
 * librería 3D ni un modelo. Es el efecto que hace que una tarjeta plana
 * se sienta como un objeto con volumen.
 *
 * El contenedor necesita `perspective`; el elemento inclinado, los
 * estilos que devuelve este hook.
 */
export function useTilt({ grados = 7, escalaHover = 1.015 } = {}) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // Posición del puntero normalizada a [-0.5, 0.5] dentro del elemento.
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const config = { stiffness: 260, damping: 22, mass: 0.5 }
  const sx = useSpring(px, config)
  const sy = useSpring(py, config)

  // El eje X se invierte: mover el cursor hacia abajo debe inclinar la
  // parte superior hacia atrás, no hacia delante.
  const rotateX = useTransform(sy, [-0.5, 0.5], [grados, -grados])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-grados, grados])

  const alMover = (e) => {
    if (reduced || !ref.current) return
    const caja = ref.current.getBoundingClientRect()
    px.set((e.clientX - caja.left) / caja.width - 0.5)
    py.set((e.clientY - caja.top) / caja.height - 0.5)
  }

  const alSalir = () => {
    px.set(0)
    py.set(0)
  }

  return {
    ref,
    reduced,
    escalaHover,
    manejadores: { onMouseMove: alMover, onMouseLeave: alSalir },
    estilo: reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' },
  }
}
