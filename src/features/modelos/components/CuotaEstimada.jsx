import { useState } from 'react'
import { cuotaMensual, TASA_ANUAL_EJEMPLO } from '../../../shared/lib/energia.js'
import { formatoQuetzales } from '../../../shared/lib/formato.js'
import { useCountUp } from '../../../shared/hooks/useCountUp.js'

const PLAZOS = [12, 18, 24, 36]

/**
 * Estimador de cuota. Responde a la pregunta que el cliente no siempre
 * se atreve a hacer en piso: ¿cuánto pago al mes?
 */
export default function CuotaEstimada({ precio }) {
  const [porcentaje, setPorcentaje] = useState(20)
  const [meses, setMeses] = useState(24)

  const enganche = Math.round((precio * porcentaje) / 100)
  const cuota = cuotaMensual({ precio, enganche, meses })
  const cuotaAnimada = useCountUp(cuota)

  return (
    <div className="rounded-[2px] bg-papel text-asfalto p-6 sm:p-8">
      <h2 className="text-2xl font-semibold">¿Cuánto pagarías al mes?</h2>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="space-y-7">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="enganche" className="font-medium">
                Enganche
              </label>
              <span className="tipo-tablero text-xl">
                {formatoQuetzales(enganche)} <span className="text-base text-grafito">({porcentaje}%)</span>
              </span>
            </div>
            <input
              id="enganche"
              name="enganche"
              type="range"
              min={10}
              max={60}
              step={5}
              value={porcentaje}
              onChange={(e) => setPorcentaje(Number(e.target.value))}
              className="mt-3 w-full accent-rojo"
            />
          </div>

          <fieldset>
            <legend className="font-medium">Plazo</legend>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {PLAZOS.map((p) => (
                <label key={p} className="cursor-pointer">
                  <input
                    type="radio"
                    name="plazo"
                    value={p}
                    checked={meses === p}
                    onChange={() => setMeses(p)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-11 items-center justify-center rounded-[2px] border border-asfalto/25 text-base font-medium transition-colors duration-150 peer-checked:border-asfalto peer-checked:bg-asfalto peer-checked:text-papel peer-focus-visible:ring-2 peer-focus-visible:ring-rojo">
                    {p} meses
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Lectura oscura dentro de la banda clara: como el tablero de la moto. */}
        <div className="flex flex-col justify-center rounded-[2px] bg-asfalto p-6 text-papel">
          <span className="tipo-etiqueta text-niebla">Cuota estimada</span>
          <span className="tipo-tablero mt-1 text-5xl" aria-hidden="true">
            {formatoQuetzales(cuotaAnimada)}
            <span className="ml-1 text-lg text-niebla">al mes</span>
          </span>
          {/* El lector de pantalla oye solo el valor final, no cada cuadro de la animación. */}
          <span className="sr-only" aria-live="polite">
            {formatoQuetzales(cuota)} al mes
          </span>
          <p className="mt-4 text-sm text-niebla">
            Referencia con tasa anual de {Math.round(TASA_ANUAL_EJEMPLO * 100)}%. La cuota final depende de la
            financiera y de la aprobación de crédito.
          </p>
        </div>
      </div>
    </div>
  )
}
