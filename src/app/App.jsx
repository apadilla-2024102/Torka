import { MotionConfig } from 'motion/react'
import { AppRouter } from './router/AppRouter.jsx'

/**
 * Raíz de la aplicación. MotionConfig hace que todas las animaciones de
 * Motion respeten la preferencia de "reducir movimiento" del sistema.
 */
export const App = () => (
  <MotionConfig reducedMotion="user">
    <AppRouter />
  </MotionConfig>
)
