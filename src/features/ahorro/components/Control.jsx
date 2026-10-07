import { formatoDecimal } from '../../../shared/lib/formato.js'

/** Control deslizante con su valor visible y legible. */
export default function Control({ id, etiqueta, valor, min, max, paso, prefijo = '', sufijo = '', decimales = 0, onChange }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">
          {etiqueta}
        </label>
        <output htmlFor={id} className="tipo-tablero shrink-0 text-2xl">
          {prefijo}
          {formatoDecimal(valor, decimales)}
          {sufijo && <span className="ml-1 text-sm text-grafito">{sufijo}</span>}
        </output>
      </div>
      <input
        id={id}
        name={id}
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full cursor-pointer accent-lima-hondo"
      />
    </div>
  )
}
