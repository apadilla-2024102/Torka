import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { costoRecorrido, REFERENCIA, SUPUESTOS } from '../../../shared/lib/energia.js'
import Carril from '../../../shared/components/ui/Carril.jsx'
import { useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

/**
 * La firma de la portada: dos carriles, la misma distancia.
 *
 * Lo que cuesta recorrer 90 km (una carga completa de la yolt CITY, según
 * la ficha del fabricante) con cada moto. Cifras redondeadas sin exagerar
 * a favor de yolt: la gasolina hacia abajo, la luz hacia arriba.
 *
 * Técnica: cada carril es una franja del ancho completo que se desplaza
 * con transform desde fuera de la vista. Solo se anima transform, nunca
 * el ancho.
 */
export default function CalleComparativa() {
  const reduced = useSinMovimiento()
  // El disparo lo da la figura completa: una barra que arranca fuera de su
  // carril (recortada) nunca cuenta como visible para el observador.
  const figura = useRef(null)
  const enVista = useInView(figura, { once: true, margin: '0px 0px -20% 0px' })
  const costo = costoRecorrido()
  const gasolina = Math.floor(costo.gasolina)
  const electrica = Math.ceil(costo.electrica)

  const carriles = [
    {
      id: 'gasolina',
      etiqueta: 'Moto de gasolina 150 cc',
      monto: gasolina,
      proporcion: 1,
      barra: 'bg-tinta-suave/40',
      moto: '#a9abb3',
      duracion: 1.1,
    },
    {
      id: 'yolt',
      etiqueta: 'yolt eléctrica',
      monto: electrica,
      proporcion: electrica / gasolina,
      barra: 'bg-tinta',
      moto: '#d6f715',
      duracion: 2.4,
    },
  ]

  return (
    <figure ref={figura} aria-labelledby="calle-titulo">
      <figcaption id="calle-titulo" className="mb-6 text-lg text-tinta">
        Lo que cuesta recorrer <span className="tipo-tablero text-2xl text-lima-hondo">{REFERENCIA.km} km</span>, una
        carga completa de la {REFERENCIA.modelo}
      </figcaption>

      <div>
        {carriles.map((c, i) => (
          <div key={c.id}>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <span className="text-base font-medium text-tinta">{c.etiqueta}</span>
              <motion.span
                className="tipo-tablero text-3xl text-tinta sm:text-4xl"
                initial={reduced ? false : { opacity: 0 }}
                animate={enVista ? { opacity: 1 } : undefined}
                transition={{ delay: 0.2 + c.duracion, duration: 0.3 }}
              >
                <span className="mr-1 text-base text-tinta-suave">Q</span>
                {c.monto}
              </motion.span>
            </div>
            <div className="relative h-12 overflow-hidden rounded-[2px] bg-filete/60 sm:h-14">
              <motion.div
                className={`absolute inset-0 rounded-[2px] ${c.barra}`}
                initial={reduced ? false : { x: '-100%' }}
                animate={enVista ? { x: `${-(1 - c.proporcion) * 100}%` } : undefined}
                transition={{ duration: c.duracion, ease: [0.22, 0.8, 0.3, 1], delay: 0.2 }}
              >
                <MotoMarcador color={c.moto} />
              </motion.div>
            </div>
            {i === 0 && <Carril className="my-5 h-px" />}
          </div>
        ))}
      </div>

      <p className="mt-5 max-w-3xl text-sm text-tinta-suave">
        Gasolina a Q{SUPUESTOS.precioGalon} el galón y {SUPUESTOS.rendimientoKmGalon} km por galón. Luz a Q
        {SUPUESTOS.tarifaKwh} el kWh; batería de 72V 30Ah con 15 % de pérdida al cargar.{' '}
        <Link to="/ahorro" viewTransition className="font-medium text-tinta underline underline-offset-4">
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
      <circle cx="13" cy="27" r="7.5" fill="#ffffff" stroke={color} strokeWidth="2" />
      <circle cx="51" cy="27" r="7.5" fill="#ffffff" stroke={color} strokeWidth="2" />
      <path d="M6 18 L22 15 L36 15 L38 22 L44 22 L48 9 L56 8 L58 16 L54 24 L18 24 Z" fill={color} />
      <path d="M48 9 L45 3 L41 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
