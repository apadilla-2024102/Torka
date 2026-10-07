import Contenedor from './Contenedor.jsx'

/**
 * Encabezado de las páginas interiores. Franja de asfalto con la línea
 * de carril al pie: la misma calle de la portada, en pequeño.
 */
export default function EncabezadoPagina({ titulo, descripcion, children }) {
  return (
    <header className="relative bg-asfalto pt-32 pb-14 text-papel sm:pt-36 sm:pb-16">
      <Contenedor>
        <h1 className="tipo-ruta max-w-3xl text-[clamp(2.25rem,6vw,4rem)]">{titulo}</h1>
        {descripcion && <p className="mt-5 max-w-2xl text-lg text-niebla">{descripcion}</p>}
        {children}
      </Contenedor>
      <div className="carril absolute inset-x-0 bottom-0 h-1.5" aria-hidden="true" />
    </header>
  )
}
