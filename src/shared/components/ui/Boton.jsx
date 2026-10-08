import { Link } from 'react-router-dom'

/**
 * Botón de la marca. Un solo componente para enlaces internos (`to`),
 * externos (`href`) y acciones (`onClick` / `type="submit"`).
 *
 * Variantes:
 *   primario    tinta sólida sobre el lienzo claro (lima sobre bandas de
 *               tinta): la acción principal de la pantalla, una sola
 *   secundario  contorno: acciones alternativas
 *   fantasma    solo texto: acciones de bajo peso
 *
 * `sobreLienzo` (por defecto, el sitio es claro) ajusta colores; pon
 * `sobreLienzo={false}` dentro de las bandas de tinta (oscuras).
 */
// Rectángulo recto (DESIGN.md: botones sin radio), rótulo en etiqueta y
// 0.33 s para todo cambio de estado.
const BASE =
  'tipo-etiqueta inline-flex min-h-12 items-center justify-center gap-2 rounded-none px-7 ' +
  'transition-[background-color,border-color,color,transform] duration-[330ms] ease-[cubic-bezier(0.25,1,0.5,1)] ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const VARIANTES = {
  primario: (lienzo) =>
    lienzo ? 'bg-tinta text-lienzo hover:bg-black' : 'bg-lima text-tinta hover:bg-lima-vivo',
  // Contorno al 50 % que se rellena al pasar el cursor.
  secundario: (oscuro) =>
    oscuro
      ? 'border border-tinta/50 text-tinta hover:border-tinta hover:bg-tinta hover:text-lienzo'
      : 'border border-lienzo-alto/40 text-lienzo-alto hover:border-lienzo-alto hover:bg-lienzo-alto hover:text-tinta',
  fantasma: (oscuro) =>
    oscuro ? 'px-2 text-tinta underline-offset-4 hover:underline' : 'px-2 text-lienzo-alto underline-offset-4 hover:underline',
}

export default function Boton({
  to,
  href,
  variante = 'primario',
  sobreLienzo = true,
  className = '',
  children,
  ...props
}) {
  const clases = `${BASE} ${VARIANTES[variante](sobreLienzo)} ${className}`

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
