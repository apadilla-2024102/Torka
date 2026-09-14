import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion.js'

/**
 * Ilustración vectorial de un scooter tipo adventure, de perfil.
 *
 * Es un RESPALDO, no el producto: sirve mientras no haya fotografía real
 * en public/moto.png. Se traza sola al entrar, como si alguien la
 * dibujara, lo que convierte un hueco vacío en un momento de la página.
 *
 * Es un dibujo original y genérico. No reproduce un modelo concreto.
 */

// Cada trazo entra en secuencia: primero las ruedas, luego el cuerpo,
// al final los detalles. El orden importa tanto como el dibujo.
const trazo = (delay, duracion = 1.1) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: duracion, ease: EASE.outExpo, delay },
      opacity: { duration: 0.2, delay },
    },
  },
})

export default function MotoIlustracion({ className = '' }) {
  const reduced = useReducedMotion()
  const estado = reduced ? 'visible' : undefined

  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      fill="none"
      role="img"
      aria-label="Ilustración de un scooter eléctrico TORKA de perfil"
    >
      <motion.g
        initial={reduced ? 'visible' : 'hidden'}
        animate={estado}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.4 }}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* --- Ruedas --- */}
        <motion.circle cx="104" cy="208" r="44" variants={trazo(0)} />
        <motion.circle cx="330" cy="208" r="44" variants={trazo(0.12)} />
        <motion.circle cx="104" cy="208" r="17" variants={trazo(0.5)} strokeWidth="2" />
        <motion.circle cx="330" cy="208" r="17" variants={trazo(0.58)} strokeWidth="2" />

        {/* --- Cola, asiento en dos alturas y plataforma --- */}
        <motion.path
          d="M56 152 L78 143 L150 139 L158 152 L206 149 Q214 149 218 160 L224 186 L260 187"
          variants={trazo(0.26, 1.3)}
        />

        {/* --- Escudo delantero: sube vertical y se inclina hacia delante --- */}
        <motion.path
          d="M260 187 Q272 186 274 172 L280 138 Q283 118 298 110"
          variants={trazo(0.44, 1)}
        />

        {/* --- Carenado frontal y nariz, con caída rápida --- */}
        <motion.path
          d="M298 110 Q318 100 342 106 Q362 112 368 136 L372 164"
          variants={trazo(0.56, 1)}
        />

        {/* --- Bajos y carcasa del motor --- */}
        <motion.path
          d="M224 186 L162 188 Q130 189 120 172 L112 156"
          variants={trazo(0.66, 0.9)}
        />

        {/* --- Parabrisas alto, arrancando del carenado --- */}
        <motion.path d="M306 106 Q322 66 338 50" variants={trazo(0.76, 0.8)} />
        <motion.path d="M338 50 L352 62" variants={trazo(0.88, 0.4)} />

        {/* --- Manillar y espejo --- */}
        <motion.path d="M296 112 L268 100" variants={trazo(0.84, 0.6)} />
        <motion.path d="M268 100 L256 78" variants={trazo(0.92, 0.45)} />
        <motion.ellipse cx="251" cy="71" rx="9" ry="6" transform="rotate(-28 251 71)" variants={trazo(1, 0.45)} />

        {/* --- Horquilla y guardabarros delantero --- */}
        <motion.path d="M356 130 L340 190" variants={trazo(0.94, 0.6)} />
        <motion.path d="M300 168 Q318 150 348 154" variants={trazo(1.02, 0.6)} />

        {/* --- Suspensión trasera --- */}
        <motion.path d="M132 164 L110 194" variants={trazo(1.06, 0.45)} />

        {/* --- Escape --- */}
        <motion.path d="M118 192 L72 196 Q60 197 60 205" variants={trazo(1.12, 0.55)} />

      </motion.g>

      {/* --- Acentos en color de marca, entran al final --- */}
      <motion.g
        initial={reduced ? 'visible' : 'hidden'}
        animate={estado}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.4 }}
        stroke="#e31019"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        {/* Faro */}
        <motion.path d="M352 122 L366 130" variants={trazo(1.26, 0.4)} />
        {/* Franja lateral */}
        <motion.path d="M138 160 L196 156" variants={trazo(1.36, 0.5)} />
        {/* Piloto trasero */}
        <motion.path d="M58 150 L74 145" variants={trazo(1.46, 0.35)} />
      </motion.g>
    </svg>
  )
}
