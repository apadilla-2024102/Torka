import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'

const conMouse = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Inclinación 3D que sigue al cursor, con un reflejo de luz opcional.
 *
 * Solo con mouse o trackpad: en pantallas táctiles no hay cursor que
 * seguir y se queda plano. Anima solo transform y opacidad (GPU).
 *
 * `brillo` dibuja el reflejo como capa rectangular: úsalo sobre tarjetas,
 * no sobre fotos recortadas (se vería el rectángulo).
 */
export default function Inclinar({ children, grados = 8, brillo = false, className = '' }) {
  const ref = useRef(null)
  const [activo] = useState(conMouse)
  const [encima, setEncima] = useState(false)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const resorte = { stiffness: 170, damping: 18, mass: 0.6 }
  const sx = useSpring(px, resorte)
  const sy = useSpring(py, resorte)
  const rotateY = useTransform(sx, [0, 1], [-grados, grados])
  const rotateX = useTransform(sy, [0, 1], [grados, -grados])
  const luzX = useTransform(sx, (v) => `${v * 100}%`)
  const luzY = useTransform(sy, (v) => `${v * 100}%`)
  const reflejo = useMotionTemplate`radial-gradient(circle at ${luzX} ${luzY}, rgba(214,247,21,0.10), transparent 55%)`

  if (!activo) return <div className={className}>{children}</div>

  const mover = (e) => {
    const caja = ref.current.getBoundingClientRect()
    px.set((e.clientX - caja.left) / caja.width)
    py.set((e.clientY - caja.top) / caja.height)
  }
  const salir = () => {
    px.set(0.5)
    py.set(0.5)
    setEncima(false)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={mover}
      onPointerEnter={() => setEncima(true)}
      onPointerLeave={salir}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`relative ${className}`}
    >
      {children}
      {brillo && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[2px]"
          style={{ background: reflejo }}
          animate={{ opacity: encima ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}
