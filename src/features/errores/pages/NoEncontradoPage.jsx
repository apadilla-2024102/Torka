import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import { useSeo } from '../../../shared/seo/useSeo.js'
import { RUTAS_LOGO } from '../../../shared/components/brand/Logo.jsx'

const SUGERENCIAS = [
  { to: '/modelos', label: 'Ver los modelos' },
  { to: '/comparar', label: 'Comparar modelos' },
  { to: '/ahorro', label: 'Calcular mi ahorro' },
  { to: '/preguntas', label: 'Preguntas frecuentes' },
]

/**
 * Página 404 personalizada, también para errores de carga. Dice qué pasó,
 * ofrece la acción del sitio y los destinos más buscados. Lleva noindex
 * para que Google no la guarde como página del sitio.
 */
export default function NoEncontradoPage() {
  const error = useRouteError()
  const noExiste = !error || (isRouteErrorResponse(error) && error.status === 404)

  useSeo({
    titulo: noExiste ? 'Página no encontrada' : 'Error al cargar',
    descripcion: 'La página que buscas no existe o cambió de dirección. Conoce la gama de motos eléctricas yolt.',
    noindex: true,
  })

  return (
    <section className="relative isolate overflow-hidden bg-lienzo-alto pt-36 pb-24 text-tinta">
      <img
        src={RUTAS_LOGO.isotipo}
        alt=""
        aria-hidden="true"
        className="absolute -right-[10%] -bottom-[15%] -z-10 w-[min(70vw,720px)] opacity-[0.06] grayscale"
      />
      <Contenedor>
        <p className="tipo-tablero text-[clamp(4rem,14vw,9rem)] leading-none text-tinta/15">{noExiste ? '404' : 'Error'}</p>
        <h1 className="tipo-ruta mt-2 max-w-3xl text-[clamp(2.25rem,6vw,4rem)]">
          {noExiste ? 'Esta ruta no lleva a ningún lado' : 'No se pudo cargar esta página'}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-tinta-suave">
          {noExiste
            ? 'Puede que el enlace esté mal escrito o que la página haya cambiado de dirección. Tu próxima moto sí te está esperando.'
            : 'Revisa tu conexión y vuelve a intentarlo. Si sigue fallando, escríbenos por WhatsApp con el botón verde.'}
        </p>
        <div className="mt-9">
          <Boton to="/cotizar">Solicitar cotización</Boton>
        </div>
        <nav aria-label="Páginas sugeridas" className="mt-12 border-t border-filete pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-tinta-suave">
            <li>
              <Link to="/" className="underline-offset-4 hover:text-tinta hover:underline">
                Inicio
              </Link>
            </li>
            {SUGERENCIAS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="underline-offset-4 hover:text-tinta hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Contenedor>
    </section>
  )
}
