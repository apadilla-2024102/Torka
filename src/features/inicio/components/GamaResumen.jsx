import { Link } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import Lectura from '../../../shared/components/ui/Lectura.jsx'
import { formatoQuetzales } from '../../../shared/lib/formato.js'

/**
 * La gama como hoja de especificaciones: una fila por modelo, con las
 * mismas tres lecturas en la misma posición. Así se comparan con la
 * vista en vertical, sin abrir cada ficha.
 */
export default function GamaResumen({ modelos }) {
  return (
    <section aria-labelledby="gama-titulo" className="py-20 sm:py-28">
      <Contenedor>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="gama-titulo" className="tipo-ruta text-[clamp(2rem,5vw,3.25rem)]">
              Una moto para cada recorrido
            </h2>
            <p className="mt-4 max-w-xl text-lg text-grafito">
              Elige por cómo la vas a usar. Más autonomía de la que necesitas es dinero guardado en batería.
            </p>
          </div>
          <Link to="/comparar" viewTransition className="shrink-0 font-semibold underline underline-offset-4">
            Compararlas lado a lado
          </Link>
        </div>

        <ul className="mt-12 border-t border-concreto">
          {modelos.map((m) => (
            <li key={m.id} className="border-b border-concreto">
              <Link
                to={`/modelos/${m.id}`}
                viewTransition
                className="group grid items-center gap-x-8 gap-y-4 py-8 sm:grid-cols-[220px_1fr] lg:grid-cols-[240px_1.1fr_1.4fr_auto]"
              >
                <ModeloImagen modelo={m} className="aspect-[44/27] w-full max-w-[260px]" />

                <div>
                  <h3 className="tipo-ruta text-3xl">{m.nombre}</h3>
                  <p className="mt-1 text-grafito">{m.perfilLabel}</p>
                </div>

                <dl className="grid grid-cols-3 gap-4 sm:col-start-2 lg:col-start-auto">
                  <Lectura etiqueta="Autonomía" valor={m.specs.autonomia} unidad="km" energia />
                  <Lectura etiqueta="Velocidad" valor={m.specs.velocidad} unidad="km/h" />
                  <Lectura etiqueta="Carga completa" valor={m.specs.carga} unidad="h" energia />
                </dl>

                <div className="flex items-center justify-between gap-4 sm:col-start-2 lg:col-start-auto lg:flex-col lg:items-end">
                  <span className="tipo-tablero text-2xl">{formatoQuetzales(m.precio)}</span>
                  <span className="rounded-full border border-asfalto/25 px-4 py-2 text-sm font-semibold transition-colors duration-200 group-hover:border-asfalto group-hover:bg-asfalto group-hover:text-papel">
                    Ver la {m.nombre}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Contenedor>
    </section>
  )
}
