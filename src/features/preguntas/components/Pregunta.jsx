import { Plus } from 'lucide-react'

/**
 * Una pregunta frecuente sobre <details> nativo: se abre con teclado,
 * lo entiende el lector de pantalla y funciona sin JavaScript.
 * El id permite enlazar directo a la respuesta (/preguntas#garantia).
 */
export default function Pregunta({ id, pregunta, respuesta, abierta = false }) {
  return (
    <details id={id} open={abierta} className="group scroll-mt-28 border-b border-filete">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
        {pregunta}
        <Plus
          className="h-6 w-6 shrink-0 text-lima-hondo transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        />
      </summary>
      <p className="max-w-3xl pb-7 text-tinta-suave">{respuesta}</p>
    </details>
  )
}
