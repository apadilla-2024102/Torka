import { useLoaderData, useSearchParams } from 'react-router-dom'
import { getModelos } from '../../../shared/api/modelosApi.js'
import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import FormCotizacion from '../components/FormCotizacion.jsx'

export const cotizarLoader = async () => ({ modelos: await getModelos() })

export default function CotizarPage() {
  const { modelos } = useLoaderData()
  const [params] = useSearchParams()
  const modelo = modelos.find((m) => m.id === params.get('modelo'))
  const colorId = modelo?.colores.some((c) => c.id === params.get('color')) ? params.get('color') : undefined

  return (
    <>
      <EncabezadoPagina
        titulo={modelo ? `Cotiza la ${modelo.nombre}` : 'Pide tu cotización'}
        descripcion="Te respondemos por WhatsApp con el precio, las opciones de pago y el distribuidor más cercano."
      />
      <Contenedor className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.6fr_1fr]">
        <FormCotizacion
          key={`${modelo?.id ?? ''}-${colorId ?? ''}`}
          modelos={modelos}
          modeloInicial={modelo?.id}
          colorInicial={colorId}
        />

        <aside className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Qué pasa después</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-tinta-suave marker:font-semibold marker:text-lima-hondo">
              <li>Envías el mensaje que se abre en WhatsApp.</li>
              <li>Un asesor te responde con precio y opciones de pago.</li>
              <li>Agendas la prueba de manejo en el distribuidor que te quede cerca.</li>
            </ol>
          </div>
        </aside>
      </Contenedor>
    </>
  )
}
