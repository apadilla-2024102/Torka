import { lazy, Suspense, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import MontarEnVista from '../../../shared/components/ui/MontarEnVista.jsx'
import ElectricBorder from '../../../shared/components/reactbits/ElectricBorder/ElectricBorder.jsx'
import ClickSpark from '../../../shared/components/reactbits/ClickSpark/ClickSpark.jsx'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import { enlaceWhatsApp } from '../../../shared/config/negocio.js'
import { useFluidez } from '../../../shared/hooks/useFluidez.js'
import Decorado from '../../../shared/components/ui/Decorado.jsx'
import { usePrefiereSuave, useSinMovimiento } from '../../../shared/hooks/useMovimiento.js'

const Lightning = lazy(() => import('../../../shared/components/reactbits/Lightning/Lightning.jsx'))

/**
 * Cierre de la portada: relámpago de fondo (React Bits · Lightning) y la
 * tarjeta de acción con borde eléctrico (React Bits · ElectricBorder).
 * Es el único lugar con borde eléctrico: así se reconoce como el destino.
 */
export default function LlamadoFinal() {
  const reduced = useSinMovimiento()
  // Con "menos movimiento" en el sistema, los rayos caen más despacio.
  const suave = usePrefiereSuave()
  const [con3D] = useState(() => hayWebGL() && !window.matchMedia('(pointer: coarse)').matches)
  // Lee la misma marca de "equipo lento" que pone la autopista de la portada.
  const lento = useFluidez(false)
  // El borde eléctrico dibuja en cada cuadro: solo se enciende en pantalla.
  const tarjeta = useRef(null)
  const enVista = useInView(tarjeta, { margin: '100px 0px' })

  return (
    <section className="relative isolate overflow-hidden bg-black py-28 text-papel sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(197,242,48,0.16),transparent_60%)]" />
      {con3D && !reduced && !lento && (
        <MontarEnVista className="absolute inset-0 -z-10 opacity-70">
          <Decorado>
            <Suspense fallback={null}>
              <Lightning hue={78} xOffset={0.55} speed={suave ? 0.35 : 0.7} intensity={0.9} size={1.2} />
            </Suspense>
          </Decorado>
        </MontarEnVista>
      )}

      <Contenedor>
        <ClickSpark sparkColor="#c5f230" sparkSize={12} sparkRadius={24} sparkCount={10}>
          <div ref={tarjeta}>
          <BordeElectrico activo={enVista && !reduced}>
            <div className="rounded-[28px] bg-black/60 p-8 backdrop-blur sm:p-14">
              <h2 className="tipo-ruta max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">Súbete antes de decidir.</h2>
              <p className="mt-5 max-w-xl text-lg text-papel/75">
                En los primeros veinte metros vas a sentir la diferencia. Agenda una prueba de manejo o pide tu
                cotización; te respondemos por WhatsApp.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Boton to="/cotizar">Pedir cotización</Boton>
                <Boton
                  href={enlaceWhatsApp('Hola, quiero información de las motos yolt.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante="secundario"
                  sobreOscuro
                >
                  Escribir por WhatsApp
                </Boton>
              </div>
            </div>
          </BordeElectrico>
          </div>
        </ClickSpark>
      </Contenedor>
    </section>
  )
}

/** Borde eléctrico animado en pantalla; fuera de ella, un borde lima quieto. */
function BordeElectrico({ activo, children }) {
  if (activo) {
    return (
      <ElectricBorder color="#c5f230" speed={0.8} chaos={0.14} borderRadius={28}>
        {children}
      </ElectricBorder>
    )
  }
  return <div className="rounded-[28px] border-2 border-lima/70">{children}</div>
}
