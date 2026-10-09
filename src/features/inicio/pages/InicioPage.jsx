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
import Showroom from '../components/Showroom.jsx'
import Experiencia from '../components/Experiencia.jsx'
import { useSeo } from '../../../shared/seo/useSeo.js'

export const inicioLoader = async () => {
  const [modelos, preguntas] = await Promise.all([getModelos(), getPreguntas()])
  return { modelos, preguntas }
}

/**
 * Portada. Orden pensado como una visita al showroom:
 * la emoción primero (autopista y moto), luego el argumento (manifiesto
 * y carriles), la elección (escaparate), el showroom en fotos, las
 * razones, el desfile de la gama, la experiencia en tienda, el proceso,
 * las dudas y, al final, la acción.
 */
export default function InicioPage() {
  const { modelos, preguntas } = useLoaderData()
  useSeo({
    descripcion:
      'Motos eléctricas yolt en Guatemala: ONE, CITY, STREET y GT. Recorre 90 km con unos Q5 de luz, sin afinaciones. Solicita tu cotización y prueba de manejo.',
  })

  return (
    <>
      <Hero
        modeloPortada={modelos.find((m) => m.id === 'city') ?? modelos[0]}
      />
      <BandaVelocidad />
      <Manifiesto />
      <GamaEscaparate modelos={modelos} />
      <Showroom />
      <Razones />
      <DesfileModelos modelos={modelos} />
      <Experiencia />
      <ComoComprar />
      <ObjecionesResumen preguntas={preguntas} />
      <LlamadoFinal />
    </>
  )
}
