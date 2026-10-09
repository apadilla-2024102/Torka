import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import BarraMovil from './BarraMovil.jsx'
import { useScrollAHash } from '../../hooks/useScrollAHash.js'
import { useScrollSuave } from '../../hooks/useScrollSuave.js'
import CursorMarca from '../intro/CursorMarca.jsx'
import BotonWhatsApp from './BotonWhatsApp.jsx'
import AvisoCookies from '../legal/AvisoCookies.jsx'
import { registrarVista } from '../../analitica/analitica.js'
import { esquemaNegocio } from '../../seo/esquemas.js'

/** Estructura común a todas las páginas: navegación, contenido y pie. */
export default function Layout() {
  useScrollAHash()
  useScrollSuave()
  const { pathname } = useLocation()

  // Vista de página en la analítica en cada cambio de ruta (el título ya
  // lo puso la página).
  useEffect(() => {
    const t = setTimeout(() => registrarVista(pathname), 0)
    return () => clearTimeout(t)
  }, [pathname])

  // Datos estructurados del negocio, comunes a todo el sitio.
  useEffect(() => {
    let s = document.getElementById('ld-negocio')
    if (!s) {
      s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = 'ld-negocio'
      document.head.appendChild(s)
    }
    s.textContent = JSON.stringify(esquemaNegocio())
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-lima focus:px-5 focus:py-2.5 focus:font-semibold focus:text-lienzo"
      >
        Saltar al contenido
      </a>
      {/* Progreso de lectura: atado al scroll, sin JavaScript. */}
      <div aria-hidden="true" className="progreso-lectura fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-lima" />
      <Nav />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <BarraMovil />
      <BotonWhatsApp />
      <AvisoCookies />
      <CursorMarca />
      <ScrollRestoration />
    </>
  )
}
