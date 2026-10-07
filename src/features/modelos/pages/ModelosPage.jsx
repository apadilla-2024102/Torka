import { useLoaderData, useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { getModelos } from '../../../shared/api/modelosApi.js'
import { PERFILES } from '../../../shared/api/mockData.js'
import EncabezadoPagina from '../../../shared/components/layout/EncabezadoPagina.jsx'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import FiltroPerfil from '../components/FiltroPerfil.jsx'
import ModeloCard from '../components/ModeloCard.jsx'

export const modelosLoader = async () => ({ modelos: await getModelos() })

export default function ModelosPage() {
  const { modelos } = useLoaderData()
  // El filtro vive en la URL: el enlace se puede compartir tal cual.
  const [params, setParams] = useSearchParams()
  const perfil = params.get('perfil') ?? 'todos'
  const visibles = perfil === 'todos' ? modelos : modelos.filter((m) => m.perfil === perfil)

  const cambiarPerfil = (id) =>
    setParams(id === 'todos' ? {} : { perfil: id }, { replace: true, preventScrollReset: true })

  return (
    <>
      <EncabezadoPagina
        titulo="Modelos"
        descripcion="Cuatro motos para cuatro usos distintos. Filtra por cómo la vas a usar, no por cuál se ve mejor."
      />

      <Contenedor className="py-12 sm:py-16">
        <FiltroPerfil perfiles={PERFILES} activo={perfil} onCambiar={cambiarPerfil} />

        <p className="mt-6 text-grafito" aria-live="polite">
          {visibles.length === 1 ? '1 modelo' : `${visibles.length} modelos`}
        </p>

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibles.map((m) => (
              <ModeloCard key={m.id} modelo={m} />
            ))}
          </AnimatePresence>
        </ul>

        {visibles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-asfalto/25 p-10 text-center">
            <p className="text-lg">Todavía no hay modelos para este uso.</p>
            <button type="button" onClick={() => cambiarPerfil('todos')} className="mt-3 font-semibold underline underline-offset-4">
              Ver todos los modelos
            </button>
          </div>
        )}
      </Contenedor>

      <LlamadoCotizar />
    </>
  )
}
