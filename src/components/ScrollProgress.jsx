import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/**
 * Barra de progreso de lectura, fija en el borde superior.
 *
 * Cuesta muy poco y hace mucho: en una página larga le dice al visitante
 * cuánto falta, lo que reduce el abandono a media página.
 */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const avance = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: avance }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-brand"
    />
  )
}
