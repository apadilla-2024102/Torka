/**
 * Selector de color. Son radios nativos con apariencia de muestra: se
 * navegan con flechas del teclado y el lector de pantalla anuncia el
 * nombre del color, no solo un círculo.
 */
export default function SelectorColor({ colores, activo, onCambiar, nombreGrupo }) {
  const actual = colores.find((c) => c.id === activo) ?? colores[0]

  return (
    <fieldset>
      <legend className="text-tinta-suave">
        Color: <span className="font-semibold text-tinta">{actual.nombre}</span>
      </legend>
      <div className="mt-3 flex gap-3">
        {colores.map((c) => (
          <label key={c.id} className="relative cursor-pointer">
            <input
              type="radio"
              name={nombreGrupo}
              value={c.id}
              checked={c.id === actual.id}
              onChange={() => onCambiar(c.id)}
              className="peer sr-only"
            />
            <span className="sr-only">{c.nombre}</span>
            <span
              aria-hidden="true"
              className="block h-11 w-11 rounded-full ring-2 ring-filete ring-offset-4 ring-offset-lienzo-alto transition-[box-shadow] duration-150 peer-checked:ring-tinta peer-focus-visible:ring-lima-hondo"
              style={{ backgroundColor: c.hex }}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}
