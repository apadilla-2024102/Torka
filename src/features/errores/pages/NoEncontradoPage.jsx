import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'

/**
 * Página para direcciones que no existen y para errores de carga.
 * Dice qué pasó y ofrece la salida más probable.
 */
export default function NoEncontradoPage() {
  const error = useRouteError()
  const noExiste = !error || (isRouteErrorResponse(error) && error.status === 404)

  return (
    <section className="bg-asfalto pt-36 pb-24 text-papel">
      <Contenedor>
        <h1 className="tipo-ruta max-w-3xl text-[clamp(2.25rem,6vw,4rem)]">
          {noExiste ? 'Esta página no existe' : 'No se pudo cargar esta página'}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-niebla">
          {noExiste
            ? 'Puede que el enlace esté mal escrito o que el modelo ya no esté en la gama.'
            : 'Revisa tu conexión y vuelve a intentarlo. Si sigue fallando, escríbenos por WhatsApp.'}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Boton to="/modelos">Ver los modelos</Boton>
          <Boton to="/" variante="secundario" sobreOscuro>
            Ir al inicio
          </Boton>
        </div>
      </Contenedor>
    </section>
  )
}
