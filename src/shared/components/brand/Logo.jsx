/**
 * Logotipo yolt: rayo lima + "yolt" en minúsculas (SVG en public/marca,
 * generado con herramientas/logo/generar_logo.py).
 *
 * - `barra`: el logotipo solo, para la navegación y la pantalla de carga.
 * - `completo`: logotipo y el lema "Enciende tu camino.", para el pie.
 *
 * `sobreOscuro` elige la versión de palabra hueso (fondo negro) o la
 * grafito (fondo claro).
 */
export const RUTAS_LOGO = {
  claro: '/marca/yolt-logo-claro.svg',
  oscuro: '/marca/yolt-logo-oscuro.svg',
  rayo: '/marca/yolt-rayo.svg',
}

export default function Logo({ variante = 'barra', sobreOscuro = true, className = '' }) {
  const img = (
    <img
      src={sobreOscuro ? RUTAS_LOGO.claro : RUTAS_LOGO.oscuro}
      alt="yolt"
      translate="no"
      width="2227"
      height="1051"
      className={variante === 'completo' ? 'h-14 w-auto' : 'h-8 w-auto sm:h-9'}
    />
  )

  if (variante === 'completo') {
    return (
      <span className={`inline-flex flex-col items-start gap-3 ${className}`}>
        {img}
        <span className={`tipo-etiqueta ${sobreOscuro ? 'text-niebla' : 'text-grafito'}`}>Enciende tu camino.</span>
      </span>
    )
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>
}
