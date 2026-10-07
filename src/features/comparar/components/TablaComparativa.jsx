import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import ModeloImagen from '../../../shared/components/brand/ModeloImagen.jsx'
import { formatoNumero, precioModelo } from '../../../shared/lib/formato.js'

/** Valor ganador de una especificación numérica, según su dirección. */
const ganadorDe = (modelos, key, mejor) => {
  if (!mejor) return null
  const valores = modelos.map((m) => m.specs[key]).filter((v) => typeof v === 'number')
  if (!valores.length) return null
  return mejor === 'alto' ? Math.max(...valores) : Math.min(...valores)
}

export default function TablaComparativa({ modelos, specsMeta }) {
  return (
    <div className="relative overflow-x-auto rounded-[2px] bg-papel text-asfalto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="sr-only">
          Especificaciones de los modelos yolt. El mejor valor de cada fila está marcado.
        </caption>
        <thead>
          <tr className="border-b border-concreto align-bottom">
            <td className="p-5" />
            {modelos.map((m) => (
              <th key={m.id} scope="col" className="p-5">
                <Link to={`/modelos/${m.id}`} viewTransition className="group block">
                  <ModeloImagen modelo={m} className="aspect-[44/27] w-full max-w-[170px]" />
                  <span className="tipo-ruta mt-3 block text-2xl group-hover:underline">{m.nombre}</span>
                  <span className="block text-sm font-normal text-grafito">{m.perfilLabel}</span>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specsMeta.map((s) => {
            const ganador = ganadorDe(modelos, s.key, s.mejor)
            return (
              <tr key={s.key} className="border-b border-concreto/80">
                <th scope="row" className="p-5 font-medium text-grafito">
                  {s.label}
                </th>
                {modelos.map((m) => {
                  const v = m.specs[s.key]
                  const gana = ganador !== null && v === ganador
                  return (
                    <td key={m.id} className="p-5">
                      {typeof v === 'number' ? (
                        <span className={`tipo-tablero text-2xl ${gana ? '' : 'text-asfalto/70'}`}>
                          {gana && (
                            // El punto del ganador aparece con un pequeño salto al ver la tabla.
                            <motion.span
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.25 }}
                              className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-lima-hondo align-middle"
                            />
                          )}
                          {formatoNumero(v)}
                          <span className="ml-1 text-sm text-grafito">{s.unidad}</span>
                          {gana && <span className="sr-only"> (mejor valor)</span>}
                        </span>
                      ) : (
                        <span className="text-base">{v}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          <tr className="border-b border-concreto/80">
            <th scope="row" className="p-5 font-medium text-grafito">
              Licencia tipo M
            </th>
            {modelos.map((m) => (
              <td key={m.id} className="p-5">
                {m.requiereLicencia ? 'Requiere' : 'No requiere'}
              </td>
            ))}
          </tr>
          <tr className="bg-papel">
            <th scope="row" className="p-5 font-semibold">
              Precio
            </th>
            {modelos.map((m) => (
              <td key={m.id} className="p-5">
                <span className="tipo-tablero block text-2xl">{precioModelo(m)}</span>
                <Link
                  to={`/cotizar?modelo=${m.id}`}
                  viewTransition
                  className="mt-2 inline-block font-semibold text-lima-hondo underline underline-offset-4"
                >
                  Cotizar
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
