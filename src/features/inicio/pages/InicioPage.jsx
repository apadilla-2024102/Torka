import { useLoaderData } from 'react-router-dom'
import { getModelos } from '../../../shared/api/modelosApi.js'
import { getPreguntas } from '../../../shared/api/preguntasApi.js'
import Hero from '../components/Hero.jsx'
import BandaVelocidad from '../components/BandaVelocidad.jsx'
import Manifiesto from '../components/Manifiesto.jsx'
import GamaEscaparate from '../components/GamaEscaparate.jsx'
import Razones from '../components/Razones.jsx'
import ComoComprar from '../components/ComoComprar.jsx'
import ObjecionesResumen from '../components/ObjecionesResumen.jsx'
import LlamadoFinal from '../components/LlamadoFinal.jsx'
import DesfileModelos from '../components/DesfileModelos.jsx'

export const inicioLoader = async () => {
  const [modelos, preguntas] = await Promise.all([getModelos(), getPreguntas()])
  return { modelos, preguntas }
}

/**
 * Portada. Orden pensado como una prueba de manejo:
 * la emoción primero (autopista y moto), luego el argumento (manifiesto
 * y carriles), la elección (escaparate), las razones, el desfile de la
 * gama, el proceso, las dudas y, al final, la acción.
 */
export default function InicioPage() {
  const { modelos, preguntas } = useLoaderData()
  const precioDesde = Math.min(...modelos.map((m) => m.precio))

  return (
    <>
      <Hero
        precioDesde={precioDesde}
        totalModelos={modelos.length}
        modeloPortada={modelos.find((m) => m.id === 'sierra') ?? modelos[0]}
      />
      <BandaVelocidad />
      <Manifiesto />
      <GamaEscaparate modelos={modelos} />
      <Razones />
      <DesfileModelos modelos={modelos} />
      <ComoComprar />
      <ObjecionesResumen preguntas={preguntas} />
      <LlamadoFinal modeloCalle={modelos.find((m) => m.id === 'urbana')} />
    </>
  )
}
