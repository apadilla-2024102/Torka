import { lazy, Suspense, useEffect, useState } from 'react'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import { useIntro } from '../../../shared/components/intro/IntroContexto.jsx'
import { useFluidez } from '../../../shared/hooks/useFluidez.js'
import Decorado from '../../../shared/components/ui/Decorado.jsx'
import { usePrefiereSuave, useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

// Three.js + postprocessing pesan: se descargan después de pintar la portada.
const Hyperspeed = lazy(() => import('../../../shared/components/reactbits/Hyperspeed/Hyperspeed.jsx'))

/**
 * Autopista nocturna (React Bits · Hyperspeed) con los colores TORKA:
 * luces rojas de un lado, luces cálidas del otro y postes en amarillo de
 * carril. Al mantener presionado el fondo, acelera.
 *
 * Objeto fuera del componente a propósito: Hyperspeed se reconstruye
 * completo si recibe un objeto nuevo en cada render.
 */
const OPCIONES_TORKA = {
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 140,
  speedUp: 2.2,
  carLightsFade: 0.4,
  totalSideLightSticks: 24,
  lightPairsPerRoadWay: 42,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x0b0b0d,
    islandColor: 0x0e0e11,
    background: 0x000000,
    shoulderLines: 0x1c1c22,
    brokenLines: 0xf2c230,
    leftCars: [0xe31019, 0xff4a50, 0xb00c14],
    rightCars: [0xfff3c4, 0xf2c230, 0xe8e2d0],
    sticks: 0xf2c230,
  },
}

/**
 * Misma autopista a paso de crucero, para quien pidió menos movimiento en
 * su sistema: la mitad de velocidad y una aceleración corta al presionar.
 */
const OPCIONES_SUAVES = {
  ...OPCIONES_TORKA,
  fovSpeedUp: 105,
  speedUp: 1.2,
  movingAwaySpeed: [30, 40],
  movingCloserSpeed: [-60, -80],
}

/**
 * Respaldo sin WebGL (celular, equipo lento o navegador sin 3D):
 * la misma idea en CSS, estelas de luz quietas sobre el asfalto.
 */
function AutopistaEstatica() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(227,16,25,0.35),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_70%_100%,rgba(242,194,48,0.18),transparent_55%)]" />
      <div className="absolute bottom-[18%] left-[-10%] h-px w-[70%] rotate-[-8deg] bg-gradient-to-r from-transparent via-rojo to-transparent opacity-70" />
      <div className="absolute bottom-[26%] left-[20%] h-px w-[60%] rotate-[-5deg] bg-gradient-to-r from-transparent via-[#fff3c4] to-transparent opacity-40" />
      <div className="absolute bottom-[10%] right-[-10%] h-px w-[60%] rotate-[6deg] bg-gradient-to-r from-transparent via-senal to-transparent opacity-50" />
    </div>
  )
}

export default function FondoAutopista() {
  const reduced = useSinMovimiento()
  const suave = usePrefiereSuave()
  // La autopista arranca cuando se abre la cortina: armar la escena 3D
  // mientras corre la pantalla de carga la volvería entrecortada.
  const { lista } = useIntro()
  // …y un instante después de que termina de subir, para no competir con
  // la animación de la cortina ni con la entrada del titular.
  const [arrancar, setArrancar] = useState(false)
  useEffect(() => {
    if (!lista) return
    const espera = setTimeout(() => setArrancar(true), 1400)
    return () => clearTimeout(espera)
  }, [lista])
  // En pantallas táctiles se usa el respaldo: el efecto completo gasta
  // demasiada batería para un teléfono en datos móviles.
  const [animado] = useState(
    () => hayWebGL() && !window.matchMedia('(pointer: coarse)').matches,
  )

  // Si este equipo no mueve la autopista con fluidez, se queda la versión
  // estática: mejor un fondo quieto que una página entrecortada.
  const lento = useFluidez(animado && arrancar && !reduced)

  if (reduced || !animado || !arrancar || lento) return <AutopistaEstatica />

  return (
    // Se monta una sola vez: fuera de pantalla la autopista se pausa sola.
    // Desmontarla y volver a crearla al subir congelaba la página.
    <Decorado respaldo={<AutopistaEstatica />}>
      <Suspense fallback={<AutopistaEstatica />}>
        <div className="absolute inset-0">
          <Hyperspeed effectOptions={suave ? OPCIONES_SUAVES : OPCIONES_TORKA} />
        </div>
      </Suspense>
    </Decorado>
  )
}
