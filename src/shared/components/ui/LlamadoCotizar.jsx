import Contenedor from '../layout/Contenedor.jsx'
import Boton from './Boton.jsx'
import { enlaceWhatsApp } from '../../config/negocio.js'
import Carril from './Carril.jsx'

/** Cierre de página: una acción principal y una alternativa directa. */
export default function LlamadoCotizar({
  titulo = 'Agenda tu prueba de manejo',
  texto = 'Conoce la gama yolt en persona y recibe tu cotización formal con opciones de pago y financiamiento.',
  modelo,
}) {
  const mensaje = modelo
    ? `Hola, quiero información de la yolt ${modelo.nombre}.`
    : 'Hola, quiero información de las motos yolt.'

  return (
    <section className="relative bg-lienzo-alto py-20 text-tinta sm:py-24">
      <Carril className="absolute inset-x-0 top-0 h-px" />
      <Contenedor className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="tipo-ruta max-w-2xl text-[clamp(2rem,5vw,3.25rem)]">{titulo}</h2>
          <p className="mt-4 max-w-xl text-lg text-tinta-suave">{texto}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Boton to={modelo ? `/cotizar?modelo=${modelo.id}` : '/cotizar'}>Solicitar cotización</Boton>
          <Boton href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" variante="secundario" sobreLienzo>
            Escribir por WhatsApp
          </Boton>
        </div>
      </Contenedor>
    </section>
  )
}
