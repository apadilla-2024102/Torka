import { useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Línea de luz: filete fino con un destello lima que lo recorre.
 *
 * Es un bucle decorativo, así que se pausa fuera de pantalla (no gasta
 * GPU).
 */
export default function Carril({ className = '' }) {
  const ref = useRef(null)
  const enVista = useInView(ref)

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`carril carril-en-marcha ${className}`}
      style={{ animationPlayState: enVista ? 'running' : 'paused' }}
    />
  )
}
