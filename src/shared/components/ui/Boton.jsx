import { Link } from 'react-router-dom'

/**
 * Botón de la marca. Un solo componente para enlaces internos (`to`),
 * externos (`href`) y acciones (`onClick` / `type="submit"`).
 *
 * Variantes:
 *   primario    lima sólido: la acción principal de la pantalla, una sola
 *   secundario  contorno: acciones alternativas
 *   fantasma    solo texto: acciones de bajo peso
 *
 * `sobreOscuro` (por defecto, el sitio es oscuro) ajusta contornos y texto;
 * pon `sobreOscuro={false}` dentro de las bandas claras.
 */
// Rectángulo recto (DESIGN.md: botones sin radio), rótulo en etiqueta y
// 0.33 s para todo cambio de estado.
const BASE =
  'tipo-etiqueta inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-7 ' +
  'transition-[background-color,border-color,color,transform] duration-[330ms] ease-[cubic-bezier(0.25,1,0.5,1)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANTES = {
  primario: () => 'bg-lima text-negro hover:bg-lima-vivo',
  // Contorno blanco al 50 % que se rellena al pasar el cursor.
  secundario: (oscuro) =>
    oscuro
      ? 'border border-papel/50 text-papel hover:border-papel hover:bg-papel hover:text-negro'
      : 'border border-asfalto/40 text-asfalto hover:border-asfalto hover:bg-asfalto hover:text-papel',
  fantasma: (oscuro) =>
    oscuro ? 'px-2 text-papel underline-offset-4 hover:underline' : 'px-2 text-asfalto underline-offset-4 hover:underline',
}

export default function Boton({
  to,
  href,
  variante = 'primario',
  sobreOscuro = true,
  className = '',
  children,
  ...props
}) {
  const clases = `${BASE} ${VARIANTES[variante](sobreOscuro)} ${className}`

  if (to) {
    return (
      <Link to={to} viewTransition className={clases} {...props}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={clases} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={clases} {...props}>
      {children}
    </button>
  )
}
