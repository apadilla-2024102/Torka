/**
 * Envoltura de un campo de formulario: etiqueta, ayuda y error, todos
 * conectados al control por id para que el lector de pantalla los lea.
 */
export default function Campo({ id, etiqueta, ayuda, error, children }) {
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
      <div className="mt-2">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-rojo-hondo">
          {error}
        </p>
      )}
    </div>
  )
}

export const claseControl = (conError) =>
  `block min-h-12 w-full rounded-xl border bg-white px-4 text-base text-asfalto transition-[border-color] duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rojo ${
    conError ? 'border-rojo-hondo' : 'border-asfalto/25 hover:border-asfalto/50'
  }`
