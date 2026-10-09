import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { EVENTO_CONSENTIMIENTO, guardarConsentimiento, leerConsentimiento } from '../../analitica/analitica.js'
import { CURVA } from '../../lib/movimiento.js'

/**
 * Aviso de cookies. Aparece en la primera visita y cuando el visitante
 * pulsa "Configurar cookies" en el pie. Aceptar y rechazar pesan lo mismo
 * (mismo tamaño y lugar): rechazar no se esconde.
 */
export default function AvisoCookies() {
  const [visible, setVisible] = useState(() => leerConsentimiento() == null)

  useEffect(() => {
    const alCambiar = (e) => setVisible(e.detail === 'preguntar')
    window.addEventListener(EVENTO_CONSENTIMIENTO, alCambiar)
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, alCambiar)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          role="region"
          aria-label="Aviso de cookies"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: CURVA.expo }}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl rounded-[2px] border border-filete bg-lienzo p-5 text-tinta shadow-[0_18px_50px_-20px_rgba(29,29,31,0.35)] sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-tinta-suave">
              Usamos cookies propias para que el sitio funcione y, solo si lo aceptas, cookies de analítica de Google
              para saber qué páginas son útiles. Más detalle en el{' '}
              <Link to="/cookies" className="font-medium text-tinta underline underline-offset-4">
                aviso de cookies
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => guardarConsentimiento('rechazado')}
                className="tipo-etiqueta min-h-11 border border-tinta/50 px-5 text-tinta transition-colors duration-[330ms] hover:bg-tinta hover:text-lienzo"
              >
                Rechazar
              </button>
              <button
                type="button"
                onClick={() => guardarConsentimiento('aceptado')}
                className="tipo-etiqueta min-h-11 border border-tinta px-5 text-tinta transition-colors duration-[330ms] hover:bg-tinta hover:text-lienzo"
              >
                Aceptar
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
