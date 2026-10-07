import { Link } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'

/**
 * Las tres dudas que más frenan la compra, respondidas en la portada
 * (skill page-cro: atender objeciones antes del llamado final). Cada una
 * enlaza a su respuesta completa.
 */
const CLAVES = ['licencia', 'carga-departamento', 'lluvia']

export default function ObjecionesResumen({ preguntas: todas }) {
  const preguntas = CLAVES.map((id) => todas.find((p) => p.id === id)).filter(Boolean)
  if (!preguntas.length) return null

  return (
    <section aria-labelledby="dudas-titulo" className="bg-white py-24 sm:py-28">
      <Contenedor>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="dudas-titulo" className="tipo-ruta max-w-2xl text-[clamp(2rem,5vw,3.25rem)]">
            Lo que todos preguntan antes de comprar
          </h2>
          <Link to="/preguntas" viewTransition className="shrink-0 font-semibold underline underline-offset-4">
            Ver todas las preguntas
          </Link>
        </div>

        <Revelar grupo as="dl" className="mt-12 grid gap-10 md:grid-cols-3">
          {preguntas.map((p) => (
            <Revelar.Item key={p.id} className="border-t-2 border-asfalto pt-6">
              <dt className="text-xl font-semibold">{p.pregunta}</dt>
              <dd className="mt-3 text-grafito">
                {p.respuesta.split('. ').slice(0, 2).join('. ')}.{' '}
                <Link to={`/preguntas#${p.id}`} viewTransition className="font-semibold text-asfalto underline underline-offset-4">
                  Leer más
                </Link>
              </dd>
            </Revelar.Item>
          ))}
        </Revelar>
      </Contenedor>
    </section>
  )
}
