import { useEffect } from 'react'
import { useAnimate } from 'motion/react'
import { useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

/**
 * Envoltura de un campo de formulario: etiqueta, ayuda y error, todos
 * conectados al control por id para que el lector de pantalla los lea.
 */
export default function Campo({ id, etiqueta, ayuda, error, intento = 0, children }) {
  const [zona, animar] = useAnimate()
  const reduced = useSinMovimiento()

  // Sacudida en cada intento fallido. Anima el contenedor sin volver a
  // montar el campo, así el foco que el formulario puso en él se conserva.
  useEffect(() => {
    if (error && intento > 0 && zona.current && !reduced) {
      animar(zona.current, { x: [0, -7, 7, -4, 4, 0] }, { duration: 0.38, ease: 'easeOut' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intento])

  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {etiqueta}
      </label>
      {ayuda && (
        <p id={`${id}-ayuda`} className="mt-1 text-sm text-grafito">
          {ayuda}
        </p>
      )}
      {/* Con error, el campo da una sacudida corta en cada intento de envío:
          señala dónde corregir sin depender solo del color. */}
      <div ref={zona} className="mt-2">
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-rojo-hondo">
          {error}
        </p>
      )}
    </div>
  )
}

export const claseControl = (conError) =>
  `block min-h-12 w-full rounded-[2px] border bg-white px-4 text-base text-asfalto transition-[border-color] duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rojo ${
    conError ? 'border-rojo-hondo' : 'border-asfalto/25 hover:border-asfalto/50'
  }`
