import { motion, useReducedMotion } from 'motion/react'

const frases = [
  'Cero gasolina',
  'Batería extraíble',
  'Sin afinaciones',
  'Silenciosa',
  'Carga en contacto normal',
  'Refacciones garantizadas',
]

/**
 * Banda en movimiento continuo.
 *
 * Separa dos secciones oscuras y mantiene la página viva sin pedir scroll.
 * El truco para que el bucle sea imperceptible: duplicar el contenido y
 * desplazar exactamente el 50%.
 */
export default function Marquee() {
  const reduced = useReducedMotion()
  const contenido = [...frases, ...frases]

  return (
    <div className="border-y border-ink-line bg-ink py-5">
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={reduced ? {} : { x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {contenido.map((f, i) => (
            <span key={`${f}-${i}`} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-sm font-medium tracking-wide text-mist/55 uppercase">
                {f}
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
