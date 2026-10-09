import { useLoaderData } from 'react-router-dom'
import { getModelos } from '../../../shared/api/modelosApi.js'
import { SPECS_META } from '../../../shared/api/mockData.js'
import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import TablaComparativa from '../components/TablaComparativa.jsx'
import { useSeo } from '../../../shared/seo/useSeo.js'

export const compararLoader = async () => ({ modelos: await getModelos() })

export default function CompararPage() {
  const { modelos } = useLoaderData()
  useSeo({
    titulo: 'Comparar motos eléctricas',
    descripcion:
      'Compara lado a lado autonomía, velocidad, potencia, batería y frenos de las motos eléctricas yolt, y elige la que mejor se ajusta a tu recorrido.',
  })

  return (
    <>
      <EncabezadoPagina
        titulo="Compara los modelos"
        descripcion="El punto verde marca el mejor dato de cada fila. El mejor número no siempre es la mejor compra: elige la autonomía que tu recorrido necesita."
      />
      <Contenedor className="py-12 sm:py-16">
        <TablaComparativa modelos={modelos} specsMeta={SPECS_META} />
        <p className="mt-5 text-sm text-tinta-suave">
          En el celular, desliza la tabla hacia los lados para ver todos los modelos.
        </p>
      </Contenedor>
      <LlamadoCotizar />
    </>
  )
}
