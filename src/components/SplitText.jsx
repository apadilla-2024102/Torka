import { motion, useReducedMotion } from 'motion/react'
import { inViewOnce, maskUp } from '../lib/motion.js'

/**
 * Revela un titular palabra por palabra, cada una subiendo desde detrás
 * de una máscara.
 *
 * Es la diferencia entre un texto que aparece y un texto que entra. El
 * ojo sigue la secuencia de izquierda a derecha, igual que al leer, así
 * que el movimiento acompaña la lectura en lugar de competir con ella.
 */
export default function SplitText({
  texto,
  className = '',
  as = 'h2',
  retraso = 0,
  escalonado = 0.055,
}) {
  const reduced = useReducedMotion()
  const Etiqueta = motion[as] ?? motion.h2
  const palabras = texto.split(' ')

  if (reduced) {
    const Simple = motion[as] ?? motion.h2
    return (
      <Simple
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inViewOnce}
        transition={{ duration: 0.3 }}
      >
        {texto}
      </Simple>
    )
  }

  return (
    <Etiqueta
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      aria-label={texto}
    >
      {palabras.map((palabra, i) => (
        <span
          key={`${palabra}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={maskUp}
            transition={{ delay: retraso + i * escalonado }}
          >
            {palabra}
          </motion.span>
          {i < palabras.length - 1 && ' '}
        </span>
      ))}
    </Etiqueta>
  )
}
