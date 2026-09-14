import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'
import SplitText from './SplitText.jsx'
import { useCountUp } from '../lib/useCountUp.js'
import { EASE } from '../lib/motion.js'

/**
 * Supuestos del cálculo. Están aquí arriba y a la vista a propósito:
 * una calculadora que esconde sus supuestos no convence a nadie que sepa
 * hacer cuentas, y el cliente de moto sabe hacer cuentas.
 *
 * ACTUALIZA estos valores con los precios vigentes antes de publicar.
 */
const SUPUESTOS = {
  consumoKwh100km: 2.8, // kWh por cada 100 km
  tarifaKwh: 1.85, // quetzales por kWh, tarifa doméstica
  litrosPorGalon: 3.785, // en Guatemala la gasolina se vende por galón
  mantenimientoGasolinaAnual: 1100, // afinaciones, aceite, filtros
  mantenimientoElectricoAnual: 280, // frenos y llantas
}

const money = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
  maximumFractionDigits: 0,
})

export default function Ahorro() {
  const reduced = useReducedMotion()
  const [kmMes, setKmMes] = useState(600)
  const [precioGasolina, setPrecioGasolina] = useState(38)
  const [rendimiento, setRendimiento] = useState(130)

  const calculo = useMemo(() => {
    const kmAnual = kmMes * 12

    const energiaGasolina = (kmAnual / rendimiento) * precioGasolina
    const energiaElectrica = (kmAnual / 100) * SUPUESTOS.consumoKwh100km * SUPUESTOS.tarifaKwh

    const totalGasolina = energiaGasolina + SUPUESTOS.mantenimientoGasolinaAnual
    const totalElectrico = energiaElectrica + SUPUESTOS.mantenimientoElectricoAnual

    const ahorro = Math.max(totalGasolina - totalElectrico, 0)
    const porKmGasolina = totalGasolina / Math.max(kmAnual, 1)
    const porKmElectrico = totalElectrico / Math.max(kmAnual, 1)

    return { kmAnual, totalGasolina, totalElectrico, ahorro, porKmGasolina, porKmElectrico }
  }, [kmMes, precioGasolina, rendimiento])

  const ahorroAnimado = useCountUp(calculo.ahorro)
  const gasolinaAnimado = useCountUp(calculo.totalGasolina)
  const electricoAnimado = useCountUp(calculo.totalElectrico)

  // Proporción de la barra: cuánto ocupa lo eléctrico frente a lo de gasolina.
  const proporcion = Math.min(calculo.totalElectrico / Math.max(calculo.totalGasolina, 1), 1)

  return (
    <section id="ahorro" className="scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 max-w-2xl">
          <Reveal as="p" className="mb-4 font-display text-sm font-semibold tracking-widest text-brand-bright uppercase">
            Haz la cuenta
          </Reveal>
          <SplitText
              as="h2"
              texto="Cuánto dejas de gastar al año"
              retraso={0.08}
              className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] text-mist"
            />
          <Reveal as="p" delay={0.16} className="mt-5 text-lg leading-relaxed text-mist/60">
            Mueve los valores a tu realidad. Preferimos que compruebes el número
            con tus datos a darte una cifra bonita que no se sostenga.
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* ---------- Controles ---------- */}
          <Reveal className="rounded-3xl border border-ink-line bg-ink-soft/50 p-7 sm:p-9">
            <h3 className="font-display text-lg font-semibold text-mist">Tus datos</h3>

            <div className="mt-8 space-y-9">
              <Control
                id="km"
                etiqueta="Kilómetros al mes"
                valor={kmMes}
                min={100}
                max={3000}
                paso={50}
                sufijo="km"
                onChange={setKmMes}
              />
              <Control
                id="gas"
                etiqueta="Precio de la gasolina"
                valor={precioGasolina}
                min={25}
                max={60}
                paso={0.5}
                sufijo="Q/galón"
                decimales={2}
                onChange={setPrecioGasolina}
              />
              <Control
                id="rend"
                etiqueta="Rendimiento de tu moto actual"
                valor={rendimiento}
                min={60}
                max={220}
                paso={5}
                sufijo="km/galón"
                onChange={setRendimiento}
              />
            </div>

            <p className="mt-9 border-t border-ink-line pt-6 text-xs leading-relaxed text-mist/40">
              Cálculo sobre {calculo.kmAnual.toLocaleString('es-GT')} km al año. Incluye
              energía y mantenimiento estimado ({money.format(SUPUESTOS.mantenimientoGasolinaAnual)} anuales
              en gasolina contra {money.format(SUPUESTOS.mantenimientoElectricoAnual)} en eléctrica).
              Energía eléctrica a Q{SUPUESTOS.tarifaKwh} por kWh y consumo de{' '}
              {SUPUESTOS.consumoKwh100km} kWh por cada 100 km. Gasolina calculada
              por galón, como se vende en Guatemala.
            </p>
          </Reveal>

          {/* ---------- Resultado ---------- */}
          <Reveal
            delay={0.1}
            className="relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-ink-soft to-ink p-7 sm:p-9"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
            />

            <div className="relative">
              <p className="text-sm font-medium text-mist/55">Ahorro estimado al año</p>
              <p className="tabular mt-2 font-display text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none text-brand-bright">
                {money.format(ahorroAnimado)}
              </p>
              <p className="mt-3 text-sm text-mist/50">
                Equivale a {money.format(calculo.ahorro / 12)} cada mes que hoy se te va
                en combustible y taller.
              </p>

              {/* Barra comparativa */}
              <div className="mt-10 space-y-5">
                <Barra
                  etiqueta="Moto de gasolina"
                  monto={money.format(gasolinaAnimado)}
                  ancho={1}
                  tono="bg-mist/25"
                  reduced={reduced}
                />
                <Barra
                  etiqueta="TORKA eléctrica"
                  monto={money.format(electricoAnimado)}
                  ancho={proporcion}
                  tono="bg-brand"
                  reduced={reduced}
                />
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-ink-line pt-7">
                <div>
                  <dt className="text-xs font-medium tracking-wide text-mist/40 uppercase">
                    Costo por km · gasolina
                  </dt>
                  <dd className="tabular mt-1.5 font-display text-2xl font-bold text-mist">
                    Q{calculo.porKmGasolina.toFixed(2)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium tracking-wide text-mist/40 uppercase">
                    Costo por km · TORKA
                  </dt>
                  <dd className="tabular mt-1.5 font-display text-2xl font-bold text-brand-bright">
                    Q{calculo.porKmElectrico.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Control({ id, etiqueta, valor, min, max, paso, sufijo, decimales = 0, onChange }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-mist/75">
          {etiqueta}
        </label>
        <span className="tabular font-display text-xl font-bold text-brand-bright">
          {valor.toFixed(decimales)}
          <span className="ml-1 text-xs font-medium text-mist/45">{sufijo}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={paso}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-line accent-brand"
      />
    </div>
  )
}

function Barra({ etiqueta, monto, ancho, tono, reduced }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <span className="text-sm text-mist/65">{etiqueta}</span>
        <span className="tabular text-sm font-semibold text-mist">{monto}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-ink-line/60">
        <motion.div
          className={`h-full rounded-full ${tono}`}
          initial={reduced ? { width: `${ancho * 100}%` } : { width: 0 }}
          animate={{ width: `${ancho * 100}%` }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
        />
      </div>
    </div>
  )
}
