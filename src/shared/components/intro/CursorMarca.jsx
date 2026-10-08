import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { useSinMovimiento } from '../../hooks/useMovimiento.js'

/**
 * Cursor de estudio: un anillo que sigue al puntero con un leve retraso.
 *
 * - Sobre enlaces y botones crece, para confirmar que eso se puede tocar.
 * - Sobre elementos con `data-cursor="Texto"` se vuelve una etiqueta roja
 *   con ese texto ("Ver", "Arrastra"): dice qué pasa al hacer clic.
 * - Se mezcla por diferencia de color, así se ve igual sobre fondo claro
 *   u oscuro.
 *
 * Solo en equipos con mouse. El cursor del sistema sigue visible: el
 * anillo acompaña, no reemplaza (el puntero real nunca se pierde).
 */
export default function CursorMarca() {
  const [activo] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const reduced = useSinMovimiento()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const suaveX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const suaveY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const [estado, setEstado] = useState({ tipo: 'normal', texto: '' })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!activo) return
    const mover = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const destino = e.target.closest?.('[data-cursor], a, button, label, [role="button"], input[type="range"]')
      if (!destino) setEstado((s) => (s.tipo === 'normal' ? s : { tipo: 'normal', texto: '' }))
      else if (destino.dataset.cursor) setEstado({ tipo: 'etiqueta', texto: destino.dataset.cursor })
      else setEstado((s) => (s.tipo === 'enlace' ? s : { tipo: 'enlace', texto: '' }))
    }
    const salir = () => setVisible(false)
    window.addEventListener('pointermove', mover, { passive: true })
    document.documentElement.addEventListener('pointerleave', salir)
    return () => {
      window.removeEventListener('pointermove', mover)
      document.documentElement.removeEventListener('pointerleave', salir)
    }
  }, [activo, x, y])

  if (!activo) return null

  const etiqueta = estado.tipo === 'etiqueta'
  const resorte = { type: 'spring', stiffness: 400, damping: 30 }

  const posicion = { x: reduced ? x : suaveX, y: reduced ? y : suaveY }

  // Se anima solo transform y opacidad: el anillo crece con scale, nunca
  // cambiando su ancho (eso obligaría a recalcular el layout cada cuadro).
  // Anillo y etiqueta van en seguidores separados: la mezcla por diferencia
  // tiene que estar en el elemento fijo, o el transform la aísla.
  return (
    <>
      <motion.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference" style={posicion}>
        <motion.div
          className="absolute -top-[15px] -left-[15px] h-[30px] w-[30px] rounded-full border-[1.5px] border-white"
          animate={{ scale: etiqueta ? 0 : estado.tipo === 'enlace' ? 1.8 : 1, opacity: visible && !etiqueta ? 1 : 0 }}
          transition={resorte}
        />
      </motion.div>
      <motion.div aria-hidden="true" className="pointer-events-none fixed top-0 left-0 z-[90]" style={posicion}>
        <motion.div
          className="absolute -top-[42px] -left-[42px] flex h-[84px] w-[84px] items-center justify-center rounded-full bg-tinta text-sm font-medium text-lienzo"
          animate={{ scale: etiqueta && visible ? 1 : 0 }}
          transition={resorte}
        >
          {estado.texto}
        </motion.div>
      </motion.div>
    </>
  )
}
