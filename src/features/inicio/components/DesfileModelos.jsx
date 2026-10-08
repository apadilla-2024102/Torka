import { Link } from 'react-router-dom'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import { precioModelo } from '../../../shared/lib/formato.js'
import TituloSeccion from '../../../shared/components/ui/TituloSeccion.jsx'

/**
 * Desfile: todas las motos pasan en una fila sin fin, cada una sobre su
 * nombre gigante en contorno. Al pasar el cursor la fila se detiene, el
 * nombre se enciende y la moto avanza un poco: invita a entrar a la ficha.
 *
 * La fila va duplicada para que el bucle no tenga corte; la copia queda
 * oculta para lectores de pantalla y fuera del orden de tabulación.
 */
export default function DesfileModelos({ modelos }) {
  // Cada color con foto es una pieza del desfile.
  const piezas = modelos.flatMap((m) => m.colores.map((c) => ({ modelo: m, color: c })))

  return (
    <section aria-labelledby="desfile-titulo" className="overflow-hidden bg-negro py-24 text-papel sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <TituloSeccion id="desfile-titulo" indice="03" etiqueta="Línea yolt">
          Una misma esencia, diferentes caminos
        </TituloSeccion>
      </div>

      <div className="mt-12 flex w-max desfile">
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex shrink-0" aria-hidden={copia === 1 || undefined}>
            {piezas.map(({ modelo, color }) => (
              <li key={`${modelo.id}-${color.id}`} className="w-[78vw] shrink-0 px-3 sm:w-[420px]">
                <Link
                  to={`/modelos/${modelo.id}?color=${color.id}`}
                  tabIndex={copia === 1 ? -1 : undefined}
                  data-cursor="Ver"
                  className="group relative block"
                >
                  <span
                    aria-hidden="true"
                    className="tipo-ruta pointer-events-none absolute inset-x-0 top-[22%] overflow-hidden text-center text-[clamp(2.6rem,11vw,4.1rem)] leading-none text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(241,238,229,0.22)] group-hover:text-lima/90 group-hover:[-webkit-text-stroke:1px_transparent]"
                  >
                    {modelo.nombre}
                  </span>
                  <span className="relative block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 group-hover:scale-105">
                    <ModeloImagen modelo={modelo} colorId={color.id} transicion={false} ajustada className="aspect-[4/3] w-full" />
                  </span>
                  <span className="mt-2 flex items-baseline justify-between gap-3 px-1">
                    <span>
                      <span className="tipo-etiqueta block text-niebla">{modelo.perfilLabel}</span>
                      <span className="text-lg font-semibold">
                        {modelo.nombre} · {color.nombre}
                      </span>
                    </span>
                    <span className="tipo-tablero text-xl">{precioModelo(modelo)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
