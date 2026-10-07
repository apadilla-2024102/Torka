import { useRef } from 'react'
import { useInView } from 'motion/react'
import { useCountUp } from '../../hooks/useCountUp.js'
import { formatoNumero } from '../../lib/formato.js'
import { useSinMovimiento } from '../../hooks/useMovimiento.js'

/**
 * Lectura de tablero: una cifra con su unidad y su nombre, como en el
 * cuadro de instrumentos de una moto.
 *
 * Si `valor` es un número, sube desde cero la primera vez que entra en
 * pantalla, como la aguja del tablero al encender la moto. El lector de
 * pantalla recibe el valor final, no la cuenta.
 *
 * `energia` marca la cifra en lima: solo para datos de
 * autonomía, carga y distancia.
 */
export default function Lectura({ valor, unidad, etiqueta, energia = false, sobreOscuro = true, grande = false }) {
  const ref = useRef(null)
  const enVista = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduced = useSinMovimiento()
  const esNumero = typeof valor === 'number'
  const mostrado = useCountUp(esNumero ? (enVista || reduced ? valor : 0) : 0, 1.1)

  const colorCifra = energia && sobreOscuro ? 'text-lima' : sobreOscuro ? 'text-papel' : 'text-asfalto'

  return (
    <div ref={ref}>
      <dt className={`text-sm ${sobreOscuro ? 'text-niebla' : 'text-grafito'}`}>{etiqueta}</dt>
      <dd className={`tipo-tablero mt-0.5 leading-none ${grande ? 'text-5xl' : 'text-3xl'} ${colorCifra}`}>
        {energia && !sobreOscuro && (
          <span className="mr-1.5 inline-block h-[0.6em] w-1.5 rounded-sm bg-lima align-baseline" aria-hidden="true" />
        )}
        {esNumero ? (
          <>
            <span aria-hidden="true">{formatoNumero(mostrado)}</span>
            <span className="sr-only">{formatoNumero(valor)}</span>
          </>
        ) : (
          valor
        )}
        {unidad && (
          <span className={`ml-1 text-base font-semibold ${sobreOscuro ? 'text-niebla' : 'text-grafito'}`}>
            {unidad}
          </span>
        )}
      </dd>
    </div>
  )
}
