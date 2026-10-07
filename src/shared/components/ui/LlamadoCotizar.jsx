import Contenedor from '../layout/Contenedor.jsx'
import Boton from './Boton.jsx'
import { enlaceWhatsApp } from '../../config/negocio.js'
import Carril from './Carril.jsx'

/** Cierre de página: una acción principal y una alternativa directa. */
export default function LlamadoCotizar({
  titulo = 'Súbete antes de decidir',
  texto = 'En los primeros veinte metros vas a sentir la diferencia. Agenda una prueba de manejo o pide tu cotización.',
  modelo,
}) {
  const mensaje = modelo
    ? `Hola, quiero información de la TORKA ${modelo.nombre}.`
    : 'Hola, quiero información de las motos TORKA.'

  return (
    <section className="relative bg-asfalto py-20 text-papel sm:py-24">
      <Carril className="absolute inset-x-0 top-0 h-1.5" />
      <Contenedor className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="tipo-ruta max-w-2xl text-[clamp(2rem,5vw,3.25rem)]">{titulo}</h2>
          <p className="mt-4 max-w-xl text-lg text-niebla">{texto}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Boton to={modelo ? `/cotizar?modelo=${modelo.id}` : '/cotizar'}>Pedir cotización</Boton>
          <Boton href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" variante="secundario" sobreOscuro>
            Escribir por WhatsApp
          </Boton>
        </div>
      </Contenedor>
    </section>
  )
}
