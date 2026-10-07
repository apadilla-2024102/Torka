import { Link } from 'react-router-dom'

/**
 * Botón de la marca. Un solo componente para enlaces internos (`to`),
 * externos (`href`) y acciones (`onClick` / `type="submit"`).
 *
 * Variantes:
 *   primario    rojo sólido: la acción principal de la pantalla, una sola
 *   secundario  contorno: acciones alternativas
 *   fantasma    solo texto: acciones de bajo peso
 *
 * `sobreOscuro` ajusta contornos y texto cuando el botón vive sobre asfalto.
 */
const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-base font-semibold ' +
  'transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:opacity-50'

const VARIANTES = {
  primario: () => 'bg-rojo text-white hover:bg-rojo-hondo',
  secundario: (oscuro) =>
    oscuro
      ? 'border border-linea text-papel hover:border-niebla hover:bg-asfalto-alto'
      : 'border border-asfalto/25 text-asfalto hover:border-asfalto hover:bg-white',
  fantasma: (oscuro) =>
    oscuro ? 'px-2 text-papel underline-offset-4 hover:underline' : 'px-2 text-asfalto underline-offset-4 hover:underline',
}

export default function Boton({
  to,
  href,
  variante = 'primario',
  sobreOscuro = false,
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
