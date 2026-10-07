import { Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { useScrollAHash } from '../../hooks/useScrollAHash.js'

/** Estructura común a todas las páginas: navegación, contenido y pie. */
export default function Layout() {
  useScrollAHash()

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-rojo focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Saltar al contenido
      </a>
      <Nav />
      <main id="contenido">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
