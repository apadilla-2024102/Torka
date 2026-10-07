/**
 * Logotipo TORKA.
 *
 * PARA ACTIVAR TU LOGO REAL:
 *   1. Guarda el archivo en public/ (logo.svg, o logo.png con fondo
 *      transparente y al menos 600 px de ancho).
 *   2. Cambia ARCHIVO_LOGO de null a '/logo.svg'.
 *
 * Mientras tanto se dibuja un sustituto tipográfico en el ancho
 * expandido de la marca. No reproduce tu emblema registrado: una copia
 * aproximada hecha a mano se ve peor que esto y deforma la marca.
 */
const ARCHIVO_LOGO = null

export default function Logo({ sobreOscuro = true, className = '' }) {
  if (ARCHIVO_LOGO) {
    return <img src={ARCHIVO_LOGO} alt="TORKA" translate="no" className={`h-8 w-auto ${className}`} width="160" height="32" />
  }

  return (
    <span
      translate="no"
      className={`tipo-ruta inline-flex items-center gap-2 text-xl italic ${
        sobreOscuro ? 'text-papel' : 'text-asfalto'
      } ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6 not-italic" aria-hidden="true">
        <path d="M5 8h22l-4.5 5H19v11h-6V13H9.5L5 8Z" fill="#e31019" />
      </svg>
      TORKA
    </span>
  )
}
