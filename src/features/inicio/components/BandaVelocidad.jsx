import ScrollVelocity from '../../../shared/components/reactbits/ScrollVelocity/ScrollVelocity.jsx'
import MontarEnVista from '../../../shared/components/ui/MontarEnVista.jsx'

/**
 * Banda de texto que corre (React Bits · ScrollVelocity): se acelera con
 * la velocidad del scroll y cambia de sentido cuando el usuario sube. Las
 * dos filas van en sentidos opuestos, como los dos carriles de la calle.
 */
const FRASES = [
  'Enciende tu camino / Menos gasto / Más vida /',
  'Más ahorro / Menos mantenimiento / Una ciudad más limpia / Más posibilidades /',
]

export default function BandaVelocidad() {
  return (
    <section aria-label="Lo que cambia con una yolt" className="overflow-hidden border-y border-linea bg-asfalto py-8 text-papel sm:py-12">
      {/* Su bucle de animación corre en cada cuadro: fuera de pantalla se
          cambia por el mismo texto quieto. */}
      <MontarEnVista
        margen="100px 0px"
        respaldo={FRASES.map((f) => (
          <p key={f} className="tipo-ruta overflow-hidden px-4 py-1 text-[clamp(2.2rem,6vw,5rem)] leading-[1.1] whitespace-nowrap">
            {f}
          </p>
        ))}
      >
        <ScrollVelocity
          texts={FRASES}
          velocity={55}
          numCopies={4}
          className="tipo-ruta px-4 text-[clamp(2.2rem,6vw,5rem)] leading-[1.1]"
          scrollerClassName="scroller"
          parallaxClassName="parallax py-1"
        />
      </MontarEnVista>
    </section>
  )
}
