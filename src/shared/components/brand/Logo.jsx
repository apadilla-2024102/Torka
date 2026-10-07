/**
 * Logotipo TORKA (archivos en public/marca, generados desde el original
 * con herramientas/logo/procesar_logo.py; no se redibuja la marca).
 *
 * - `barra`: emblema y palabra en línea, para la navegación y la carga.
 * - `completo`: emblema, palabra y "Fuerza que te lleva", apilados, para
 *   el pie de página y espacios con aire.
 *
 * `sobreOscuro` elige letras blancas (fondo negro) u originales (fondo
 * claro). El rojo del emblema es el mismo en las dos.
 */
export const RUTAS_LOGO = {
  emblema: '/marca/torka-emblema.webp',
  palabraClaro: '/marca/torka-palabra-claro.webp',
  completoClaro: '/marca/torka-logo-claro.webp',
  completoOscuro: '/marca/torka-logo-oscuro.webp',
}

export default function Logo({ variante = 'barra', sobreOscuro = true, className = '' }) {
  if (variante === 'completo') {
    return (
      <img
        src={sobreOscuro ? RUTAS_LOGO.completoClaro : RUTAS_LOGO.completoOscuro}
        alt="TORKA, fuerza que te lleva"
        translate="no"
        width="1017"
        height="436"
        className={`h-auto w-56 ${className}`}
      />
    )
  }

  return (
    <span translate="no" className={`inline-flex items-center gap-2 sm:gap-2.5 ${className}`}>
      <img src={RUTAS_LOGO.emblema} alt="" aria-hidden="true" width="572" height="242" className="h-5 w-auto sm:h-7" />
      {sobreOscuro ? (
        <img src={RUTAS_LOGO.palabraClaro} alt="TORKA" width="1006" height="124" className="h-3 w-auto sm:h-[1.15rem]" />
      ) : (
        <span className="tipo-ruta text-xl text-asfalto italic">TORKA</span>
      )}
    </span>
  )
}
