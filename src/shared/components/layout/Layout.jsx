import { Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import BarraMovil from './BarraMovil.jsx'
import { useScrollAHash } from '../../hooks/useScrollAHash.js'
import { useScrollSuave } from '../../hooks/useScrollSuave.js'
import CursorTorka from '../intro/CursorTorka.jsx'

/** Estructura común a todas las páginas: navegación, contenido y pie. */
export default function Layout() {
  useScrollAHash()
  useScrollSuave()

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-rojo focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      {/* Progreso de lectura: atado al scroll, sin JavaScript. */}
      <div aria-hidden="true" className="progreso-lectura fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-rojo" />
      <Nav />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <BarraMovil />
      <CursorTorka />
      <ScrollRestoration />
    </>
  )
}
