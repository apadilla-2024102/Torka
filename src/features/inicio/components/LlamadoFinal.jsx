import { lazy, Suspense, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Contenedor from '../../../shared/components/layout/Contenedor.jsx'
import Boton from '../../../shared/components/ui/Boton.jsx'
import MontarEnVista from '../../../shared/components/ui/MontarEnVista.jsx'
import ElectricBorder from '../../../shared/components/reactbits/ElectricBorder/ElectricBorder.jsx'
import ClickSpark from '../../../shared/components/reactbits/ClickSpark/ClickSpark.jsx'
import { hayWebGL } from '../../../shared/components/brand/moto3d/webgl.js'
import { enlaceWhatsApp } from '../../../shared/config/negocio.js'

const Lightning = lazy(() => import('../../../shared/components/reactbits/Lightning/Lightning.jsx'))

/**
 * Cierre de la portada: relámpago de fondo (React Bits · Lightning) y la
 * tarjeta de acción con borde eléctrico (React Bits · ElectricBorder).
 * Es el único lugar con borde eléctrico: así se reconoce como el destino.
 */
export default function LlamadoFinal() {
  const reduced = useReducedMotion()
  const [con3D] = useState(() => hayWebGL() && !window.matchMedia('(pointer: coarse)').matches)

  return (
    <section className="relative isolate overflow-hidden bg-black py-28 text-papel sm:py-36">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_20%,rgba(227,16,25,0.25),transparent_60%)]" />
      {con3D && !reduced && (
        <MontarEnVista className="absolute inset-0 -z-10 opacity-70">
          <Suspense fallback={null}>
            <Lightning hue={356} xOffset={0.55} speed={0.7} intensity={0.9} size={1.2} />
          </Suspense>
        </MontarEnVista>
      )}

      <Contenedor>
        <ClickSpark sparkColor="#f2c230" sparkSize={12} sparkRadius={24} sparkCount={10}>
          <ElectricBorder color="#e31019" speed={reduced ? 0 : 0.8} chaos={0.14} borderRadius={28}>
            <div className="rounded-[28px] bg-black/60 p-8 backdrop-blur sm:p-14">
              <h2 className="tipo-ruta max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">Súbete antes de decidir.</h2>
              <p className="mt-5 max-w-xl text-lg text-papel/75">
                En los primeros veinte metros vas a sentir la diferencia. Agenda una prueba de manejo o pide tu
                cotización; te respondemos por WhatsApp.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Boton to="/cotizar">Pedir cotización</Boton>
                <Boton
                  href={enlaceWhatsApp('Hola, quiero información de las motos TORKA.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  variante="secundario"
                  sobreOscuro
                >
                  Escribir por WhatsApp
                </Boton>
              </div>
            </div>
          </ElectricBorder>
        </ClickSpark>
      </Contenedor>
    </section>
  )
}
