import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/**
 * Enlace que se deja atraer por el cursor.
 *
 * El desplazamiento es deliberadamente corto: lo justo para que el botón
 * se sienta vivo al acercarse. Pasado cierto punto deja de leerse como
 * calidad y empieza a leerse como un botón que se escapa.
 */
export default function MagneticButton({ children, className = '', fuerza = 0.28, ...rest }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const seguir = (e) => {
    if (reduced || !ref.current) return
    const caja = ref.current.getBoundingClientRect()
    x.set((e.clientX - (caja.left + caja.width / 2)) * fuerza)
    y.set((e.clientY - (caja.top + caja.height / 2)) * fuerza)
  }

  const soltar = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={seguir}
      onMouseLeave={soltar}
      style={reduced ? undefined : { x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  )
}
