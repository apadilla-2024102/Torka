import { useMemo, useState } from 'react'
import { calcularAhorroAnual, SUPUESTOS } from '../../../shared/lib/energia.js'
import { formatoDecimal, formatoNumero, formatoQuetzales } from '../../../shared/lib/formato.js'
import { useCountUp } from '../../../shared/hooks/useCountUp.js'
import Control from './Control.jsx'

export default function CalculadoraAhorro() {
  const [kmMes, setKmMes] = useState(600)
  const [precioGalon, setPrecioGalon] = useState(SUPUESTOS.precioGalon)
  const [rendimiento, setRendimiento] = useState(SUPUESTOS.rendimientoKmGalon)

  const r = useMemo(
    () => calcularAhorroAnual({ kmMes, precioGalon, rendimiento }),
    [kmMes, precioGalon, rendimiento],
  )

  const ahorro = useCountUp(r.ahorro)
  const proporcion = Math.min(r.totalElectrico / Math.max(r.totalGasolina, 1), 1)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
      <div className="rounded-[2px] bg-papel text-asfalto p-6 sm:p-8">
        <h2 className="text-2xl font-semibold">Tus datos</h2>
        <div className="mt-8 space-y-9">
          <Control id="km" etiqueta="Kilómetros al mes" valor={kmMes} min={100} max={3000} paso={50} sufijo="km" onChange={setKmMes} />
          <Control
            id="galon"
            etiqueta="Precio del galón de gasolina"
            valor={precioGalon}
            min={25}
            max={60}
            paso={0.5}
            prefijo="Q"
            decimales={2}
            onChange={setPrecioGalon}
          />
          <Control
            id="rendimiento"
            etiqueta="Rendimiento de tu moto actual"
            valor={rendimiento}
            min={60}
            max={220}
            paso={5}
            sufijo="km por galón"
            onChange={setRendimiento}
          />
        </div>
      </div>

      <div className="rounded-[2px] border border-linea bg-negro p-6 text-papel sm:p-8">
        <p className="text-niebla">Ahorro estimado al año</p>
        <p className="tipo-tablero mt-1 text-[clamp(3rem,9vw,5rem)] leading-none text-lima" aria-hidden="true">
          {formatoQuetzales(ahorro)}
        </p>
        <p className="sr-only" aria-live="polite">
          Ahorro estimado al año: {formatoQuetzales(r.ahorro)}
        </p>
        <p className="mt-3 text-niebla">
          Son {formatoQuetzales(r.ahorro / 12)} al mes que hoy se van en combustible y taller.
        </p>

        <div className="mt-10 space-y-5">
          <Barra etiqueta="Moto de gasolina, al año" monto={r.totalGasolina} proporcion={1} color="bg-niebla/45" />
          <Barra etiqueta="yolt eléctrica, al año" monto={r.totalElectrico} proporcion={proporcion} color="bg-lima" />
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-linea pt-7">
          <div>
            <dt className="text-sm text-niebla">Por kilómetro con gasolina</dt>
            <dd className="tipo-tablero mt-1 text-3xl">Q{formatoDecimal(r.porKmGasolina)}</dd>
          </div>
          <div>
            <dt className="text-sm text-niebla">Por kilómetro con yolt</dt>
            <dd className="tipo-tablero mt-1 text-3xl text-lima">Q{formatoDecimal(r.porKmElectrico)}</dd>
          </div>
        </dl>

        <p className="mt-8 text-sm text-niebla">
          Sobre {formatoNumero(r.kmAnual)} km al año. Incluye energía y mantenimiento: {formatoQuetzales(SUPUESTOS.mantenimientoGasolinaAnual)} al
          año en gasolina contra {formatoQuetzales(SUPUESTOS.mantenimientoElectricoAnual)} en eléctrica. Luz a Q
          {SUPUESTOS.tarifaKwh} el kWh y {SUPUESTOS.consumoKwh100km} kWh cada 100 km.
        </p>
      </div>
    </div>
  )
}

/** Barra horizontal. Se escala con transform, nunca cambiando el ancho. */
function Barra({ etiqueta, monto, proporcion, color }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-niebla">{etiqueta}</span>
        <span className="tipo-tablero text-xl">{formatoQuetzales(monto)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-asfalto-alto">
        <div
          className={`h-full origin-left rounded-full ${color} transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
          style={{ transform: `scaleX(${proporcion})` }}
        />
      </div>
    </div>
  )
}
