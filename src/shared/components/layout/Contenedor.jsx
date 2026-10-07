/** Ancho máximo y márgenes laterales comunes a todas las páginas. */
export default function Contenedor({ as: Etiqueta = 'div', className = '', children, ...props }) {
  return (
    <Etiqueta className={`mx-auto w-full max-w-6xl px-4 sm:px-8 ${className}`} {...props}>
      {children}
    </Etiqueta>
  )
}
