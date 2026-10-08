import { useLoaderData } from 'react-router-dom'
import { getDistribuidores } from '../../../shared/api/distribuidoresApi.js'
import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import { NEGOCIO } from '../../../shared/config/negocio.js'
import DistribuidorItem from '../components/DistribuidorItem.jsx'

export const distribuidoresLoader = async () => ({ distribuidores: await getDistribuidores() })

export default function DistribuidoresPage() {
  const { distribuidores } = useLoaderData()

  return (
    <>
      <EncabezadoPagina
        titulo="Dónde verla y probarla"
        descripcion="La mejor forma de decidir es manejarla. Visita un distribuidor autorizado y agenda tu prueba de manejo."
      />

      <Contenedor className="py-12 sm:py-16">
        {distribuidores.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {distribuidores.map((d) => (
              <DistribuidorItem key={d.id} distribuidor={d} />
            ))}
          </ul>
        ) : (
          <p className="text-lg">
            Estamos abriendo puntos de venta. Mientras tanto, pide tu cotización y te llevamos la moto a prueba.
          </p>
        )}

        <section
          id="flotillas"
          aria-labelledby="flotillas-titulo"
          className="mt-16 flex scroll-mt-28 flex-col gap-6 rounded-[2px] border border-filete bg-lienzo p-8 text-tinta sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2 id="flotillas-titulo" className="tipo-ruta text-3xl">
              ¿Compras para una flotilla?
            </h2>
            <p className="mt-3 max-w-xl text-tinta-suave">
              A partir de cinco unidades cambian el precio, el servicio y el esquema de repuestos. Escríbenos y armamos
              la propuesta para tu operación.
            </p>
          </div>
          <Boton href={`mailto:${NEGOCIO.correoVentas}?subject=Flotilla%20yolt`} className="shrink-0">
            Escribir a ventas
          </Boton>
        </section>
      </Contenedor>
    </>
  )
}
