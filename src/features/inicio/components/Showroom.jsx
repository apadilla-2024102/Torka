import { Link } from 'react-router-dom'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import TituloSeccion from '../../../shared/components/ui/TituloSeccion.jsx'
import FotoRevelada from '../../../shared/components/ui/FotoRevelada.jsx'
import Revelar from '../../../shared/components/ui/Revelar.jsx'

const FOTO = (nombre) => `/showroom/showroom-${nombre}.webp`

/**
 * Showroom: banda clara (hueso) con una galería editorial asimétrica de
 * las unidades en exhibición. Cada foto se descubre como cortina y se
 * desplaza dentro de su marco con el scroll. Es la pausa luminosa entre
 * las secciones oscuras.
 */
export default function Showroom() {
  return (
    <section aria-labelledby="showroom-titulo" className="bg-tinta py-24 text-lienzo-alto sm:py-32">
      <Contenedor>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <TituloSeccion id="showroom-titulo" indice="02" etiqueta="Showroom" sobreTinta>
            Diseño que se aprecia mejor en persona
          </TituloSeccion>
          <Revelar>
            <p className="max-w-md text-lg text-tinta-inversa-suave">
              Acabados, ergonomía y detalle de cada unidad, en exhibición permanente. Visítanos y conoce la gama
              con la asesoría de un especialista.
            </p>
            <Link
              to="/distribuidores"
              viewTransition
              className="tipo-etiqueta mt-6 inline-flex items-center gap-3 text-lienzo-alto underline-offset-8 hover:underline"
            >
              Ver ubicaciones <span aria-hidden="true">→</span>
            </Link>
          </Revelar>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-4 sm:gap-6">
          <figure className="col-span-12 md:col-span-7">
            <FotoRevelada src={FOTO('lateral-naranja')} alt="Moto naranja en exhibición, vista lateral" ancho={1400} alto={1050} />
            <figcaption className="tipo-etiqueta mt-3 text-tinta-inversa-suave">01 · Exhibición</figcaption>
          </figure>
          <figure className="col-span-6 md:col-span-5 md:mt-24">
            <FotoRevelada
              src={FOTO('frente-blanca')}
              alt="Scooter blanco en el showroom, vista frontal"
              ancho={1050}
              alto={1400}
              marco="aspect-[4/5]"
              retraso={0.1}
            />
            <figcaption className="tipo-etiqueta mt-3 text-tinta-inversa-suave">02 · Frente</figcaption>
          </figure>
          <figure className="col-span-6 md:col-span-4">
            <FotoRevelada
              src={FOTO('frente-naranja')}
              alt="Moto naranja sobre plataforma de exhibición"
              ancho={1050}
              alto={1400}
              marco="aspect-[4/5]"
            />
            <figcaption className="tipo-etiqueta mt-3 text-tinta-inversa-suave">03 · Plataforma</figcaption>
          </figure>
          <figure className="col-span-12 md:col-span-8 md:mt-16">
            <FotoRevelada
              src={FOTO('lateral-grafito')}
              alt="Moto grafito con parrilla, vista de tres cuartos"
              ancho={1400}
              alto={1050}
              marco="aspect-[16/10]"
              retraso={0.1}
            />
            <figcaption className="tipo-etiqueta mt-3 text-tinta-inversa-suave">04 · Detalle</figcaption>
          </figure>
        </div>
      </Contenedor>
    </section>
  )
}
