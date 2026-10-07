import { useRef } from 'react'
import { useInView } from 'motion/react'

/**
 * Monta a sus hijos solo mientras están cerca de la pantalla y los
 * desmonta cuando se alejan. Pensado para fondos WebGL: cada uno tiene su
 * propio bucle de dibujo y su contexto de GPU, y fuera de pantalla solo
 * gastan batería.
 */
export default function MontarEnVista({ margen = '200px 0px', className = '', respaldo = null, children }) {
  const ref = useRef(null)
  const cerca = useInView(ref, { margin: margen })
  return (
    <div ref={ref} className={className}>
      {cerca ? children : respaldo}
    </div>
  )
}
