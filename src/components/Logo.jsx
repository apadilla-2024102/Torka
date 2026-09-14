/**
 * Logotipo TORKA.
 *
 * PARA ACTIVAR TU LOGO REAL:
 *   1. Guarda el archivo en public/ (por ejemplo public/logo.svg,
 *      o logo.png con fondo transparente y al menos 600 px de ancho).
 *   2. Cambia ARCHIVO_LOGO abajo de null a '/logo.svg'.
 *
 * Mientras tanto se dibuja una versión tipográfica que respeta la
 * identidad: mayúsculas compactas, inclinación y el acento en rojo.
 * No es tu logotipo registrado — es un sustituto digno hasta que subas
 * el archivo. Reproducir una marca registrada a mano se ve peor que
 * esto y además la deforma.
 */
const ARCHIVO_LOGO = null

export default function Logo({ tagline = false, className = '', alturaClase = 'h-8' }) {
  if (ARCHIVO_LOGO) {
    return (
      <img
        src={ARCHIVO_LOGO}
        alt="TORKA"
        className={`${alturaClase} w-auto ${className}`}
        width="160"
        height="32"
      />
    )
  }

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <span className="font-display text-xl font-bold italic tracking-tight text-mist">
        TORKA
        <span className="text-brand-bright not-italic">®</span>
      </span>
      {tagline && (
        <span className="mt-1 text-[10px] font-medium tracking-[0.32em] text-mist/45 uppercase">
          Fuerza que te lleva
        </span>
      )}
    </span>
  )
}
