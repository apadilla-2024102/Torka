import { motion } from 'motion/react'
import { CURVA, EN_VISTA, escalonar, lineaMascara, subir } from '../../lib/movimiento.js'

/** Filete lima que se dibuja de izquierda a derecha. */
const trazo = {
  oculto: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.7, ease: CURVA.expo } },
}

/**
 * Encabezado de sección: índice numerado, filete lima y rótulo, y debajo
 * el titular que sube desde detrás de una máscara al entrar en pantalla.
 * Da a todas las secciones el mismo orden editorial.
 *
 * El disparo va en el contenedor: la línea del titular empieza oculta tras
 * la máscara y el navegador nunca la vería entrar.
 */
export default function TituloSeccion({ id, indice, etiqueta, children, className = '' }) {
  return (
    <motion.div initial="oculto" whileInView="visible" viewport={EN_VISTA} variants={escalonar(0, 0.12)} className={className}>
      <motion.p variants={subir} className="tipo-etiqueta flex items-center gap-3 text-niebla">
        <span className="tipo-tablero text-base tracking-normal text-lima">{indice}</span>
        <motion.span variants={trazo} aria-hidden="true" className="block h-px w-10 origin-left bg-lima" />
        {etiqueta}
      </motion.p>
      <h2 id={id} className="tipo-ruta mt-5 max-w-3xl overflow-hidden pb-[0.08em] text-[clamp(2rem,4.6vw,3.5rem)]">
        <motion.span variants={lineaMascara} className="block">
          {children}
        </motion.span>
      </h2>
    </motion.div>
  )
}
