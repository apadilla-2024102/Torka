import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Boton from '../ui/Boton.jsx'
import { enlaceWhatsApp } from '../../config/negocio.js'

/**
 * Barra fija de compra en celular (skill page-cro): en pantallas chicas el
 * botón de cotizar queda arriba y se pierde al bajar. Aparece después del
 * primer pantallazo y no se muestra en la página de cotización, donde ya
 * está el formulario.
 */
export default function BarraMovil() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  if (pathname.startsWith('/cotizar')) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-filete bg-lienzo-alto/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none lg:hidden ${
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="flex gap-2">
        <Boton to="/cotizar" className="flex-1" tabIndex={visible ? 0 : -1}>
          Cotizar
        </Boton>
        <Boton
          href={enlaceWhatsApp('Hola, quiero información de las motos yolt.')}
          target="_blank"
          rel="noopener noreferrer"
          variante="secundario"
          sobreLienzo
          className="flex-1"
          tabIndex={visible ? 0 : -1}
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </Boton>
      </div>
    </div>
  )
}
