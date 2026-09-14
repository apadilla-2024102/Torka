import { motion, useReducedMotion } from 'motion/react'
import { inViewOnce, respectMotion, riseIn } from '../lib/motion.js'

/**
 * Envoltorio de revelado por scroll.
 *
 * Centraliza el patrón para que ningún componente repita la lógica de
 * "aparece cuando entra en pantalla" y para que el respeto a
 * prefers-reduced-motion sea automático, no algo que se olvide.
 */
export default function Reveal({
  children,
  variants = riseIn,
  delay = 0,
  as = 'div',
  className = '',
  ...rest
}) {
  const reduced = useReducedMotion()
  const Component = motion[as] ?? motion.div
  const safe = respectMotion(variants, reduced)

  return (
    <Component
      className={className}
      variants={safe}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}
