import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { CURVA } from '../../lib/movimiento.js'
import { useSinMovimiento } from '../../hooks/useMovimiento.js'

/**
 * Fotografía editorial: al entrar en pantalla se descubre de abajo hacia
 * arriba como una cortina, y mientras se hace scroll la imagen se desplaza
 * dentro de su marco (paralaje), como en las revistas de arquitectura.
 * Al pasar el cursor se acerca un poco.
 */
export default function FotoRevelada({ src, alt, ancho, alto, className = '', marco = 'aspect-[4/3]', retraso = 0 }) {
  const ref = useRef(null)
  const sinMovimiento = useSinMovimiento()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden ${marco} ${className}`}
      initial={sinMovimiento ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.3, ease: CURVA.expo, delay: retraso }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={ancho}
        height={alto}
        loading="lazy"
        decoding="async"
        style={sinMovimiento ? undefined : { y }}
        className="absolute inset-0 h-[116%] w-full -translate-y-[8%] scale-100 object-cover transition-[scale] duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
      />
    </motion.div>
  )
}
