import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'
import { useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'
import TituloSeccion from '../../../shared/components/ui/TituloSeccion.jsx'

/** El proceso de compra. Aquí sí hay números: es una secuencia real. */
const PASOS = [
  {
    titulo: 'Elige tu modelo',
    texto: 'Compara autonomía, velocidad y precio con tu recorrido diario.',
    enlace: { to: '/comparar', label: 'Comparar modelos' },
  },
  {
    titulo: 'Agenda tu prueba',
    texto: 'Agenda una prueba de manejo en el distribuidor más cercano.',
    enlace: { to: '/distribuidores', label: 'Ver distribuidores' },
  },
  {
    titulo: 'Decide cómo pagar',
    texto: 'De contado o con financiamiento. Recibe tu cotización formal por WhatsApp.',
    enlace: { to: '/cotizar', label: 'Solicitar cotización' },
  },
  {
    titulo: 'Recibe tu moto',
    texto: 'Entrega con factura y certificado de origen para el trámite de placas ante la SAT.',
    enlace: { to: '/preguntas#licencia', label: 'Licencia y placas' },
  },
]

/**
 * La línea roja avanza paso a paso mientras el usuario baja: muestra que
 * es un recorrido con principio y fin. Está atada al scroll (sin curva ni
 * duración); si el sitio obedece "reducir movimiento" queda completa.
 */
export default function ComoComprar() {
  const lista = useRef(null)
  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 85%', 'end 55%'] })
  const reduced = useSinMovimiento()
  const avanceScroll = useTransform(scrollYProgress, [0, 1], [0, 1])
  const avance = reduced ? 1 : avanceScroll

  return (
    <section aria-labelledby="comprar-titulo" className="py-20 sm:py-28">
      <Contenedor>
        <TituloSeccion id="comprar-titulo" indice="04" etiqueta="Proceso de compra">
          Así de simple es comprar
        </TituloSeccion>

        <div ref={lista} className="relative mt-12">
          {/* Riel y línea de avance: horizontal en escritorio, vertical en celular. */}
          <div aria-hidden="true" className="absolute top-0 left-0 hidden h-1 w-full bg-linea lg:block" />
          <motion.div
            aria-hidden="true"
            style={{ scaleX: avance }}
            className="absolute top-0 left-0 hidden h-1 w-full origin-left bg-lima lg:block"
          />
          <div aria-hidden="true" className="absolute top-0 left-3 h-full w-1 bg-linea lg:hidden" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: avance }}
            className="absolute top-0 left-3 h-full w-1 origin-top bg-lima lg:hidden"
          />

          <Revelar grupo as="ol" escalon={0.12} className="grid gap-10 pl-10 lg:grid-cols-4 lg:gap-8 lg:pt-10 lg:pl-0">
            {PASOS.map((p, i) => (
              <Revelar.Item as="li" key={p.titulo} className="flex flex-col">
                <span className="tipo-tablero text-5xl text-lima" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-xl font-semibold">{p.titulo}</h3>
                <p className="mt-2 flex-1 text-niebla">{p.texto}</p>
                <Link to={p.enlace.to} viewTransition className="mt-5 font-semibold underline underline-offset-4">
                  {p.enlace.label}
                </Link>
              </Revelar.Item>
            ))}
          </Revelar>
        </div>
      </Contenedor>
    </section>
  )
}
