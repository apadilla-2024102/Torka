import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { kmPorMonto, SUPUESTOS } from '../../../shared/lib/energia.js'
import { formatoNumero } from '../../../shared/lib/formato.js'
import Carril from '../../../shared/components/ui/Carril.jsx'

const MONTO = 100

/**
 * La firma de la portada: dos carriles, el mismo dinero.
 *
 * Con Q100 de energía, la moto de gasolina se detiene pronto y la TORKA
 * sigue hasta el final de la calle. Es el argumento de venta convertido
 * en imagen, y el único movimiento que ocurre sin que el usuario haga
 * nada en todo el sitio.
 *
 * Técnica: cada carril es una franja del ancho completo que se desplaza
 * con transform desde fuera de la vista. Solo se anima transform, nunca
 * el ancho.
 */
export default function CalleComparativa() {
  const reduced = useReducedMotion()
  const km = kmPorMonto(MONTO)
  const proporcionGasolina = km.gasolina / km.electrica

  const carriles = [
    {
      id: 'gasolina',
      etiqueta: 'Moto de gasolina 150 cc',
      km: km.gasolina,
      proporcion: proporcionGasolina,
      barra: 'bg-niebla/35',
      moto: '#a9abb3',
      duracion: 1.1,
    },
    {
      id: 'torka',
      etiqueta: 'TORKA eléctrica',
      km: km.electrica,
      proporcion: 1,
      barra: 'bg-rojo',
      moto: '#ff4a50',
      duracion: 2.4,
    },
  ]

  return (
    <figure aria-labelledby="calle-titulo">
      <figcaption id="calle-titulo" className="mb-6 text-lg text-papel">
        Lo que recorres con <span className="tipo-tablero text-2xl text-senal">Q{MONTO}</span> de energía
      </figcaption>

      <div>
        {carriles.map((c, i) => (
          <div key={c.id}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-papel">{c.etiqueta}</span>
              <motion.span
                className="tipo-tablero text-3xl text-papel sm:text-4xl"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ delay: 0.2 + c.duracion, duration: 0.3 }}
              >
                {formatoNumero(c.km)}
                <span className="ml-1 text-base text-niebla">km</span>
              </motion.span>
            </div>
            <div className="relative h-12 overflow-hidden rounded-xl bg-asfalto-alto sm:h-14">
              <motion.div
                className={`absolute inset-0 rounded-xl ${c.barra}`}
                initial={reduced ? false : { x: '-100%' }}
                whileInView={{ x: `${-(1 - c.proporcion) * 100}%` }}
                viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                transition={{ duration: c.duracion, ease: [0.22, 0.8, 0.3, 1], delay: 0.2 }}
              >
                <MotoMarcador color={c.moto} />
              </motion.div>
            </div>
            {i === 0 && <Carril className="my-5 h-1 rounded-full opacity-80" />}
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-sm text-niebla">
        Gasolina a Q{SUPUESTOS.precioGalon} el galón y {SUPUESTOS.rendimientoKmGalon} km por galón. Luz a Q
        {SUPUESTOS.tarifaKwh} el kWh y {SUPUESTOS.consumoKwh100km} kWh cada 100 km.{' '}
        <Link to="/ahorro" viewTransition className="font-medium text-papel underline underline-offset-4">
          Haz la cuenta con tus números
        </Link>
      </p>
    </figure>
  )
}

/** Moto mínima de perfil que va en la punta de cada carril. */
function MotoMarcador({ color }) {
  return (
    <svg
      viewBox="0 0 64 36"
      className="absolute top-1/2 right-1 h-8 w-14 -translate-y-1/2 sm:h-10 sm:w-[4.5rem]"
      aria-hidden="true"
    >
      <circle cx="13" cy="27" r="7.5" fill="#1d1e22" stroke={color} strokeWidth="2" />
      <circle cx="51" cy="27" r="7.5" fill="#1d1e22" stroke={color} strokeWidth="2" />
      <path d="M6 18 L22 15 L36 15 L38 22 L44 22 L48 9 L56 8 L58 16 L54 24 L18 24 Z" fill={color} />
      <path d="M48 9 L45 3 L41 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
