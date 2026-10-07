import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from '../brand/Logo.jsx'
import Boton from '../ui/Boton.jsx'

export const ENLACES = [
  { to: '/modelos', label: 'Modelos' },
  { to: '/comparar', label: 'Comparar' },
  { to: '/ahorro', label: 'Ahorro' },
  { to: '/distribuidores', label: 'Distribuidores' },
  { to: '/preguntas', label: 'Preguntas' },
]

export default function Nav() {
  const [abierta, setAbierta] = useState(false)
  const [conFondo, setConFondo] = useState(false)
  const { pathname } = useLocation()

  // Cambiar de página cierra el menú móvil.
  useEffect(() => setAbierta(false), [pathname])

  useEffect(() => {
    const alScroll = () => setConFondo(window.scrollY > 16)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Con el menú abierto: sin scroll de fondo y Escape lo cierra.
  useEffect(() => {
    if (!abierta) return
    document.body.style.overflow = 'hidden'
    const alTeclado = (e) => e.key === 'Escape' && setAbierta(false)
    window.addEventListener('keydown', alTeclado)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', alTeclado)
    }
  }, [abierta])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        conFondo || abierta ? 'border-b border-linea bg-asfalto/95 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-4 sm:px-8">
        <Link to="/" viewTransition aria-label="TORKA, ir al inicio" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {ENLACES.map((e) => (
            <li key={e.to}>
              <NavLink
                to={e.to}
                viewTransition
                className={({ isActive }) =>
                  `relative block rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors duration-200 ${
                    isActive ? 'text-papel' : 'text-niebla hover:text-papel'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {e.label}
                    {isActive && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-rojo" aria-hidden="true" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Boton to="/cotizar" className="hidden min-h-11 px-5 text-[0.95rem] sm:inline-flex">
            Cotizar
          </Boton>
          <button
            type="button"
            onClick={() => setAbierta((v) => !v)}
            aria-expanded={abierta}
            aria-controls="menu-movil"
            aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-linea text-papel lg:hidden"
          >
            {abierta ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {abierta && (
        <div id="menu-movil" className="h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-linea bg-asfalto lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-4 sm:px-8">
            {ENLACES.map((e) => (
              <li key={e.to}>
                <NavLink
                  to={e.to}
                  viewTransition
                  className={({ isActive }) =>
                    `tipo-ruta block border-b border-linea py-5 text-2xl ${isActive ? 'text-rojo-claro' : 'text-papel'}`
                  }
                >
                  {e.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-8">
            <Boton to="/cotizar" className="w-full">
              Cotizar una moto
            </Boton>
          </div>
        </div>
      )}
    </header>
  )
}
