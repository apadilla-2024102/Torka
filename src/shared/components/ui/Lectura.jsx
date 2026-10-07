/**
 * Lectura de tablero: una cifra con su unidad y su nombre, como en el
 * cuadro de instrumentos de una moto. Se usa para toda especificación
 * técnica, así el cliente aprende a leerlas una sola vez.
 *
 * `energia` pinta la cifra en amarillo de carril: solo para datos de
 * autonomía, carga y distancia.
 */
export default function Lectura({ valor, unidad, etiqueta, energia = false, sobreOscuro = false, grande = false }) {
  const colorCifra = energia
    ? sobreOscuro
      ? 'text-senal'
      : 'text-asfalto'
    : sobreOscuro
      ? 'text-papel'
      : 'text-asfalto'

  return (
    <div>
      <dt className={`text-sm ${sobreOscuro ? 'text-niebla' : 'text-grafito'}`}>{etiqueta}</dt>
      <dd className={`tipo-tablero mt-0.5 leading-none ${grande ? 'text-5xl' : 'text-3xl'} ${colorCifra}`}>
        {energia && !sobreOscuro && (
          <span className="mr-1.5 inline-block h-[0.6em] w-1.5 rounded-sm bg-senal align-baseline" aria-hidden="true" />
        )}
        {valor}
        {unidad && (
          <span className={`ml-1 text-base font-semibold ${sobreOscuro ? 'text-niebla' : 'text-grafito'}`}>
            {unidad}
          </span>
        )}
      </dd>
    </div>
  )
}
