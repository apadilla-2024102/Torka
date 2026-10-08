/**
 * Logotipo oficial de yolt: la Y lima + "olt" (SVG en public/marca,
 * vectorizado del original con herramientas/logo/vectorizar_logo.py).
 *
 * - `barra`: el logotipo solo, para la navegación y la pantalla de carga.
 * - `completo`: logotipo y el lema "Enciende tu camino.", para el pie.
 *
 * `sobreLienzo` (por defecto) usa la versión para fondo claro: "olt" en
 * tinta y la Y en lima; con `false`, la de fondo oscuro ("olt"
 * hueso y Y lima).
 */
export const RUTAS_LOGO = {
  claro: '/marca/yolt-logo-claro.svg',
  oscuro: '/marca/yolt-logo-oscuro.svg',
  isotipo: '/marca/yolt-isotipo.svg',
}

export default function Logo({ variante = 'barra', sobreLienzo = true, className = '' }) {
  const img = (
    <img
      src={sobreLienzo ? RUTAS_LOGO.oscuro : RUTAS_LOGO.claro}
      alt="yolt"
      translate="no"
      width="1186"
      height="499"
      className={variante === 'completo' ? 'h-12 w-auto' : 'h-7 w-auto sm:h-8'}
    />
  )

  if (variante === 'completo') {
    return (
      <span className={`inline-flex flex-col items-start gap-3 ${className}`}>
        {img}
        <span className={`tipo-etiqueta ${sobreLienzo ? 'text-tinta-suave' : 'text-tinta-inversa-suave'}`}>Enciende tu camino.</span>
      </span>
    )
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>
}
