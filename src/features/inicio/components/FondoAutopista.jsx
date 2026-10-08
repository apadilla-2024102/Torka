import { lazy, Suspense, useEffect, useState } from 'react'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import { useIntro } from '../../../shared/components/intro/IntroContexto.jsx'
import { useFluidez } from '../../../shared/hooks/useFluidez.js'
import Decorado from '../../../shared/components/ui/Decorado.jsx'
import { usePrefiereSuave, useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

// Three.js + postprocessing pesan: se descargan después de pintar la portada.
const Hyperspeed = lazy(() => import('../../../shared/components/reactbits/Hyperspeed/Hyperspeed.jsx'))

/**
 * Autopista nocturna (React Bits · Hyperspeed) con los colores yolt:
 * luces lima de un lado, luces blancas del otro y postes en lima. Al mantener presionado el fondo, acelera.
 *
 * Objeto fuera del componente a propósito: Hyperspeed se reconstruye
 * completo si recibe un objeto nuevo en cada render.
 */
const OPCIONES_MARCA = {
  // Curva larga y serena: elegante, sin el vaivén de la turbulenta.
  distortion: 'LongRaceDistortion',
  length: 400,
  roadWidth: 9,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 115,
  speedUp: 1.6,
  carLightsFade: 0.4,
  totalSideLightSticks: 24,
  lightPairsPerRoadWay: 32,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [45, 60],
  movingCloserSpeed: [-90, -120],
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
    brokenLines: 0xd6f715,
    leftCars: [0xd6f715, 0xe4ff4d, 0x8fb81a],
    rightCars: [0xf1eee5, 0xffffff, 0x9b9b9b],
    sticks: 0xd6f715,
  },
}

/**
 * Misma autopista a paso de crucero, para quien pidió menos movimiento en
 * su sistema: la mitad de velocidad y una aceleración corta al presionar.
 */
const OPCIONES_SUAVES = {
  ...OPCIONES_MARCA,
  fovSpeedUp: 100,
  speedUp: 1.15,
  movingAwaySpeed: [25, 35],
  movingCloserSpeed: [-50, -65],
}

/**
 * Respaldo sin WebGL (celular, equipo lento o navegador sin 3D):
 * la misma idea en CSS, estelas de luz quietas sobre el asfalto.
 */
function AutopistaEstatica() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(214,247,21,0.22),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_70%_100%,rgba(241,238,229,0.10),transparent_55%)]" />
      <div className="absolute bottom-[18%] left-[-10%] h-px w-[70%] rotate-[-8deg] bg-gradient-to-r from-transparent via-lima to-transparent opacity-70" />
      <div className="absolute bottom-[26%] left-[20%] h-px w-[60%] rotate-[-5deg] bg-gradient-to-r from-transparent via-papel to-transparent opacity-40" />
      <div className="absolute bottom-[10%] right-[-10%] h-px w-[60%] rotate-[6deg] bg-gradient-to-r from-transparent via-lima to-transparent opacity-50" />
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
          <Hyperspeed effectOptions={suave ? OPCIONES_SUAVES : OPCIONES_MARCA} />
        </div>
      </Suspense>
    </Decorado>
  )
}
