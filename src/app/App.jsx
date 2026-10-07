import { MotionConfig } from 'motion/react'
import { RESPETAR_MENOS_MOVIMIENTO } from '../shared/hooks/useMovimiento.js'
import { AppRouter } from './router/AppRouter.jsx'
import { IntroProveedor, useIntro } from '../shared/components/intro/IntroContexto.jsx'
import PantallaCarga from '../shared/components/intro/PantallaCarga.jsx'

/**
 * Raíz de la aplicación. MotionConfig decide si las animaciones de Motion
 * obedecen "reducir movimiento"; el interruptor está en
 * shared/hooks/useMovimiento.js.
 */
export const App = () => (
  <MotionConfig reducedMotion={RESPETAR_MENOS_MOVIMIENTO ? 'user' : 'never'}>
    <IntroProveedor>
      <PantallaCarga />
      <Sitio />
    </IntroProveedor>
  </MotionConfig>
)

/**
 * Mientras carga, el sitio de abajo no recibe foco ni clics (inert) y no
 * se pinta (invisible): sus imágenes siguen descargando, pero el navegador
 * no gasta en dibujar desenfoques y sombras que la cortina tapa. Así la
 * batería de la pantalla de carga se mueve fluida incluso en equipos
 * modestos. Se vuelve visible justo cuando la cortina empieza a subir.
 */
function Sitio() {
  const { lista } = useIntro()
  return (
    <div inert={!lista} className={lista ? undefined : 'invisible'}>
      <AppRouter />
    </div>
  )
}
