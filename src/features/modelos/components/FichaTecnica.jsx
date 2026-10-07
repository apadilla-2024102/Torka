import Lectura from '../../../shared/components/ui/Lectura.jsx'
import { SPECS_META } from '../../../shared/api/mockData.js'
import { formatoNumero } from '../../../shared/lib/formato.js'

const DE_ENERGIA = new Set(['autonomia', 'carga'])

/** Todas las especificaciones del modelo en formato de tablero. */
export default function FichaTecnica({ specs }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
      {SPECS_META.map((s) => {
        const valor = specs[s.key]
        const esNumero = typeof valor === 'number'
        return esNumero ? (
          <Lectura
            key={s.key}
            etiqueta={s.label}
            valor={formatoNumero(valor)}
            unidad={s.unidad}
            energia={DE_ENERGIA.has(s.key)}
          />
        ) : (
          <div key={s.key}>
            <dt className="text-sm text-grafito">{s.label}</dt>
            <dd className="mt-1 text-lg font-semibold">{valor}</dd>
          </div>
        )
      })}
    </dl>
  )
}
