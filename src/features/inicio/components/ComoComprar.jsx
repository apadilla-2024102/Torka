import { Link } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'

/** El proceso de compra. Aquí sí hay números: es una secuencia real. */
const PASOS = [
  {
    titulo: 'Elige tu modelo',
    texto: 'Compara autonomía, velocidad y precio con tu recorrido diario.',
    enlace: { to: '/comparar', label: 'Comparar modelos' },
  },
  {
    titulo: 'Pruébala',
    texto: 'Agenda una prueba de manejo en el distribuidor más cercano.',
    enlace: { to: '/distribuidores', label: 'Ver distribuidores' },
  },
  {
    titulo: 'Decide cómo pagar',
    texto: 'De contado o en cuotas. Te enviamos la cotización por WhatsApp.',
    enlace: { to: '/cotizar', label: 'Pedir cotización' },
  },
  {
    titulo: 'Llévatela',
    texto: 'Sales con factura y certificado de origen para tramitar placas ante la SAT.',
    enlace: { to: '/preguntas#licencia', label: 'Licencia y placas' },
  },
]

export default function ComoComprar() {
  return (
    <section aria-labelledby="comprar-titulo" className="py-20 sm:py-28">
      <Contenedor>
        <h2 id="comprar-titulo" className="tipo-ruta text-[clamp(2rem,5vw,3.25rem)]">
          Cómo se compra
        </h2>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-concreto sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <li key={p.titulo} className="flex flex-col bg-papel p-7">
              <span className="tipo-tablero text-5xl text-rojo" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-2 flex-1 text-grafito">{p.texto}</p>
              <Link to={p.enlace.to} viewTransition className="mt-5 font-semibold underline underline-offset-4">
                {p.enlace.label}
              </Link>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  )
}
