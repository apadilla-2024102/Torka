import { motion } from 'motion/react'
import Contenedor from './Contenedor.jsx'
import Carril from '../ui/Carril.jsx'
import { lineaMascara, subir } from '../../lib/movimiento.js'
import { useIntro } from '../intro/IntroContexto.jsx'

/**
 * Encabezado de las páginas interiores. Franja de asfalto con la línea
 * de carril al pie: la misma calle de la portada, en pequeño.
 */
export default function EncabezadoPagina({ titulo, descripcion, children }) {
  const { lista } = useIntro()
  return (
    <header className="relative bg-asfalto pt-32 pb-14 text-papel sm:pt-36 sm:pb-16">
      <Contenedor>
        {/* Al llegar a la página, el título sube desde detrás de una máscara
            y la descripción lo sigue: la misma firma que la portada. */}
        <motion.div initial="oculto" animate={lista ? 'visible' : 'oculto'} transition={{ staggerChildren: 0.12 }}>
          <h1 className="tipo-ruta max-w-3xl overflow-hidden pb-[0.08em] text-[clamp(2.25rem,6vw,4rem)]">
            <motion.span variants={lineaMascara} className="block">
              {titulo}
            </motion.span>
          </h1>
          {descripcion && (
            <motion.p variants={subir} className="mt-5 max-w-2xl text-lg text-niebla">
              {descripcion}
            </motion.p>
          )}
        </motion.div>
        {children}
      </Contenedor>
      <Carril className="absolute inset-x-0 bottom-0 h-1.5" />
    </header>
  )
}
