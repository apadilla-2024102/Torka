import Boton from '../../../shared/components/ui/Boton.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import { formatoQuetzales } from '../../../shared/lib/formato.js'
import CalleComparativa from './CalleComparativa.jsx'

export default function Hero({ precioDesde, totalModelos }) {
  return (
    <section className="bg-asfalto pt-32 pb-16 text-papel sm:pt-40 sm:pb-24">
      <Contenedor>
        <h1 className="tipo-ruta max-w-4xl text-[clamp(2.6rem,8vw,6rem)]">
          Deja la gasolinera en el retrovisor.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-niebla sm:text-xl">
          Motos eléctricas con batería que subes a tu casa y cargas en un contacto normal.{' '}
          {totalModelos} modelos desde {formatoQuetzales(precioDesde)}.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Boton to="/modelos">Ver los modelos</Boton>
          <Boton to="/cotizar" variante="secundario" sobreOscuro>
            Agendar prueba de manejo
          </Boton>
        </div>

        <div className="mt-16 sm:mt-20">
          <CalleComparativa />
        </div>
      </Contenedor>
    </section>
  )
}
