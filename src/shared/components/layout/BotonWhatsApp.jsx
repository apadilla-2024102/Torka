import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { enlaceWhatsApp } from '../../config/negocio.js'
import { registrarEvento } from '../../analitica/analitica.js'

/**
 * Botón flotante de WhatsApp, visible en todas las páginas.
 *
 * Es el canal de ayuda, no la llamada a la acción: la acción del sitio es
 * "Solicitar cotización". Por eso es un círculo con el ícono que todos
 * reconocen, sin competir con el botón principal. En celular sube cuando
 * aparece la barra inferior, para no taparla.
 */
export default function BotonWhatsApp() {
  const { pathname } = useLocation()
  const [barra, setBarra] = useState(false)

  useEffect(() => {
    const alScroll = () => setBarra(window.scrollY > window.innerHeight * 0.8)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  const conBarra = barra && !pathname.startsWith('/cotizar')

  return (
    <a
      href={enlaceWhatsApp('Hola, quiero información de las motos yolt.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      onClick={() => registrarEvento('contacto_whatsapp', { origen: 'flotante', pagina: pathname })}
      className={`fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-[bottom,transform] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lima-hondo sm:right-6 lg:bottom-6 ${
        conBarra ? 'bottom-[calc(5.5rem+env(safe-area-inset-bottom))]' : 'bottom-[calc(1rem+env(safe-area-inset-bottom))]'
      }`}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.07 3 3.4 8.66 3.4 15.63c0 2.23.58 4.4 1.69 6.32L3.3 28.5l6.72-1.76a12.6 12.6 0 0 0 6.02 1.53h.01c6.97 0 12.64-5.67 12.64-12.64 0-3.38-1.31-6.55-3.7-8.94A12.56 12.56 0 0 0 16.04 3Zm0 23.13h-.01a10.5 10.5 0 0 1-5.35-1.47l-.38-.23-3.99 1.05 1.06-3.89-.25-.4a10.46 10.46 0 0 1-1.6-5.56c0-5.8 4.72-10.51 10.53-10.51 2.81 0 5.45 1.1 7.44 3.08a10.45 10.45 0 0 1 3.08 7.44c0 5.8-4.72 10.5-10.53 10.5Zm5.77-7.87c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.33-.49-2.54-1.57-.94-.84-1.57-1.87-1.75-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64 0 1.56 1.14 3.07 1.3 3.28.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>
    </a>
  )
}
