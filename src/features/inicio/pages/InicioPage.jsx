import { useLoaderData } from 'react-router-dom'
import { getModelos } from '../../../shared/api/modelosApi.js'
import LlamadoCotizar from '../../../shared/components/ui/LlamadoCotizar.jsx'
import Hero from '../components/Hero.jsx'
import GamaResumen from '../components/GamaResumen.jsx'
import Razones from '../components/Razones.jsx'
import ComoComprar from '../components/ComoComprar.jsx'

export const inicioLoader = async () => ({ modelos: await getModelos() })

export default function InicioPage() {
  const { modelos } = useLoaderData()
  const precioDesde = Math.min(...modelos.map((m) => m.precio))

  return (
    <>
      <Hero
        precioDesde={precioDesde}
        totalModelos={modelos.length}
        modeloPortada={modelos.find((m) => m.id === 'sport') ?? modelos[0]}
      />
      <GamaResumen modelos={modelos} />
      <Razones />
      <ComoComprar />
      <LlamadoCotizar />
    </>
  )
}
