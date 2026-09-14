import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Logo from './Logo.jsx'
import { EASE } from '../lib/motion.js'

const enlaces = [
  { href: '#gama', label: 'Gama' },
  { href: '#comparar', label: 'Comparar' },
  { href: '#ahorro', label: 'Ahorro' },
  { href: '#preguntas', label: 'Preguntas' },
]

export default function Nav() {
  const [compacta, setCompacta] = useState(false)
  const [abierta, setAbierta] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const alScroll = () => setCompacta(window.scrollY > 24)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = abierta ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierta])

  return (
    <motion.header
      initial={reduced ? false : { y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE.outExpo, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          compacta
            ? 'border-b border-ink-line/80 bg-ink/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#inicio" aria-label="TORKA, ir al inicio" className="shrink-0">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a
                  href={e.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-mist/70 transition-colors hover:text-mist"
                >
                  {e.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#distribuidores"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-mist transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:inline-block"
            >
              Dónde probarla
            </a>

            <button
              type="button"
              onClick={() => setAbierta((v) => !v)}
              aria-expanded={abierta}
              aria-label={abierta ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-mist md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300 ${
                    abierta ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 bg-current transition-all duration-300 ${
                    abierta ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {abierta && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE.outExpo }}
            className="border-b border-ink-line bg-ink/98 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto max-w-7xl px-5 py-4">
              {[...enlaces, { href: '#distribuidores', label: 'Dónde probarla' }].map((e, i) => (
                <motion.li
                  key={e.href}
                  initial={reduced ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE.outExpo }}
                >
                  <a
                    href={e.href}
                    onClick={() => setAbierta(false)}
                    className="block border-b border-ink-line/60 py-4 font-display text-lg text-mist"
                  >
                    {e.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
