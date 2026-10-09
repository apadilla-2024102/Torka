import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import Contenedor from './Contenedor.jsx'
import { NEGOCIO } from '../../config/negocio.js'
import { abrirAvisoCookies } from '../../analitica/analitica.js'

const LEGALES = [
  { to: '/aviso-legal', label: 'Aviso legal' },
  { to: '/privacidad', label: 'Política de privacidad' },
  { to: '/cookies', label: 'Aviso de cookies' },
]

const COLUMNAS = [
  {
    titulo: 'Elegir',
    enlaces: [
      { to: '/modelos', label: 'Todos los modelos' },
      { to: '/comparar', label: 'Comparar modelos' },
      { to: '/ahorro', label: 'Calcular mi ahorro' },
    ],
  },
  {
    titulo: 'Comprar',
    enlaces: [
      { to: '/cotizar', label: 'Solicitar cotización' },
      { to: '/distribuidores', label: 'Distribuidores' },
      { to: '/distribuidores#flotillas', label: 'Flotillas' },
    ],
  },
  {
    titulo: 'Después de comprar',
    enlaces: [
      { to: '/preguntas', label: 'Preguntas frecuentes' },
      { to: '/preguntas#garantia', label: 'Garantía' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-lienzo pt-16 pb-28 text-tinta lg:pb-10">
      <div aria-hidden="true" className="franja-marca absolute inset-x-0 top-0 h-1" />
      <Contenedor>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo variante="completo" />
            <p className="mt-6 max-w-sm text-tinta-suave">
              Movilidad eléctrica para una Guatemala más real. Más ahorro, menos mantenimiento y una ciudad más limpia.
            </p>
            <p className="mt-6 text-tinta-suave">
              <a href={`mailto:${NEGOCIO.correoVentas}`} className="text-tinta underline-offset-4 hover:underline">
                {NEGOCIO.correoVentas}
              </a>
              <br />
              <a href={`tel:${NEGOCIO.telefono.replace(/\s/g, '')}`} className="cifras text-tinta underline-offset-4 hover:underline">
                {NEGOCIO.telefono}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNAS.map((c) => (
              <div key={c.titulo}>
                <h2 className="text-base font-semibold">{c.titulo}</h2>
                <ul className="mt-4 space-y-3">
                  {c.enlaces.map((e) => (
                    <li key={e.to}>
                      <Link to={e.to} viewTransition className="text-tinta-suave transition-colors duration-200 hover:text-tinta">
                        {e.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-filete pt-7 text-sm text-tinta-suave lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} yolt · Guatemala en movimiento</p>
          <nav aria-label="Información legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LEGALES.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} viewTransition className="underline-offset-4 hover:text-tinta hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <button type="button" onClick={abrirAvisoCookies} className="underline-offset-4 hover:text-tinta hover:underline">
                  Configurar cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-4 text-xs text-tinta-suave">
          Precios y especificaciones de referencia. Confirma la ficha vigente con tu distribuidor.
        </p>
      </Contenedor>
    </footer>
  )
}
