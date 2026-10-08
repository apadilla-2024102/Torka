import ScrollReveal from '../../../shared/components/reactbits/ScrollReveal/ScrollReveal.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import CalleComparativa from './CalleComparativa.jsx'

/**
 * El argumento de venta en una frase que se enciende palabra por palabra
 * mientras se lee (React Bits · ScrollReveal; técnica "word-by-word
 * lighting" de epic-design). Debajo, la prueba: los dos carriles.
 */
export default function Manifiesto() {
  return (
    <section className="relative bg-asfalto py-24 text-papel sm:py-32">
      <Contenedor>
        <ScrollReveal
          as="h2"
          baseOpacity={0.12}
          baseRotation={2}
          blurStrength={5}
          containerClassName="max-w-4xl"
          textClassName="tipo-ruta !text-[clamp(1.4rem,2.9vw,2.3rem)] !leading-[1.25]"
        >
          Una motocicleta de gasolina cuesta en cada kilómetro. Una eléctrica se carga en el mismo tomacorriente que tu
          teléfono, no requiere afinaciones y opera en silencio. Lo que ahorras, se queda contigo.
        </ScrollReveal>

        <div className="mt-20">
          <CalleComparativa />
        </div>
      </Contenedor>
    </section>
  )
}
